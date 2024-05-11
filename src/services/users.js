const { User } = require("../models");
const bcryptjs = require("bcryptjs");

class UserService {
  constructor() {}

  async create({ email, password }) {
    // Create a new user instance
    const newUser = new User({ email, password });

    // Generate a salt and hash the password
    const salt = bcryptjs.genSaltSync();
    newUser.password = bcryptjs.hashSync(password, salt);

    // Save the user to the database
    return await newUser.save();
  }
}

module.exports = UserService;
