const express = require('express');
const { getAllPets } = require('../controllers/pets');
// const { isUserExists } = require('../middleware/user');
// const validateBody = require('../middleware/validateBody');
// const { userSchema } = require('../userSchema');

const router = express.Router();

router.route('/').get(getAllPets);
// post(validateBody(userSchema), isUserExists,getAllUsers)
module.exports = router;
