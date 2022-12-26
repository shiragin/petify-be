const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();
const Pet = require('../models/petsModel');

const DB = process.env.DATABASE.replace('PASSWORD', process.env.PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

// READ JSON FILE
const pets = JSON.parse(
  fs.readFileSync(`${__dirname}/pets-data.json`, 'utf-8')
);

// IMPORT DATA INTO DB
async function importData() {
  try {
    await Pet.create(pets);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

// DELETE ALL DATA FROM DB

async function deleteData() {
  console.log(Pet);
  try {
    await Pet.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
