const pool = require('../queries');

exports.getFeed = (req, res) => {
  const query = {
    text: `
        SELECT * FROM (
            SELECT article_id as id, title, article.article as post, user_id, created_on
            FROM article
            UNION
            SELECT gif_id as id, title, url as post, user_id, created_on
            FROM gif
        ) AS feed ORDER BY created_on DESC`,
  };
  pool
    .query(query)
    .then((feedTable) => {
      res.status(201).json(
        feedTable.rows.map((feed) => ({
          id: feed.id,
          createdOn: feed.created_on,
          title: feed.title,
          article: feed.post,
          authorId: feed.user_id,
        })),
      );
    })
    .catch((error) => res.status(401).json({ error }));
};
