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

const {
  editSavedPets,
  editOwnedPets,
} = require('../controllers/usersController');

const { auth, checkIsAdmin } = require('../middleware/usersMiddleware');

const { getPictureUrl, upload } = require('../middleware/petsMiddleware');

const router = express.Router();

router
  .route('/')
  .get(getAllPets)
  .post(auth, checkIsAdmin, upload.single('picture'), getPictureUrl, createPet);

router.route('/random').get(getRandomPets);

router.route('/user/:id').get(auth, getPetsByUser);

router
  .route('/:id')
  .get(getPet)
  .patch(auth, checkIsAdmin, upload.single('picture'), getPictureUrl, updatePet)
  .delete(auth, checkIsAdmin, deletePet);

router.route('/:id/save').post(auth, editSavedPets).delete(auth, editSavedPets);

router.route('/:id/adopt').post(auth, editOwnedPets);

module.exports = router;
