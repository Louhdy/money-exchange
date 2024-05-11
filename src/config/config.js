require('dotenv').config();

const app = {
  jwt: process.env.SECRET_JWT_KEY || '',
  endpoint: process.env.ENDPOINT || 'https://api.test.cambioseguro.com/api/v1.1/config/rates',
  port: process.env.PORT || 4000,
}

module.exports = { app };
