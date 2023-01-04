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

// Not existant routes
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Oops, page not found' });
});

// Global error middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
