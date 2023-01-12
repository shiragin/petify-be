const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'A user must have a first name'],
    maxlength: [16, 'A first name have more than 16 characters'],
    minlength: [2, 'A first name must have at least 2 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'A user must have a last name'],
    maxlength: [16, 'A last name have more than 16 characters'],
    minlength: [2, 'A last name must have at least 2 characters'],
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
    minlength: [8, 'Your password must have at least 8 characters'],
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
  lastLogin: {
    type: Date,
  },
});

// userSchema.pre('save', function (next) {
//   this.lastLoggedIn = Date.now();
//   next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
