const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  personnage: { type: String},
  spell_filters: {
    lvls: {type: [Number], default:[1, 2, 3, 4, 5, 6, 7, 8, 9]},
    professions: {type: [String], default:["mage", "clerc", "druide", "illusionniste"]}
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;