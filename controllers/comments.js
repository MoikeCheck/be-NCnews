const {
  selectCommentsByArticleId,
  addComments,
  deleteCommentsById,
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
  selectComments(comment_id)
    .then((res) => {
      res.status(204).send({ msg: `Comment with id ${comment_id} deleted.` });
    })
    .catch((err) => {
      next(err);
    });
};
