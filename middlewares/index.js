const validations = require("../middlewares/validations");
const validateJWT = require("../middlewares/validate-jwt");
const validateRole = require("../middlewares/validate-role");

module.exports = {
  ...validations,
  ...validateJWT,
  ...validateRole,
};
