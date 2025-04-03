const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const _directory = "C:\\Users\\melic\\Desktop\\Gestion persos\\gestion-perso-backend\\img";

// Middleware
router.use( (req,res,next) => {
    const userId = req.user.userId; // Get user ID from query param (or session, auth token, etc.)
    if (!userId) {
        return res.status(403).send("User ID required");
    }
    express.static(path.join(_directory, "uploads",userId))(req, res, next);
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.user.userId || "default"; // Get user ID from query (or session, auth)
        const uploadPath = path.join(_directory, "uploads", userId);

        // Ensure the directory exists, if not, create it
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                return cb(err, null);
            }
            cb(null, uploadPath);
        });
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    res.send({
        message: "File uploaded successfully",
        filePath: `/images/uploads/${req.file.filename}`
    });
});

router.get("/uploads/:filename", (req, res) => {
    const userId = req.user.userId; // Extract user ID from authenticated session
    const { filename } = req.params;

    // Only allow access to files in the user's own folder
    const filePath = path.join(_directory, "./uploads", userId, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File not found" });
    }

    res.sendFile(filePath);
});

router.get("/all", (req, res) => {
    const userId = req.user.userId;
    const imagesDir = path.join(_directory, "uploads", userId);
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(200).json({ message: "No images found for this user." });
        }

        // Filter only image files (optional)
        const images = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

        res.json({
            user: userId,
            images: images.map(file => ({"url": `/images/uploads/${file}`,"id":`${file}`})) // Return accessible image URLs
        });
    });
});

router.delete("/one/:id", (req, res) => {
    const userId = req.user.userId;
    const imagePath = path.join(_directory, "uploads", userId, req.params.id);
    fs.unlink(imagePath, err => {
        if (err) console.error("Failed to delete file:", err);
    });
    res.json({ message: "Image deleted" });
});

module.exports = router;