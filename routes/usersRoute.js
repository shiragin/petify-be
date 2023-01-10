const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  loginUser,
  updateUser,
} = require('../controllers/usersController');

const {
  checkPasswordsMatch,
  checkNewUser,
  hashPassword,
  checkUserExists,
  checkPassword,
  auth,
  checkOldPassword,
  checkUpdatedPassword,
} = require('../middleware/usersMiddleware');

const router = express.Router();

router.route('/').get(getAllUsers);

router
  .route('/signup')
  .post(checkPasswordsMatch, checkNewUser, hashPassword, createUser);

router.route('/login').post(checkUserExists, checkPassword, loginUser);

router
  .route('/:id')
  .get(getUser)
  .put(auth, checkOldPassword, checkUpdatedPassword, updateUser);

module.exports = router;
