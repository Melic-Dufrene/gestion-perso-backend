const mongoose = require('mongoose');

// Remplace par l'URL de ta base de données MongoDB
const mongoURI = 'mongodb://localhost:27017/Donjon';
const img_folder = "C:\\Users\\melic\\Desktop\\Gestion persos\\gestion-perso-backend\img"

// Connexion à MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.log('Erreur de connexion à MongoDB:', err));                