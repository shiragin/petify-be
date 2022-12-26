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
    unique: [true, 'Email already existed'],
  },
  phoneNumber: {
    type: Number,
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
});

const User = mongoose.model('User', userSchema);

module.exports = User;
