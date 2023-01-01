const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const usersRoute = require('./routes/usersRoute');
const petsRoute = require('./routes/petsRoute');

const app = express();
app.use(express.static(`${__dirname}/public`));

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/users', usersRoute);
app.use('/pets', petsRoute);

module.exports = app;
