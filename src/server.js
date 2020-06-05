require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
const express = require("express");
require("express-async-errors");
const routes = require("./routes");
const errorMiddleware = require("./middlewares/error.middleware");
const app = express();

app.use("/api/v1", routes);
app.use(errorMiddleware);

module.exports = app;
