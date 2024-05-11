const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  email: {
    type: String,
    required: [true, "Email is mandatory\n"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is mandatory\n"],
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", UserSchema);
