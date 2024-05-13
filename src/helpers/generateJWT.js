const jwt = require("jsonwebtoken");
const { app } = require("../config/config");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      app.jwt,
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
