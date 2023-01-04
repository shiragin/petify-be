const Pet = require('../schemas/petsSchema');

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

async function createPetData(body) {
  try {
    const newPet = await Pet.create(body);
    return newPet;
  } catch (err) {
    console.error(err);
  }
}

async function updatePetData(id, body) {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    return updatedPet;
  } catch (err) {
    console.error(err);
  }
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
