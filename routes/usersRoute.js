const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  getUserByEmail,
  updateUser,
} = require('../controllers/usersController');
// const { isUserExists } = require('../middleware/user');
const {
  checkPasswordsMatch,
  checkNewUser,
  checkUserExists,
  checkPassword,
} = require('../middleware/usersMiddleware');

const router = express.Router();

router.route('/').get(getAllUsers);

router.route('/signup').post(checkPasswordsMatch, checkNewUser, createUser);

router.route('/login').post(checkUserExists, checkPassword, getUserByEmail);

router.route('/:id').get(getUser).patch(updateUser);

module.exports = router;
