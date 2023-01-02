const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'A pet must have a type'],
  },
  name: {
    type: String,
    required: [true, 'A pet must have a name'],
    unique: false,
  },
  picture: {
    type: String,
    required: [true, 'A pet must have am image'],
  },
  adoptionStatus: {
    type: String,
    required: [true, 'A pet must have a status'],
  },
  height: {
    type: Number,
    required: [true, 'A pet must have a height'],
  },
  weight: {
    type: Number,
    required: [true, 'A pet must have a weight'],
  },
  colour: {
    type: [String],
    required: [true, 'A pet must have a colour'],
  },
  bio: {
    type: String,
    trim: true,
  },
  hypoallergenic: {
    type: Boolean,
    required: [true, 'A pet must have a hypoallergenic spec'],
  },
  breed: {
    type: String,
    required: [true, 'A pet must have a breed'],
  },
  dietry: { type: [String] },
  addedAt: {
    type: Date,
    default: Date.now(),
  },
  owner: {
    type: String,
  },
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
