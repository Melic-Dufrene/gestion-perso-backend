const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get("/infos", async (req,res) => {
    try {
        const username = req.user.username
        const databaseentry = await User.findOne({username})
        const {password, ...user} = databaseentry._doc;
        res.status(200).json(user)
    } catch (error) {
        console.error("Error;", error);
        req.status(500).json({ error: "An error occured"})
    }
})

module.exports = router;