const User = require('../schemas/usersSchema');

async function getAllUsersData(query) {
  return await User.find(query, { password: 0, passwordConfirm: 0 });
}

async function getUserDataById(id) {
  return await User.findById(id);
}

async function getUserDataByEmail(email) {
  return await User.find(email);
}

async function createUserData(body) {
  return User.create(body);
}

async function updateUserData(id, body) {
  return User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
}

async function editSavedPetsData(id, body) {
  try {
    const newUser = await User.findByIdAndUpdate(
      id,
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    );
    return newUser;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAllUsersData,
  getUserDataById,
  getUserDataByEmail,
  createUserData,
  updateUserData,
  editSavedPetsData,
};
