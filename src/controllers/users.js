const { response } = require("express");

const UserService = require("../services/users");

const userService = new UserService();
const newUser = async (req, res = response, next) => {
  try {
    const user = await userService.create(req.body);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newUser,
};
