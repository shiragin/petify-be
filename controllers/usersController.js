// const jwt = require('jsonwebtoken');
const User = require('../schemas/usersSchema');
const APIFeatures = require('../utils/apiFeatures');
const {
  getAllUsersData,
  getUserDataById,
  createUserData,
  updateUserData,
  editSavedPetsData,
} = require('../models/usersModel');

async function getAllUsers(req, res) {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      // .sort()
      .limitFields()
      .paginate();

    // Call modal
    const users = await getAllUsersData(features.query);
    console.log(users);
    console.log(typeof users);

    // SEND RESPONSE
    res.status(200).json({
      ok: true,
      requestedAt: req.requestTime,
      results: users.length,
      data: { users },
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: `Invalid request`,
      error: err.message || err.errmsg,
    });
  }
}

async function getUser(req, res, next) {
  try {
    const user = await getUserDataById(req.params.id);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Invalid request`,
      error: err.message || err.errmsg,
    });
  }
}

async function getUserByEmail(req, res) {
  try {
    const { user, token, exp } = req.body;
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: { token, user, exp },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Invalid request`,
      error: err.message || err.errmsg,
    });
  }
}

async function createUser(req, res) {
  try {
    const newUser = await createUserData(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Invalid request`,
      error: err.message || err.errmsg,
    });
  }
}

async function updateUser(req, res) {
  try {
    const user = await updateUserData(req.params.id, req.body.user);
    res.status(200).json({
      ok: true,
      requestedAt: req.requestTime,
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: `Invalid request`,
      error: err.message || err.errmsg,
    });
  }
}

async function editSavedPets(req, res) {
  try {
    const user = await editSavedPetsData(req.params.id, req.body.savedPets);
    res.status(200).json({
      ok: true,
      requestedAt: req.requestTime,
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      message: `Invalid request`,
      error: err.message || err.errmsg,
    });
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  getUser,
  getUserByEmail,
  editSavedPets,
};
