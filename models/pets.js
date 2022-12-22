const pets = require('../PetsData.json');

function getAllPetsData() {
  return pets;
}

module.exports = { getAllPetsData };
