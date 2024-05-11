require('dotenv').config();

const mongooseConnection = {
  uri: process.env.MONGODB_CNN,
  user: process.env.MONGODB_USER,
  password: process.env.MONGODB_PASSWORD
}

module.exports = { mongooseConnection };
