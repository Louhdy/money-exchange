const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares");
const { emailValidator } = require("../helpers/dbValidate");
const { newUser } = require("../controllers/users");

const router = Router();

// Validate user input for creating a new user
router.post(
  "/",
  [
    // Validate password
    check("password")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters long"),
    // Validate email format
    check("email")
      .isEmail()
      .withMessage("Invalid email address"),
    // Custom validation for email uniqueness
    check("email")
      .custom(emailValidator)
      .withMessage("Email already exists"),
    // Middleware to handle validation errors
    validateFields,
  ],
  // Controller function for creating a new user
  newUser
);

module.exports = router;
