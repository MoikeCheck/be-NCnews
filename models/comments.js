const db = require("../db/connection");

exports.selectCommentsByArticleId = (articleId) => {
  console.log("MODEL");
  return db
    .query(
      `SELECT comments.* FROM comments LEFT JOIN articles ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY comments.comment_id;`,
      [articleId]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No comments found`,
        });
      }
      return rows;
    });
};
