const db = require("../db/connection");

exports.selectArticlesById = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [id])
    .then(({ article }) => {
      return article;
    });
};
