const Query = require('../schemas/querySchema');

function getAllQueriesData(query) {
  return Query.find(query);
}

function getQueriesByIdData(id) {
  return Query.findById(id);
}

function getQueriesByUserIdData(userId) {
  return Query.find({ userId });
}

function createQueryData(body) {
  return Query.create(body);
}

function updateQueryData(id, body) {
  return Query.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
}

module.exports = {
  getAllQueriesData,
  getQueriesByUserIdData,
  createQueryData,
  getQueriesByIdData,
  updateQueryData,
};
