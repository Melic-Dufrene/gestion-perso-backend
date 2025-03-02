const express = require('express');
const Character = require('../models/character');

const router = express.Router();

router.get('/', async (req, res) => {
    const character = await Character.findById(req.user.personnage);
    res.send(character);
});

router.post('/', async (req, res) => {
    try {
        await Character.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json({message: "Character saved successfully."})
    } catch (error) {
        res.status(500).json({message: "Error saving character: ", error})
    }

})

router.patch('/', async (req, res) => {
    try {
        console.log(req.body);
        await Character.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json({message: "Character saved successfully."})
    } catch (error) {
        res.status(500).json({message: "Error saving character: ", error})
    }
})


module.exports = router;