const { selectArticlesById, selectArticles } = require("../models/articles");

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
