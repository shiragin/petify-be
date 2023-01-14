const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const usersRoute = require('./routes/usersRoute');
const petsRoute = require('./routes/petsRoute');
const queriesRoute = require('./routes/queriesRoute');

const app = express();
app.use(express.static(`${__dirname}/public`));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/users', usersRoute);
app.use('/pets', petsRoute);
app.use('/queries', queriesRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error middleware
app.use(globalErrorHandler);

module.exports = app;
