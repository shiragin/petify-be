const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  getUserDataById,
  getUserDataByEmail,
  updateUserData,
  getUserDataFullById,
} = require('../models/usersModel');
const AppError = require('../utils/appError');

function checkPasswordsMatch(req, res, next) {
  const { password, passwordConfirm } = req.body;
  if (password.length < 8) {
    next(
      new AppError(
        `Error signing up: Your password must have at least 8 characters`,
        400
      )
    );
    return;
  }
  if (password !== passwordConfirm) {
    next(new AppError(`Error signing up: Passwords don't match`, 400));
    return;
  }
  next();
}

async function checkNewUser(req, res, next) {
  const user = await getUserDataByEmail({ email: req.body.email });
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

async function hashPassword(req, res, next) {
  const saltRounds = 10;
  try {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    next();
  } catch (err) {
    next(new AppError(err, 500));
  }
}

async function checkUserExists(req, res, next) {
  const user = await getUserDataByEmail({ email: req.body.email });
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

async function setLastLogin(req, res, next) {
  req.body.user.lastLogin = Date.now();
  console.log(req.body.user.lastLogin);
  const updatedUser = await updateUserData(req.body.user._id, {
    lastLogin: req.body.user.lastLogin,
  });
  console.log(updatedUser);
  next();
}

async function checkOldPassword(req, res, next) {
  console.log(req.body);
  const user = await getUserDataFullById(req.body._id);
  if (req.body.newPassword !== '') {
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
    next();
    // const { password } = req.body;
    // if (user.password === password) next();
    // else {
    //   next(
    //     new AppError(
    //       `Error logging in: Incorrect passowrd. Please try again.`,
    //       500
    //     )
    //   );
    // }
  }
}

async function checkUpdatedPassword(req, res, next) {
  if (req.body.newPassword) {
    if (req.body.newPassword.length < 8) {
      next(
        new AppError(
          `Error signing up: Your password must have at least 8 characters`,
          400
        )
      );
      return;
    }
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
    next(new AppError('Authorisation cookies required', 401));
  }
  jwt.verify(req.cookies.token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      next(new AppError('Unauthorised', 401));
    }
    if (decoded) {
      req.body.userId = decoded.id;
      next();
    }
  });
}

async function checkIsAdmin(req, res, next) {
  const user = await getUserDataById(req.body.userId);
  if (!user.isAdmin) {
    next(new AppError(`Unauthorised! User is not an admin.`, 403));
  } else next();
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
  setLastLogin,
  checkIsAdmin,
};
