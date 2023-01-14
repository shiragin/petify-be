const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter your first name'],
    maxlength: [16, `Your first name can't more than 16 characters`],
    minlength: [2, 'Your first name must have at least 2 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your last name'],
    maxlength: [16, `Your last name can't more than 16 characters`],
    minlength: [2, 'Your last name must have at least 2 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    lowercase: true,
    unique: [true, 'Email already exists'],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please enter your phone number'],
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value, 'he-IL');
      },
      message: 'Please provide a valid Israeli mobile number',
    },
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
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
