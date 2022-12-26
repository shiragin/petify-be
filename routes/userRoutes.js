const express = require('express');
const { getAllUsers, createUser } = require('../controllers/usersController');
// const { isUserExists } = require('../middleware/user');
// const validateBody = require('../middleware/validateBody');
// const { userSchema } = require('../userSchema');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
// post(validateBody(userSchema), isUserExists,getAllUsers)
module.exports = router;
