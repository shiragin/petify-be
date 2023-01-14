// const Query = require('../schemas/querySchema');
const catchAsync = require('../utils/catchAsync');
const {
  getAllQueriesData,
  getQueriesByUserIdData,
  createQueryData,
} = require('../models/queriesModel');

async function getAllQueries(req, res, next) {
  catchAsync(async function (req, res, next) {
    const queries = await getAllQueriesData();
    res.status(201).json({
      ok: true,
      queries,
    });
  })(req, res, next);
}

async function getQueriesById(req, res, next) {
  catchAsync(async function (req, res, next) {
    const { id } = req.params;
    const queries = await getQueriesByUserIdData(id);
    res.status(201).json({
      ok: true,
      queries,
    });
  })(req, res, next);
}

async function getQueriesByEmail(req, res, next) {
  catchAsync(async function (req, res, next) {
    console.log(req.query);
    const { email } = req.body;
    const queries = await getAllQueriesData(email);
    res.status(201).json({
      ok: true,
      queries,
    });
  })(req, res, next);
}

async function createQuery(req, res, next) {
  catchAsync(async function (req, res, next) {
    const newQuery = await createQueryData(req.body);
    res.status(201).json({
      ok: true,
      query: newQuery,
    });
  })(req, res, next);
}

module.exports = {
  getAllQueries,
  getQueriesById,
  getQueriesByEmail,
  createQuery,
};
