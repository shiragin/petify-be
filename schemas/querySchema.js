const mongoose = require('mongoose');
const validator = require('validator');

const querySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your first name'],
    maxlength: [16, `Your first name can't more than 16 characters`],
    minlength: [2, 'Your first name must have at least 2 characters'],
  },
  userId: {
    type: String,
  },
  token: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  topic: {
    type: String,
    required: [true, 'Please tell us the topic of your query'],
    enum: {
      values: [
        'Adoption & fostering',
        'Returning a pet',
        'Technical issues',
        'General questions',
      ],
      message:
        'Please choose one of the following topics - Adoption & fostering, Returning a pet, Technical issues, General questions',
    },
  },
  message: {
    type: 'String',
    required: [true, 'Please enter your message'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  reply: {
    type: String,
  },
  RepliedAt: {
    type: Date,
  },
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
