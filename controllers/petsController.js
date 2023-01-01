const Pet = require('../models/petsSchema');
const User = require('../models/usersSchema');
const APIFeatures = require('../utils/apiFeatures');

async function getAllPets(req, res) {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Pet.find(), req.query)
      .filter()
      // .sort()
      .limitFields()
      .paginate();

    const pets = await features.query;

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
    const pet = await Pet.find({ _id: { $in: params } });
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
    const newPet = await Pet.create(req.body);
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
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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

async function deletePet(req, res) {
  try {
    await Pet.findByIdAndDelete(req.params.id);
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
    // const pets = await Pet.aggregate([{ $sample: { size: 4 } }]);

    const pets = await Pet.aggregate([
      {
        $match: { adoptionStatus: 'Available' },
      },
      {
        $sample: { size: 4 },
      },
    ]);

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

async function getPetsByUser(req, res) {
  try {
    const { savedPets, fosteredPets, adoptedPets } = await User.findById(
      req.params.id
    );
    const ownedPets = [...fosteredPets, ...adoptedPets];
    const savedPetsList = await Pet.find({ _id: { $in: savedPets } });
    const ownedPetsList = await Pet.find({ _id: { $in: ownedPets } });
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
