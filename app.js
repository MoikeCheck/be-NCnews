const express = require("express");
const { getTopics } = require("./controllers/topics");
const { getArticlesById } = require("./controllers/articles");
const { getUsers } = require("./controllers/users");
const {
  handlePsqlErrors,
  handleServerErrors,
  customErrors,
} = require("./errors/errors");

const app = express();

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/users", getUsers);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});
app.use(customErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
