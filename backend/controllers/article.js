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
      const { id, created_on } = response.rows[0];
      res.status(201).json({
        message: 'Article successfully posted',
        articleId: id,
        createdOn: created_on,
        title,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

exports.editArticle = (req, res) => {
  const { id } = req.params;
  const { title, article } = req.body;
  const query = {
    text: 'UPDATE article SET title = $1, article = $2 WHERE id = $3',
    values: [title, article, id],
  };
  pool
    .query(query)
    .then(() => {
      res.status(201).json({
        message: 'Article successfully updated',
        title,
        article,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

exports.deleteArticle = (req, res) => {
  const { id } = req.params;
  const query = {
    text: 'DELETE FROM article WHERE id =$1',
    values: [id],
  };
  pool
    .query(query)
    .then(() => {
      res.status(201).json({
        message: 'Article successfully deleted',
      });
    })
    .catch((error) => {
      res.status(401).json({
        error,
      });
    });
};
