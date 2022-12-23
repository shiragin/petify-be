const { getAllPetsData } = require('../models/petsModel');

async function getAllPets(req, res) {
  try {
    const pets = await getAllPetsData();
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: pets.length,
      data: { pets },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Invalid request`,
      error: err.message || err.errmsg,
    });
  }
}

// function addUser(req, res) {
//   // const users = getAllUsersModel();
//   res.send(user);
// }

module.exports = { getAllPets };
