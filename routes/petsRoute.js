const express = require('express');
const {
  getAllPets,
  createPet,
  getPet,
  updatePet,
  deletePet,
  getRandomPets,
  getPetsByUser,
} = require('../controllers/petsController');

const router = express.Router();

router.route('/').get(getAllPets).post(createPet);

router.route('/random').get(getRandomPets);

router.route('/user/:id').get(getPetsByUser);

router.route('/:id').get(getPet).patch(updatePet).delete(deletePet);

module.exports = router;
