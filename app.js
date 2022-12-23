const express = require('express');
const morgan = require('morgan');

const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/users', userRoutes);
app.use('/pets', petRoutes);

module.exports = app;
