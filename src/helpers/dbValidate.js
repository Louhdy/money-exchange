const { User } = require("../models");

const emailValidator = async (email = "") => {
  const registeredEmail = await User.findOne({ email });
  if (registeredEmail) {
    throw new Error(`The email: ${email}, is already registered`);
  }
};

const exchangeValidator = async (tipo_de_cambio) => {
  if (tipo_de_cambio !== "compra" && tipo_de_cambio !== "venta") {
    throw new Error(`The exchange rate: ${tipo_de_cambio}, is not valid`);
  }
};

const amountValidator = async (value) => {
  if (value === 0) {
    throw new Error("The amount to send cannot be zero");
  }
  return true;
};

module.exports = {
  emailValidator,
  exchangeValidator,
  amountValidator,
};
