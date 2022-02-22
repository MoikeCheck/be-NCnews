const { checkArticleExists } = require("../models/comments");

exports.getCommentsByArticleId = (res, req, next) => {
  const { article_id: articleId } = req.params;
  Promise.all([selectArticleById(articleId), checkArticleExists(articleId)])
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
