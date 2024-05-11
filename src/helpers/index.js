const dbValidate = require("./dbValidate");
const generateJWT = require("./generateJWT");

module.exports = {
  ...dbValidate,
  ...generateJWT,
};
