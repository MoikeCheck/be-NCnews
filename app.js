const express = require("express");
const { getTopics } = require("./controllers/topics");
const {
  handlePsqlErrors,
  handleServerErrors,
  pageNotFoundErrors,
} = require("./errors/errors");

const app = express();

app.get("/api/topics", getTopics);

app.use(pageNotFoundErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);
app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});
module.exports = app;
