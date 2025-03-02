const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage });

// Store image metadata
let images = [];

// Upload image
app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const image = {
        id: Date.now(),
        url: `http://localhost:${PORT}/uploads/${req.file.filename}`
    };

    images.push(image);
    res.json(image);
});

// Get all images
app.get("/api/images", (req, res) => {
    res.json(images);
});

// Delete image
app.delete("/api/images/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const imageIndex = images.findIndex(img => img.id === id);

    if (imageIndex === -1) return res.status(404).json({ error: "Image not found" });

    // Remove file from disk
    const imagePath = path.join(__dirname, "uploads", path.basename(images[imageIndex].url));
    fs.unlink(imagePath, err => {
        if (err) console.error("Failed to delete file:", err);
    });

    // Remove from array
    images.splice(imageIndex, 1);
    res.json({ message: "Image deleted" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
