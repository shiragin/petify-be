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
const { auth } = require('../middleware/usersMiddleware');

const router = express.Router();

router.route('/').get(getAllPets).post(auth, createPet);

router.route('/random').get(getRandomPets);

router.route('/user/:id').get(auth, getPetsByUser);

router.route('/:id').get(getPet).patch(auth, updatePet).delete(auth, deletePet);

module.exports = router;
