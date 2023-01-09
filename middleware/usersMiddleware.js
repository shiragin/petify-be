const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getAllUsersData, getUserDataById } = require('../models/usersModel');
const AppError = require('../utils/appError');

function checkPasswordsMatch(req, res, next) {
  const { password, passwordConfirm } = req.body;
  if (password !== passwordConfirm) {
    next(new AppError(`Error signing up: Passwords don't match`, 400));
    return;
  }
  next();
}

async function checkNewUser(req, res, next) {
  const user = await getAllUsersData({ email: req.body.email });
  if (user.length !== 0) {
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
      next(new AppError(err, 500));
      return;
    }
    req.body.password = hash;
  });
  next();
};

async function checkUserExists(req, res, next) {
  const user = await getAllUsersData({ email: req.body.email });
  if (user.length === 0) {
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
        next(new AppError(`Error logging in: ${err}`, 500));
        return;
      }
      if (!result) {
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
    next(new AppError(`Error logging in: ${err}`, 500));
  }
}

async function checkOldPassword(req, res, next) {
  const user = await getUserDataById({ _id: req.body._id });
  if (req.body.oldPassword) {
    bcrypt.compare(req.body.oldPassword, user.password, (err, result) => {
      if (err) {
        next(new AppError(`Error changing passwords: ${err}`, 500));
        return;
      }
      if (!result) {
        next(
          new AppError(
            `Error changing passwords: Incorrect passowrd. Please try again.`,
            500
          )
        );
        return;
      }
      next();
    });
  } else {
    const { password } = req.body;
    if (user.password === password) next();
    else {
      next(
        new AppError(
          `Error logging in: Incorrect passowrd. Please try again.`,
          500
        )
      );
    }
  }
}

async function checkUpdatedPassword(req, res, next) {
  if (req.body.newPassword) {
    if (req.body.newPassword === req.body.passwordConfirm) {
      req.body.password = req.body.newPassword;
      const saltRounds = 10;
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          next(new AppError(err, 500));
          return;
        }
        req.body.password = hash;
        next();
      });
    } else {
      next(
        new AppError(
          `Error updating profile: Passowrds don't match. Please try again.`,
          500
        )
      );
    }
  } else next();
}

async function auth(req, res, next) {
  if (!req.cookies.token) {
    res.status(401).send('Authorization cookies required');
    return;
  }
  // const token = req.headers.authorization.replace('Bearer ', '');
  jwt.verify(req.cookies.token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send('Unauthorized');
      return;
    }
    if (decoded) {
      req.body.userId = decoded.id;
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
  checkOldPassword,
  checkUpdatedPassword,
};
