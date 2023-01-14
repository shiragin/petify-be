const Query = require('../schemas/querySchema');

function getAllQueriesData(query) {
  return Query.find(query);
}

function getQueriesByUserIdData(userId) {
  return Query.find({ userId });
}

function createQueryData(body) {
  return Query.create(body);
}

module.exports = { getAllQueriesData, getQueriesByUserIdData, createQueryData };
