const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const charRouter = require('./routes/character');
const cors = require('cors');
const auth =  require('./middlewares/authmiddleware');
require('dotenv').config();
const app = express();
app.use(express.json());
const port = 3000;

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/Donjons')
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.log('Erreur de connexion à MongoDB:', err));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, Everyone ! :)');
});

app.use('/api/auth', authRouter);


app.use('/api/character', auth, charRouter)

app.listen(port,"0.0.0.0", () => {
  console.log(`Le serveur écoute sur http://localhost:${port}`);
})