const User = require('../schemas/usersSchema');

function getAllUsersData(query) {
  return User.find(query, { password: 0, passwordConfirm: 0 });
}

function getUserDataById(id) {
  return User.findById(id, { password: 0, passwordConfirm: 0 });
}

async function getUserDataFullById(id) {
  const user = await User.findById(id);
  return user;
}

function getUserDataByEmail(email) {
  return User.find(email);
}

function createUserData(body) {
  return User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phoneNumber: body.phoneNumber,
    password: body.password,
  });
}

function updateUserData(id, body) {
  return User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  }).select({ password: 0 });
}

function editSavedPetsData(id, body) {
  return User.findByIdAndUpdate(
    id,
    { $set: body },
    {
      new: true,
      runValidators: true,
    }
  ).select({ password: 0 });
}

module.exports = {
  getAllUsersData,
  getUserDataById,
  getUserDataByEmail,
  createUserData,
  updateUserData,
  editSavedPetsData,
  getUserDataFullById,
};
