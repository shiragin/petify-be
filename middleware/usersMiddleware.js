const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

const hashPassword = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    req.body.password = hash;
    next();
  });
};

async function checkUserExists(req, res, next) {
  const user = await getAllUsersData({ email: req.body.email });
  if (user.length === 0) {
    res
      .status(400)
      .send(`Error signing up: User ${req.body.email} doesn't exists`);
    return;
  }
  console.log(user[0]);
  req.body.user = user[0];
  next();
}

async function checkPassword(req, res, next) {
  const { password, user } = req.body;
  console.log('ok');
  try {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(500).send(`Error logging in: ${err}`);
        return;
      }
      if (!result) {
        res.status(400).send(`Error logging in: Passwords don't match`);
        return;
      }
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: '1h',
      });
      console.log('TOKEN', token);
      req.body.token = token;
      next();
    });
  } catch (err) {
    res.status(500).send(`Error logging in: ${err}`);
  }
}

async function auth(req, res, next) {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    res.status(401).send('Authorization headers required');
    return;
  }
  const token = req.headers.authorization.replace('Bearer ', '');
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send('Unauthorized');
      return;
    }
    if (decoded) {
      console.log(decoded);
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
};
