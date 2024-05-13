const { Router } = require("express");
const { body } = require("express-validator");
const { validateFields } = require("../middlewares");
const { emailValidator } = require("../helpers/dbValidate");
const { newUser } = require("../controllers/users");

const router = Router();


/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create new user
 *     tags: [Login]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: [{}]
 *     requestBody:
 *       description: New user info
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
// Validate user input for creating a new user
router.post(
  "/",
  [
    // Validate password
    body("password")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters long"),
    // Validate email format
    body("email")
      .isEmail()
      .withMessage("Invalid email address"),
    // Custom validation for email uniqueness
    body("email")
      .custom(emailValidator)
      .withMessage("Email already exists"),
    // Middleware to handle validation errors
    validateFields,
  ],
  // Controller function for creating a new user
  newUser
);

module.exports = router;
