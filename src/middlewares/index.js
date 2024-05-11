const validateFiles = require("./validateFields");
const validateJWT = require("./validateJwt");
const errorHandler = require("./errorHandler");

module.exports = {
  ...validateFiles,
  ...validateJWT,
  ...errorHandler,
};
