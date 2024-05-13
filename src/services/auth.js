const bcryptjs = require("bcryptjs");
const { UserModule } = require("../models");
const { generateJWT } = require("../helpers");

class AuthService {
  async login({ email, password }) {
    const user = await UserModule.findOne({ email });

    if (!user || !bcryptjs.compareSync(password, user.password)) {
      throw new Error("Invalid email or password");
    }

    const token = await generateJWT(user.id);

    return { user, token };
  }
}

module.exports = AuthService;
