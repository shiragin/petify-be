const User = require('../schemas/usersSchema');

async function getAllUsersData(query) {
  try {
    const usersList = await User.find(query);
    return usersList;
  } catch (err) {
    console.error(err);
  }
}
async function getUserDataById(id, next) {
  try {
    const usersList = await User.findById(id);
    return usersList;
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    next(err);
  }
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
  createUserData,
  updateUserData,
  editSavedPetsData,
};
