\c nc_news

-- SELECT articles.*, (SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id) AS comment_count FROM articles

UPDATE articles
SET votes = votes + 10
WHERE article_id = 2
RETURNING* ;