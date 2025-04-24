const express = require('express');
const Character = require('../models/character');
const User = require('../models/user');
const router = express.Router();

router.get('/all', async (req, res) => {
    const username = req.user.username
    const user = await User.findOne({username});
    let charlist = await Promise.all(user.personnages.map(async (item) => {
        const character = await Character.findById(item);
        return character;
    }));
    res.status(200).json(charlist);
});

router.get('/allplayers', async (req, res) => {
    const username = req.user.username
    const user = await User.findOne({username});
    let charlist = [];
    for (const campaign of user.dmOf) {
        const characters = await Character.find({campaign});
        charlist = [...charlist, ...characters];
    }
    res.status(200).json(charlist);    
})

router.post('/one/:id', async (req, res) => {
    try {
        await Character.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json({message: "Character saved successfully."})
    } catch (error) {
        res.status(500).json({message: "Error saving character: ", error})
    }

})

router.get('/new', async (req,res) => {
    try {
        const newCharacter = new Character();
        await newCharacter.save();

        // Add the character to the list of characters for the user
        const username = req.user.username
        let user = await User.findOne({username});
        user.personnages.push(newCharacter._id);
        await user.save();
        res.status(200).json({...newCharacter._doc})
    } catch (error) {
        res.status(500).json({message: "Error creating character: ", error})
    }

})

router.patch('/one/:id', async (req, res) => {
    try {
        await Character.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json({message: "Character saved successfully."})
    } catch (error) {
        res.status(500).json({message: "Error saving character: ", error})
    }
})

router.delete('/one/:id', async (req,res) => {
    const user = await User.findOne({username});
    const idx = user.personnages.indexOf(req.params.id)
    if (idx !== -1) {
        user.personnages.splice(idx,1);
        await user.save();
    }
})


module.exports = router;