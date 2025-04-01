// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Character = require('../models/character');
const mongoose = require('mongoose')
const router = express.Router();

// Route d'inscription
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  console.log("Registering: ",username, password);
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du personnage de l'utilisateur
    const newCharacter = new Character();
    await newCharacter.save({session})

    // Création d'un nouvel utilisateur
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      personnages: [newCharacter._id]
    });

    // Sauvegarde dans la base de données
    await newUser.save({session});
    await session.commitTransaction();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
  } finally {
    session.endSession();
  }
});

// Connection route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log("user not found",username, password);
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("No match",username, password);
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Generate JWT
    const token = jwt.sign(
      { username: user.username, role: user.role, userId: user.id}, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: '365d' } // Token expiration
    );

    res.json({ token });
  } catch (err) {
    console.log("Other error",username, password);
    res.status(500).json({ message: 'Erreur de connexion', error: err });
  }
});

router.get("/allUsers", async (req,res) => {
    const users = await User.find();
    res.json(users)
})

module.exports = router;