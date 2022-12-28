const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
} = require('../controllers/usersController');
// const { isUserExists } = require('../middleware/user');
// const validateBody = require('../middleware/validateBody');
// const { userSchema } = require('../userSchema');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser);
// post(validateBody(userSchema), isUserExists,getAllUsers)
module.exports = router;
