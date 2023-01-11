/* eslint-disable no-lonely-if */
/* eslint-disable no-restricted-syntax */
const Pet = require('../schemas/petsSchema');
// const AppError = require('../utils/appError');

function getAllPetsData(query) {
  return Pet.find(query);
}

function getPetData(params, next) {
  return Pet.find({ _id: { $in: params } });
}

function getRandomPetsData() {
  return Pet.aggregate([
    {
      $match: { adoptionStatus: 'Available' },
    },
    {
      $sample: { size: 4 },
    },
  ]);
}

function createPetData(body) {
  try {
    return Pet.create(body);
  } catch (err) {
    console.error(err);
  }
}

function updatePetData(id, body) {
  return Pet.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
}

function deletePetData(id) {
  return Pet.findByIdAndDelete(id);
}

module.exports = {
  getAllPetsData,
  getPetData,
  createPetData,
  updatePetData,
  deletePetData,
  getRandomPetsData,
};
