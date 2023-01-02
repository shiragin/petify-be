const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A user must have a first name'],
  },
  lastName: {
    type: String,
    required: [true, 'A user must have a last name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: [true, 'Email already exists'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'A user must have a phone number'],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A user must have a password confirmation'],
  },
  bio: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    required: [true, 'A user must have an admin status specified'],
    default: false,
  },
  savedPets: {
    type: [String],
  },
  adoptedPets: {
    type: [String],
  },
  fosteredPets: {
    type: [String],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
