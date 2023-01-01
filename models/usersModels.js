const User = require('./usersSchema');

async function getAllUsersData(query) {
  try {
    const usersList = await User.find(query);
    return usersList;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { getAllUsersData };
