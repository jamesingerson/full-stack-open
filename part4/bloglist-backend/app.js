const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
} = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

logger.info("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(tokenExtractor);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
