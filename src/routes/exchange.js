const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT } = require("../middlewares");
const { newExchange, listExchange, getDetailExchange, deleteExchange } = require("../controllers/exchange");
const { exchangeValidator, amountValidator } = require("../helpers");

const router = Router();

/**
 * @swagger
 * /api/exchange:
 *   post:
 *     summary: Create new exchange request
 *     tags: [Exchange]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *     requestBody:
 *       description: Exchange to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo_de_cambio:
 *                 type: string
 *               monto_enviar:
 *                 type: int
 *             example:
 *                tipo_de_cambio: "venta"
 *                monto_enviar: "60"
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
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

/**
 * @swagger
 * /api/exchange:
 *   get:
 *     summary: Get list of exchange requests
 *     tags: [Exchange]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
router.get("/", [validateJWT, validateFields], listExchange);

/**
 * @swagger
 * /api/exchange/{id}
 *   get:
 *     summary: Get detail of an exchange request
 *     tags: [Exchange]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the exchange request
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
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

/**
 * @swagger
 * /api/exchange/{id}:
 *   delete:
 *     summary: Delete an exchange request
 *     tags: [Exchange]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the exchange request
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # Requiere un token de autorización
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Exchange request deleted successfully"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Bad Request"
 *       404:
 *         description: Exchange request not found
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Exchange request not found"
 */
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
