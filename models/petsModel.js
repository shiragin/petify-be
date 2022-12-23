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
  adoptionStatus: {
    type: String,
    required: [true, 'A pet must have a status'],
  },
  picture: {
    type: String,
  },
  height: {
    type: Number,
    required: [true, 'A pet must have a height'],
  },
  weight: {
    type: Number,
    required: [true, 'A pet must have a weight'],
  },
  color: {
    type: String,
    required: [true, 'A pet must have a colour'],
  },
  bio: {
    type: String,
    trim: true,
  },
  hypoallergnic: {
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
});

const Pet = mongoose.model('Pet', petSchema);

function getAllPetsData() {
  return Pet.find();
}

module.exports = { getAllPetsData, Pet };
