const express = require('express');
const morgan = require('morgan');

require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/users', userRoutes);
app.use('/pets', petRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
