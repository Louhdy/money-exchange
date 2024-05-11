const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/user");
const { app } = require("../config/config");

const validateJWT = async (req = request, res = response, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      msg: "No hay token en la petición o el formato es incorrecto",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { uid } = jwt.verify(token, app.jwt);

    const user = await Usuario.findById(uid);

    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "Token no válido",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validateJWT,
};
