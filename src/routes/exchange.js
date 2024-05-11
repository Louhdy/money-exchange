const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT } = require("../middlewares");
const { newExchange, listExchange, getDetailExchange, deleteExchange } = require("../controllers/exchange");
const { exchangeValidator, amountValidator } = require("../helpers");

const router = Router();

router.post(
  "/",
  [
    validateJWT,
    check("tipo_de_cambio").not().isEmpty().withMessage("Exchange type is required"),
    check("tipo_de_cambio").custom(exchangeValidator),
    check("monto_enviar")
      .not().isEmpty().withMessage("Amount to send cannot be empty")
      .isFloat({ min: 0.00001 }).withMessage("Amount to send must be a positive number")
      .custom(amountValidator),
    validateFields,
  ],
  newExchange
);

router.get("/", [validateJWT, validateFields], listExchange);

router.get(
  "/:id",
  [
    validateJWT,
    check("id").not().isEmpty().withMessage("ID is required"),
    check("id").isMongoId().withMessage("Invalid ID"),
    getDetailExchange,
  ],
  getDetailExchange
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id").not().isEmpty().withMessage("ID is required"),
    check("id").isMongoId().withMessage("Invalid ID"),
    validateFields,
  ],
  deleteExchange
);

module.exports = router;
