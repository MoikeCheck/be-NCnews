const db = require("../db/connection");

exports.selectCommentsByArticleId = (articleId) => {
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

exports.addComments = (body, username, article_id) => {
  return db
    .query(
      `INSERT INTO comments (body, author, article_id) 
      VALUES ($1, $2, $3) RETURNING *;`,
      [body, username, article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "No Article Found" });
      }
      return rows[0];
    });
};

exports.removeCommentsById = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1;`, [comment_id])
    .then((res) => {
      return res;
    });
};
