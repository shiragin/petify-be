const Ajv = require('ajv');

const ajv = new Ajv();

const format = require('ajv-formats');

format(ajv);

function validatePet(schema) {
  return (req, res, next) => {
    const validate = ajv.validate(schema, req.body);
    if (validate) return next();
    console.log(`Invalid data: ${req.body}`);
    res.status(400).send(`Invalid data: ${JSON.stringify(ajv.errors)}`);
  };
}

module.exports = validatePet;
