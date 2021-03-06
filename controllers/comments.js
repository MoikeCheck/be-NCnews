const {
  selectCommentsByArticleId,
  addComments,
  removeCommentsById,
} = require("../models/comments");

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

exports.postComments = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  addComments(body, username, article_id)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCommentsById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentsById(comment_id).then((result) => {
    res.status(204).send();
  });
};
