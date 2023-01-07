const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getAllUsersData } = require('../models/usersModel');
const AppError = require('../utils/appError');

function checkPasswordsMatch(req, res, next) {
  const { password, passwordConfirm } = req.body;
  if (password !== passwordConfirm) {
    // res.status(400).send(`Error signing up: Passwords don't match`);
    // const err = new Error(`Error signing up: Passwords don't match`);
    // err.statusCode = 400;
    // next(err);
    next(new AppError(`Error signing up: Passwords don't match`, 400));
    return;
  }
  next();
}

async function checkNewUser(req, res, next) {
  const user = await getAllUsersData({ email: req.body.email });
  if (user.length !== 0) {
    // res
    //   .status(400)
    //   .send(`Error signing up: User ${req.body.email} already exists`);
    next(
      new AppError(
        `Error signing up: User ${req.body.email} already exists`,
        400
      )
    );
    return;
  }
  next();
}

const hashPassword = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      // res.status(500).send(err);
      next(new AppError(err, 500));
      return;
    }

    req.body.password = hash;
    next();
  });
};

async function checkUserExists(req, res, next) {
  const user = await getAllUsersData({ email: req.body.email });
  if (user.length === 0) {
    // res
    //   .status(400)
    //   .send(`Error signing up: User ${req.body.email} doesn't exists`);
    next(
      new AppError(
        `Error signing up: User ${req.body.email} doesn't exists`,
        400
      )
    );
    return;
  }
  req.body.user = user[0];
  next();
}

async function checkPassword(req, res, next) {
  const { password, user } = req.body;
  try {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        // res.status(500).send(`Error logging in: ${err}`);
        next(new AppError(`Error logging in: ${err}`, 500));
        return;
      }
      if (!result) {
        // res.status(400).send(`Error logging in: Passwords don't match`);
        next(
          new AppError(
            `Error logging in: Incorrect passowrd. Please try again.`,
            500
          )
        );
        return;
      }
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: '2h',
      });
      const { exp } = jwt.decode(token);
      req.body.token = token;
      req.body.exp = exp * 1000;
      next();
    });
  } catch (err) {
    // res.status(500).send(`Error logging in: ${err}`);
    next(new AppError(`Error logging in: ${err}`, 500));
  }
}

async function auth(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send('Authorization headers required');
    return;
  }
  const token = req.headers.authorization.replace('Bearer ', '');
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(401).send('Unauthorized');
      return;
    }
    if (decoded) {
      req.body.userId = decoded.id;
      console.log(req.body);
      next();
    }
  });
}

module.exports = {
  checkPasswordsMatch,
  checkNewUser,
  hashPassword,
  checkUserExists,
  checkPassword,
  auth,
};
