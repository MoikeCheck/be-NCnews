.
const db = require("../db/connection");

exports.selectArticles = async (sort_by = "date", order = "desc", topic) => {
  let queryStr = `SELECT articles.*, 
  COUNT(comments.article_id)
  AS comment_count FROM articles
  LEFT JOIN comments ON articles.article_id = comments.article_id`;

  const theTopic = []

  if (topic) {
    const checkTopicExists = await db.query(
      `SELECT * FROM topics 
    WHERE slug = $1; `,
      [topic]
    );
    if (checkTopicExists.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Topic not found" });
    }
    theTopic.push(topic)
    queryStr += ` WHERE topic = $1`;
  }

  queryStr += ` GROUP BY articles.article_id
  ORDER BY ${sort_by} ${order};`;

  const { rows } = await db.query(queryStr, theTopic);
  return rows;
};

exports.selectArticleById = (articleID) => {
  return db
    .query(
      `SELECT articles.*, (SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id) AS comment_count FROM articles
    WHERE article_id = $1;`,
      [articleID]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No article found by this ID`,
        });
      }
      return rows[0];
    });
};

exports.updateArticleById = (article_id, inc_votes) => {
  let queryStr = `UPDATE articles
SET votes = votes + $1
WHERE article_id = $2
RETURNING* ;`;
  return db.query(queryStr, [inc_votes, article_id]).then(({ rows }) => {
    return rows[0];
  });
};
