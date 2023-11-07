const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
const { handleCustomErrors, handlePSQLErrors, handleServerErrors } = require("./errors");
const apiRouter = require("../routers/api-router");


app.use(express.json());
app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "URL not found" });
});

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
