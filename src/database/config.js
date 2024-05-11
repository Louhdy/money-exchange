const mongoose = require("mongoose");
const { mongooseConnection } = require("../config/database");

const dbConnection = async () => {
  try {
    await mongoose.connect(mongooseConnection.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Database online");
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Error connecting to the database");
  }
};

module.exports = {
  dbConnection,
};
