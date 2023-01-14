/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please specify a pet type (cat or dog)'],
    enum: {
      values: ['Cat', 'Dog'],
      message: 'Please choose one of the following types',
    },
  },
  name: {
    type: String,
    required: [true, 'Please specify a pet name'],
    trim: true,
    maxlength: [16, 'A pet name cannot have more than 16 characters'],
    minlength: [2, 'A pet name must have at least 2 characters'],
  },
  age: {
    type: Number,
    required: [true, 'Please specify a pet age'],
    default: 2,
  },
  picture: {
    type: String,
    required: [true, 'Please add a pet image'],
  },
  adoptionStatus: {
    type: String,
    required: [
      true,
      `Please specify the pet's adoption status (available, fostered or adopted)`,
    ],
    enum: {
      values: ['Available', 'Fostered', 'Adopted'],
      message: 'Please choose one of the following statuses',
    },
  },
  height: {
    type: Number,
    required: [true, 'Please specify a pet height'],
  },
  weight: {
    type: Number,
    required: [true, 'Please specify a pet weight'],
  },
  colour: {
    type: [String],
    required: [true, 'Please specify a pet colour (can have multiple colours)'],
  },
  bio: {
    type: String,
    trim: true,
  },
  hypoallergenic: {
    type: Boolean,
    required: [true, 'Please specify aif the pet is hypoallergenic'],
  },
  breed: {
    type: String,
    required: [true, 'Please specify a pet breed'],
    trim: true,
    maxlength: [40, 'A pet breed cannot have more than 40 characters'],
    minlength: [2, 'A pet breed must have at least 2 characters'],
  },
  dietry: { type: String },
  addedAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: String,
  },
  size: {
    type: String,
    enum: {
      values: ['Big', 'Medium', 'Small'],
      message: 'Please choose one of the following sizes',
    },
  },
});

petSchema.pre('save', function (next) {
  if (!this.addedAt) {
    this.addedAt = new Date();
  }
  next();
});

petSchema.pre('save', function (next) {
  if (this.type === 'Cat') {
    if (this.weight < 4 && this.height < 20) this.size = 'Small';
    else if (this.weight > 8 && this.height > 26) this.size = 'Big';
    else this.size = 'Medium';
  } else {
    if (this.weight < 20 && this.height < 30) this.size = 'Small';
    else if (this.weight > 40 && this.height > 50) this.size = 'Big';
    else this.size = 'Medium';
  }
  next();
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
