const db = require("../db/connection");

exports.selectArticles = () => {
  return db
    .query(
      "SELECT author, title, article_id, topic, created_at, votes FROM articles;"
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectArticlesById = (articleID) => {
  return db
    .query(
      `SELECT articles.*, (SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id) AS comment_count FROM articles
    WHERE article_id = $1;`,
      [articleID]
    )
    .then(({ rows }) => {
      console.log(rows[0]);
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No article found by this ID`,
        });
      }
      return rows[0];
    });
};
