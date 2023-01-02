const User = require('../schemas/usersSchema');

async function getAllUsersData(query) {
  try {
    const usersList = await User.find(query);
    return usersList;
  } catch (err) {
    console.error(err);
  }
}
async function getUserDataById(id) {
  try {
    const usersList = await User.findById(id);
    return usersList;
  } catch (err) {
    console.error(err);
  }
}

async function createUserData(body) {
  try {
    const newUser = await User.create(body);
    return newUser;
  } catch (err) {
    console.error(err);
  }
}

async function updateUserData(id, body) {
  try {
    const newUser = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
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
};
