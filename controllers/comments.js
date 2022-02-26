const { selectCommentsByArticleId } = require("../models/comments");

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id: articleId } = req.params;
  selectCommentsByArticleId(articleId)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
