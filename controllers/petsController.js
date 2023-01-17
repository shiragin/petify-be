const Pet = require('../schemas/petsSchema');
const APIFeatures = require('../utils/apiFeatures');
const {
  getAllPetsData,
  getPetData,
  createPetData,
  updatePetData,
  deletePetData,
  getRandomPetsData,
} = require('../models/petsModel');
const { getUserDataById } = require('../models/usersModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

async function getAllPets(req, res, next) {
  catchAsync(async function (req, res, next) {
    // EXECUTE QUERY
    const features = new APIFeatures(Pet.find(), req.query)
      .filter()
      // .sort()
      .limitFields()
      .paginate();

    const pets = await getAllPetsData(features.query);

    // SEND RESPONSE
    res.status(200).json({
      ok: true,
      results: pets.length,
      pets,
    });
  })(req, res, next);
}

async function getPet(req, res, next) {
  catchAsync(async function (req, res, next) {
    const params = req.params.id.split(',');
    const pet = await getPetData(params);
    if (!pet.length) {
      return next(new AppError('No pet found with that ID', 404));
    }
    res.status(200).json({
      ok: true,
      requestedAt: req.requestTime,
      pet,
    });
  })(req, res, next);
}

async function createPet(req, res, next) {
  catchAsync(async function (req, res, next) {
    if (req.body.colour) req.body.colour = req.body.colour.split(',');
    const newPet = await createPetData(req.body);
    res.status(201).json({
      ok: true,
      pet: newPet,
    });
  })(req, res, next);
}

async function updatePet(req, res, next) {
  catchAsync(async function (req, res, next) {
    if (req.body.colour) req.body.colour = req.body.colour.split(',');
    // if (req.body.dietry) req.body.dietry = req.body.dietry.split(',');
    const pet = await updatePetData(req.params.id, req.body);
    if (!pet) {
      return next(new AppError('No pet found with that ID', 404));
    }
    res.status(200).json({
      ok: true,
      pet,
    });
  })(req, res, next);
}

async function deletePet(req, res, next) {
  catchAsync(async function (req, res, next) {
    const pet = await deletePetData(req.params.id);
    res.status(204).json({
      ok: true,
    });
    if (!pet) {
      return next(new AppError('No pet found with that ID', 404));
    }
  })(req, res, next);
}

async function getRandomPets(req, res, next) {
  catchAsync(async function (req, res, next) {
    const pets = await getRandomPetsData();
    res.status(200).json({
      ok: true,
      results: pets.length,
      pets,
    });
  })(req, res, next);
}

async function getPetsByUser(req, res, next) {
  catchAsync(async function (req, res, next) {
    const user = await getUserDataById(req.params.id);
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }
    const { savedPets, fosteredPets, adoptedPets } = user;
    const savedPetsList = await getPetData(savedPets);
    const fosteredPetsList = await getPetData(fosteredPets);
    const adoptedPetsList = await getPetData(adoptedPets);
    res.status(200).json({
      ok: true,
      results:
        savedPetsList.length + fosteredPetsList.length + adoptedPetsList.length,
      savedPets: savedPetsList,
      fosteredPets: fosteredPetsList,
      adoptedPets: adoptedPetsList,
    });
  })(req, res, next);
}

module.exports = {
  getAllPets,
  createPet,
  getPet,
  updatePet,
  deletePet,
  getRandomPets,
  getPetsByUser,
};
