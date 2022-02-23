const {
  selectCommentsByArticleId,
  checkCommentsExistByArticleId,
} = require("../models/comments");

exports.getCommentsByArticleId = (res, req, next) => {
  // const { article_id } = req.params;
  // Promise.all([
  //   selectCommentsByArticleId(article_id),
  //   checkCommentsExistByArticleId(article_id),
  // ])
  const { article_id } = req.params;
  selectCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
