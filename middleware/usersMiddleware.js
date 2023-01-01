const { getAllUsersData } = require('../models/usersModels');

function checkPasswordsMatch(req, res, next) {
  const { password, passwordConfirm } = req.body;
  if (password !== passwordConfirm) {
    res.status(400).send(`Error signing up: Passwords don't match`);
    return;
  }
  next();
}

async function checkNewUser(req, res, next) {
  const user = await getAllUsersData({ email: req.body.email });
  if (user.length !== 0) {
    res
      .status(400)
      .send(`Error signing up: User ${req.body.email} already exists`);
    return;
  }
  next();
}

async function checkUserExists(req, res, next) {
  const user = await getAllUsersData({ email: req.body.email });
  if (user.length === 0) {
    res
      .status(400)
      .send(`Error signing up: User ${req.body.email} doesn't exists`);
    return;
  }
  res.locals.user = user[0];
  next();
}

function checkPassword(req, res, next) {
  if (req.body.password !== res.locals.user.password) {
    res.status(400).send(`Error logging in: Passwords don't match`);
    return;
  }
  next();
}

// const hashPwd = (req, res, next) => {};

module.exports = {
  checkPasswordsMatch,
  checkNewUser,
  checkUserExists,
  checkPassword,
};
