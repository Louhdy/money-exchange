require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { dbConnection } = require("./database/config");
const { logErrors, errorHandler } = require("./middlewares");

const app = express();
const PORT = process.env.PORT;

// Define API paths in a centralized object
const apiPaths = {
  auth: "/api/auth",
  exchange: "/api/exchange",
  users: "/api/users",
};

// Connect to the database
const initDB = async () => {
  try {
    await dbConnection();
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Unable to connect to database");
  }
};

const configureMiddlewares = () => {
  app.use(cors());
  app.use(express.json());
  app.use(express.static("public"));
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};

const configureRoutes = () => {
  app.use(apiPaths.auth, require("./routes/auth"));
  app.use(apiPaths.exchange, require("./routes/exchange"));
  app.use(apiPaths.users, require("./routes/users"));
};

const configureErrorHandlers = () => {
  app.use(logErrors);
  app.use(errorHandler);
};

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
};

const initializeApp = async () => {
  await initDB();
  configureMiddlewares();
  configureRoutes();
  configureErrorHandlers();
  startServer();
};

initializeApp().catch(error => {
  console.error("App initialization error:", error);
  process.exit(1);
});
