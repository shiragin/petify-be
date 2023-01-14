const express = require('express');
const {
  getAllQueries,
  getQueriesById,
  getQueriesByUserId,
  createQuery,
  updateQuery,
} = require('../controllers/queriesController');

const router = express.Router();

router.route('/').get(getAllQueries).post(createQuery);

router.route('/:id').get(getQueriesById);

router.route('/:id/reply').patch(updateQuery);

router.route('/users/:id').get(getQueriesByUserId);

module.exports = router;
