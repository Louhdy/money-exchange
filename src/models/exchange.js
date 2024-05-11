const { Schema, model } = require("mongoose");

const ExchangeSchema = Schema({
  tipo_de_cambio: {
    type: String,
    enum: ["compra", "venta"],
    required: true,
  },
  tasa_de_cambio: {
    _id: {
      type: String,
      required: true,
    },
    purchase_price: {
      type: Number,
      required: true,
    },
    sale_price: {
      type: Number,
      required: true,
    },
  },
  monto_enviar: {
    type: Number,
    required: true,
  },
  monto_recibir: {
    type: Number,
    required: true,
  },
  id_usuario: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

ExchangeSchema.methods.toJSON = function () {
  const { __v, password, _id, ...rest } = this.toObject();
  rest.id = _id;
  return rest;
};

module.exports = model("Exchange", ExchangeSchema);
