const pool = require('../queries');

exports.createArticle = (req, res) => {
  const { title, article } = req.body;
  const query = {
    text: 'INSERT INTO article (title, article, emp_id) VALUES ($1, $2, $3) RETURNING *',
    values: [title, article, req.user.userId],
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
  pool
    .query('SELECT * FROM article WHERE id =$1', [id])
    .then((articleTable) => {
      //  Check if the authenticated user is the owner of the article
      if (req.user.userId !== articleTable.rows[0].emp_id) {
        return res.status(401).json({ message: 'Cannot edit another user article' });
      }
      const { title, article } = req.body;
      const query = {
        text: 'UPDATE article SET title = $1, article = $2 WHERE id = $3 RETURNING *',
        values: [title, article, id],
      };
      return pool
        .query(query)
        .then(() => {
          res.status(201).json({
            message: 'Article successfully updated',
            title,
            article,
          });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(401).json({ error });
    });
};

exports.deleteArticle = (req, res) => {
  const { id } = req.params;
  pool
    .query('SELECT * FROM article WHERE id =$1', [id])
    .then((articleTable) => {
      if (req.user.userId !== articleTable.rows[0].emp_id) {
        return res.status(401).json({ message: 'Cannot delete another user article' });
      }
      const query = {
        text: 'DELETE FROM article WHERE id =$1',
        values: [id],
      };
      return pool
        .query(query)
        .then(() => {
          res.status(201).json({ message: 'Article successfully deleted' });
        })
        .catch((error) => {
          res.status(401).json({ error });
        });
    })
    .catch((error) => {
      res.status(401).json({ error });
    });
};
