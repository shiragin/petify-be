const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'A pet must have a type'],
  },
  name: {
    type: String,
    required: [true, 'A pet must have a name'],
    trim: true,
    maxlength: [16, 'A pet name cannot have more than 16 characters'],
    minlength: [2, 'A pet name must have at least 2 characters'],
  },
  age: {
    type: Number,
    required: [true, 'A pet must have an age'],
    default: 2,
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
    trim: true,
    maxlength: [40, 'A pet breed cannot have more than 40 characters'],
    minlength: [2, 'A pet breed must have at least 2 characters'],
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

// petSchema.virtual('size').get(function () {
//   // return this.duration / 7;
//   if (this.type === 'Cat') {
//     if (this.weight < 4) return 'Small'
//     else if (this.weight > 4 && this.weight <= 7) return 'Medium';
//     else (this.weight > 7) return 'Large';
//   } else {
//     if (this.weight < 20) return 'Small';
//     else if (this.weight >=20 && this.weight <= 40) return 'Medium';
//     else (this.weight > 40) return 'Large';
//   }
// });

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
