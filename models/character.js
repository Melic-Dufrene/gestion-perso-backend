const mongoose = require('mongoose');

const object = new mongoose.Schema({
    name: { type: String, default: "Object" },
    weight: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    is_magic: { type: Boolean, default: false },
    desc: {type: String, default: ''},
    id: {type: Number}
})

const characterSchema = new mongoose.Schema({
  campaign: {type: String, default: "Laelith"},
  name: { type: String, default: "Name" },
  stats: {
    strength: { type: Number, default: 8 },
    intelligence: { type: Number, default: 8 },
    wisdom: { type: Number, default: 8 },
    constitution: { type: Number, default: 8 },
    dexterity: { type: Number, default: 8 },
    charisma: { type: Number, default: 8 },
    beauty: { type: Number, default: 8 }
  },
  height: { type: Number, default: 180 },
  weight: { type: Number, default: 80 },
  hp: { type: Number, default: 0 },
  age: { type: Number, default: 1 },
  race: { type: String, default: "Humain" },
  profession: { type: String, default: "Guerrier" },
  exp: { type: Number, default: 0 },
  lvl: { type: Number, default: 1 },
  img: String,
  ac: {
    front: { type: Number, default: 10 },
    back: { type: Number, default: 10 },
    front_w_shield: { type: Number, default: 10 },
    taco: { type: Number, default: 20 },
  },
  speed: { type: Number, default: 0 },
  alignement: { type: String, default: "Neutre/Neutre" },
  swimming: { type: String, default: false },
  riding: { type: String, default: false },
  inventory: {
    bursary: {
      pc: { type: Number, default: 0 },
      pa: { type: Number, default: 0 },
      po: { type: Number, default: 0 },
      pp: { type: Number, default: 0 }
    },
    on: { type: [mongoose.Schema.Types.ObjectId], ref: 'object', default: [] },
    bag: { type: [mongoose.Schema.Types.ObjectId], ref: 'object' }
  },
  abilities: {type: [String], default: []},
  languages: {type: String, default: 'Commun'},
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;