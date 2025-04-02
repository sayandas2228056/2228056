const express = require("express");
const numbersRouter = require("./routes/numbers");

const app = express();

app.use("/numbers", numbersRouter);

module.exports = app;
