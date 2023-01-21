const jwt = require('jsonwebtoken');
const User = require('../schemas/usersSchema');
const APIFeatures = require('../utils/apiFeatures');
const {
  getAllUsersData,
  getUserDataById,
  createUserData,
  updateUserData,
  editSavedPetsData,
} = require('../models/usersModel');
const { updatePetData } = require('../models/petsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

async function getAllUsers(req, res, next) {
  catchAsync(async function (req, res, next) {
    // EXECUTE QUERY
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      // .sort()
      .limitFields()
      .paginate();

    // Call modal
    const users = await getAllUsersData(features.query);

    // SEND RESPONSE
    res.status(200).json({
      ok: true,
      results: users.length,
      users,
    });
  })(req, res, next);
}

async function getUser(req, res, next) {
  catchAsync(async function (req, res, next) {
    const user = await getUserDataById(req.params.id);
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }
    res.status(200).json({
      ok: true,
      user,
    });
  })(req, res, next);
}

async function loginUser(req, res, next) {
  catchAsync(async function (req, res, next) {
    const { user, token, exp } = req.body;
    res.cookie('token', token, {
      maxAge: exp,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      // sameSite: 'none',
      // eslint-disable-next-line no-unneeded-ternary
      secure: process.env.NODE_ENV === 'production' ? true : false,
      // secure: true,
    });
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }
    res.status(200).json({
      ok: true,
      token,
      userId: user._id,
      exp,
    });
  })(req, res, next);
}

async function createUser(req, res, next) {
  catchAsync(async function (req, res, next) {
    const newUser = await createUserData(req.body);
    // move to utility function
    if (newUser) {
      const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET, {
        expiresIn: '2h',
      });
      const { exp } = jwt.decode(token);
      res.cookie('token', token, {
        maxAge: exp * 1000,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        // eslint-disable-next-line no-unneeded-ternary
        secure: process.env.NODE_ENV === 'production' ? true : false,
      });
      res.status(201).json({
        ok: true,
        userId: newUser._id,
        token,
        exp: exp * 1000,
      });
    }
  })(req, res, next);
}

async function updateUser(req, res, next) {
  catchAsync(async function (req, res, next) {
    const user = await updateUserData(req.body._id, req.body, next);
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }
    res.status(200).json({
      ok: true,
      requestedAt: req.requestTime,
      user,
    });
  })(req, res, next);
}

async function editSavedPets(req, res, next) {
  catchAsync(async function (req, res, next) {
    const user = await editSavedPetsData(req.params.id, {
      savedPets: req.body.savedPets,
    });
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }
    res.status(200).json({
      ok: true,
      user,
    });
  })(req, res, next);
}

async function editOwnedPets(req, res, next) {
  catchAsync(async function (req, res, next) {
    const user = await editSavedPetsData(req.params.id, {
      adoptedPets: req.body.adoptedPets,
      fosteredPets: req.body.fosteredPets,
    });
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }
    const pet = await updatePetData(req.body.petId, req.body.pet);
    if (!pet) {
      return next(new AppError('No pet found with that ID', 404));
    }
    console.log(pet);
    res.status(200).json({
      ok: true,
      requestedAt: req.requestTime,
      user,
      pet,
    });
  })(req, res, next);
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  getUser,
  loginUser,
  editSavedPets,
  editOwnedPets,
};
