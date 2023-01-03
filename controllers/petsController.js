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

async function getAllPets(req, res) {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Pet.find(), req.query)
      .filter()
      // .sort()
      .limitFields()
      .paginate();

    const pets = await getAllPetsData(features.query);

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: pets.length,
      data: { pets },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Invalid request`,
      error: err.message || err.errmsg,
    });
  }
}

async function getPet(req, res) {
  try {
    const params = req.params.id.split(',');
    const pet = await getPetData(params);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: { pet },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Invalid request`,
      error: err.message || err.errmsg,
    });
  }
}

async function createPet(req, res) {
  try {
    const newPet = await createPetData(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        pet: newPet,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Invalid request`,
      error: err.message || err.errmsg,
    });
  }
}

async function updatePet(req, res) {
  try {
    if (req.body.colour) req.body.colour = req.body.colour.split(',');
    if (req.body.dietry) req.body.dietry = req.body.dietry.split(',');
    console.log(req.body);
    const pet = await updatePetData(req.params.id, req.body);
    res.status(200).json({
      ok: true,
      requestedAt: req.requestTime,
      data: { pet },
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: `Invalid request`,
      error: err.message || err.errmsg,
    });
  }
}

async function deletePet(req, res) {
  try {
    await deletePetData(req.params.id);
    res.status(204).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Invalid request`,
      error: err.message || err.errmsg,
    });
  }
}

async function getRandomPets(req, res) {
  try {
    const pets = await getRandomPetsData();
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: pets.length,
      data: { pets },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Invalid request`,
      error: err.message || err.errmsg,
    });
  }
}

async function getPetsByUser(req, res) {
  try {
    const { savedPets, fosteredPets, adoptedPets } = await getUserDataById(
      req.params.id
    );
    const ownedPets = [...fosteredPets, ...adoptedPets];
    const savedPetsList = await getPetData(savedPets);
    const ownedPetsList = await getPetData(ownedPets);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: savedPetsList.length + ownedPetsList.length,
      data: { savedPets: savedPetsList, ownedPets: ownedPetsList },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Invalid request`,
      error: err.message || err.errmsg,
    });
  }
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
