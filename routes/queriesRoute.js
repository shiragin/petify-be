const express = require('express');
const {
  getAllQueries,
  getQueriesById,
  getQueriesByUserId,
  createQuery,
  updateQuery,
} = require('../controllers/queriesController');
const { auth, checkIsAdmin } = require('../middleware/usersMiddleware');

const router = express.Router();

router
  .route('/')
  .get(auth, checkIsAdmin, getAllQueries)
  .post(auth, createQuery);

router.route('/:id').get(auth, checkIsAdmin, getQueriesById);

router.route('/:id/reply').patch(auth, checkIsAdmin, updateQuery);

router.route('/users/:id').get(auth, getQueriesByUserId);

module.exports = router;
