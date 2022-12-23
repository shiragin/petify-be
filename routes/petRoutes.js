const express = require('express');
const { getAllPets } = require('../controllers/petsController');

const router = express.Router();

router.route('/').get(getAllPets);
// post(validateBody(userSchema), isUserExists,getAllUsers)
module.exports = router;
