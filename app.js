const express = require("express");
const { getTopics } = require("./controllers/topics");
const { getArticlesById } = require("./controllers/articles");
const {
  handlePsqlErrors,
  handleServerErrors,
  pageNotFoundErrors,
} = require("./errors/errors");

const app = express();

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesById);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});
app.use(pageNotFoundErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
