const { getAllPetsData } = require('../models/pets');

function getAllPets(req, res) {
  const pets = getAllPetsData();
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: pets.length,
    data: { pets },
  });
}

// function addUser(req, res) {
//   // const users = getAllUsersModel();
//   res.send(user);
// }

module.exports = { getAllPets };
