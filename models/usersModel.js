const User = require('../schemas/usersSchema');

function getAllUsersData(query) {
  return User.find(query, { password: 0, passwordConfirm: 0 });
}

function getUserDataById(id) {
  return User.findById(id);
}

function getUserDataByEmail(email) {
  return User.find(email);
}

function createUserData(body) {
  return User.create(body);
}

function updateUserData(id, body) {
  return User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
}

function editSavedPetsData(id, body) {
  return User.findByIdAndUpdate(
    id,
    { $set: body },
    {
      new: true,
      runValidators: true,
    }
  );
}

module.exports = {
  getAllUsersData,
  getUserDataById,
  getUserDataByEmail,
  createUserData,
  updateUserData,
  editSavedPetsData,
};
