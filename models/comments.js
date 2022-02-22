const db = require("../db/connection");

exports.checkArticleExists = (articleID) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id =$1;`, [articleID])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No article found`,
        });
      }
      return rows[0];
    });
};
