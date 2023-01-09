const AppError = require('../utils/appError');

function handleCastErrorDB(err) {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
}

function handleDuplicateFieldsDB(err) {
  let message = '';
  const { keyValue } = err;
  if (keyValue.email) {
    message = `User with the email ${keyValue.email} already exists. Please choose another email.`;
  } else {
    message = `Duplicate field value. Please use another value.`;
  }
  return new AppError(message, 400);
}

function handleValidationErrorDB(err) {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
}

// function sendErrorDev(err, res) {
//   console.log('ERROR', err);
//   res.status(err.statusCode).json({
//     ok: false,
//     error: err,
//     status: err.status,
//     message: err.message,
//     stack: err.stack,
//   });
// }

function sendErrorProd(err, res) {
  // Operational, trusted error: send message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      ok: false,
      status: err.status,
      message: err.message,
    });

    // Programming or other unkown error, don't leak error details
  } else {
    console.error('ERROR', err);
    res.status(500).json({
      ok: false,
      status: 'error',
      message: 'Something went terribly wrong',
    });
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // if (process.env.NODE_ENV === 'development') {
  //   console.log('ERRRRORRRRR');
  //   sendErrorDev(err, res);
  // } else if (process.env.NODE_ENV === 'production') {

  let error = JSON.stringify(err);
  error = JSON.parse(error);
  error.message = error.message || err.message;

  console.log('ERROR', error);

  if (error.name === 'CastError') error = handleCastErrorDB(error);

  if (error.code === 11000) error = handleDuplicateFieldsDB(error);

  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

  sendErrorProd(error, res);
};
// };
