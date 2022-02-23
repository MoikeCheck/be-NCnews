const db = require("../db/connection");

exports.selectCommentsByArticleId = (articleID) => {
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1;`,
      [articleID]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.checkCommentsExistByArticleId = (articleID) => {
  return db
    .query(
      `SELECT articles.*, (SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id) AS comment_count FROM articles
      WHERE article_id = $1;`,
      [articleID]
    )
    .then(({ rows }) => {
      if (rows[0].comment_count === 0) {
        return Promise.reject({
          status: 404,
          msg: `No comments found`,
        });
      }
      // return rows[0];
    });
};
