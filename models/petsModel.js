const Pet = require('../schemas/petsSchema');
// const AppError = require('../utils/appError');

async function getAllPetsData(query) {
  try {
    const petsList = await Pet.find(query);
    return petsList;
  } catch (err) {
    console.error(err);
  }
}

async function getPetData(params, next) {
  try {
    const petsList = Pet.find({ _id: { $in: params } });
    return petsList;
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    next(err);
  }
}

async function getRandomPetsData() {
  try {
    const petsList = await Pet.aggregate([
      {
        $match: { adoptionStatus: 'Available' },
      },
      {
        $sample: { size: 4 },
      },
    ]);
    return petsList;
  } catch (err) {
    console.error(err);
  }
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

async function deletePetData(id) {
  try {
    return await Pet.findByIdAndDelete(id);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAllPetsData,
  getPetData,
  createPetData,
  updatePetData,
  deletePetData,
  getRandomPetsData,
};
