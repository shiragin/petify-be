const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  getUserByEmail,
  updateUser,
} = require('../controllers/usersController');

const {
  checkPasswordsMatch,
  checkNewUser,
  hashPassword,
  checkUserExists,
  checkPassword,
  auth,
} = require('../middleware/usersMiddleware');

const router = express.Router();

router.route('/').get(getAllUsers);

router
  .route('/signup')
  .post(checkPasswordsMatch, checkNewUser, hashPassword, createUser);

router.route('/login').post(checkUserExists, checkPassword, getUserByEmail);

router.route('/:id').get(getUser).patch(auth, updateUser);

module.exports = router;
