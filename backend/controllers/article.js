const pool = require('../queries');

exports.createArticle = (req, res) => {
  const { title, article } = req.body;
  const query = {
    text: 'INSERT INTO article (title, article) VALUES ($1, $2) RETURNING *',
    values: [title, article],
  };
  pool
    .query(query)
    .then((response) => {
      const { id, createdon } = response.rows[0];
      res.status(201).json({
        message: 'Article successfully posted',
        articleId: id,
        createdOn: createdon,
        title,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};
