const express = require("express");
const cors = require("cors");
const { getTopics } = require("./controllers/topics");
const { getUsers } = require("./controllers/users");
const {
  getArticleById,
  getArticles,
  patchArticleById,
} = require("./controllers/articles");
const {
  getCommentsByArticleId,
  postComments,
  deleteCommentsById,
} = require("./controllers/comments");
const {
  handlePsqlErrors,
  handleServerErrors,
  customErrors,
} = require("./errors/errors");
const { describeEndpoints } = require("./controllers/api-endpoints");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticleById);
app.get("/api/users", getUsers);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", postComments);
app.delete("/api/comments/:comment_id", deleteCommentsById);
app.get("/api", describeEndpoints);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Path not found" });
});
app.use(customErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
