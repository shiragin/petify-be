const express = require('express');
const {
  getAllPets,
  createPet,
  getPet,
  updatePet,
  deletePet,
} = require('../controllers/petsController');
// const validatePet = require('../middleware/validatePet');
// const { petSchema } = require('../middleware/petSchema');

const router = express.Router();

router.route('/').get(getAllPets).post(
  // validatePet(petSchema),
  createPet
);

router.route('/:id').get(getPet).patch(updatePet).delete(deletePet);

module.exports = router;
