const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) {
          console.error("Error generating token:", err);
          reject("Unable to generate token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
