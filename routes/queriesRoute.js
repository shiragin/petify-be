const express = require('express');
const {
  getAllQueries,
  getQueriesById,
  createQuery,
} = require('../controllers/queriesController');

const router = express.Router();

router.route('/').get(getAllQueries).post(createQuery);

router.route('/users/:id').get(getQueriesById);

module.exports = router;
