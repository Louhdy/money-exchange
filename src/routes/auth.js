const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validateFields");

const { login } = require("../controllers/auth");

const router = Router();

const loginValidationMiddleware = [
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  validateFields,
];

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in into the application
 *     tags: [Login]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *     requestBody:
 *       description: User to be logged
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *                email: "melgomez.gar@gmail.com"
 *                password: "prestamype"
 *       400:
 *         description: Bad Request
 *         content:
 *          application/json:
 *            example:
 *             error:
 *              message: "Bad Request"
 */
// Define the login route with the validation middleware and the authentication controller
router.post("/login", loginValidationMiddleware, login);

// Export the router
module.exports = router;
