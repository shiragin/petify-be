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

module.exports = { getAllUsersData, getUserDataById };
