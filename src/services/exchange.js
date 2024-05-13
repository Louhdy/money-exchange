const { ExchangeModule } = require("../models");
const { getRates } = require("../api/api");

class ExchangeService {
  constructor() {}

  async create(data, id_usuario) {
    const { tipo_de_cambio, monto_enviar } = data;

    const tasa_de_cambio = await getRates();
    if (!tasa_de_cambio) {
      const error = new Error("Error obtaining exchange rate");
      error.status = 404;
      throw error;
    }

    const monto_recibir =
      tipo_de_cambio === "compra"
        ? monto_enviar * tasa_de_cambio.purchase_price
        : monto_enviar / tasa_de_cambio.sale_price;

    return await ExchangeModule.create({
      tipo_de_cambio,
      tasa_de_cambio,
      monto_enviar,
      monto_recibir,
      id_usuario,
    });
  }

  async find(userId) {
    return ExchangeModule.find({id_usuario: userId});
  }

  async findOne(exchangeId, userId) {
    const data = await ExchangeModule.findOne({
      _id: exchangeId,
      id_usuario: userId,
    });
    if (!data) {
      const error = new Error("No exchange requests found.");
      error.status = 404;
      throw error;
    }
    return data;
  }

  async delete(exchangeId, userId) {
    const data = await ExchangeModule.findOneAndDelete({
      _id: exchangeId,
      id_usuario: userId,
    });
    if (!data) {
      const error = new Error("No exchange requests found.");
      error.status = 404;
      throw error;
    }
    return data;
  }
}

module.exports = ExchangeService;
