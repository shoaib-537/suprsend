require("dotenv").config();
const express = require("express");
const { applyMiddlewares, applyErrorMdiddlewares } = require("./middlewares");
const { initRoutes } = require("./src/router");
const redisClient = require("./helpers/redis");
const { registerSubscribers } = require("./subscribers");

const app = express();

(async () => {
  // initialize redis store
  await redisClient.connect();
  // initialize database
  require("./helpers/db");
  // register all event subscribers
  registerSubscribers();
})();

// set ejs view engine
// app.set("view engine", "ejs");

// configure middlewares globally
applyMiddlewares(app);

// initialize routes
initRoutes(app);

// configure error middlewares
applyErrorMdiddlewares(app);


module.exports = app;
