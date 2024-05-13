const { UserModule } = require("../models");

const emailValidator = async (email = "") => {
  const registeredEmail = await UserModule.findOne({ email });
  if (registeredEmail) {
    return Promise.reject(`The email: ${email}, is already registered`);
  }
  return true;
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
