const pool = require('../queries');

//  Create an Article
exports.createArticle = (req, res) => {
  const { title, article } = req.body;
  const query = {
    text: 'INSERT INTO article (title, article, user_id) VALUES ($1, $2, $3) RETURNING *',
    values: [title, article, req.user.userId],
  };
  pool
    .query(query)
    .then((response) => {
      res.status(201).json({
        status: 'success',
        data: {
          message: 'Article successfully posted',
          articleId: response.rows[0].article_id,
          createdOn: response.rows[0].created_on,
          title,
        },
      });
    })
    .catch((error) => res.status(400).json({ error }));
};


//  Edit an article
exports.editArticle = (req, res) => {
  const { id } = req.params;
  pool
    .query('SELECT * FROM article WHERE article_id =$1', [id])
    .then((articleTable) => {
      //  Check if the authenticated user is not the owner of the article
      if (req.user.userId !== articleTable.rows[0].user_id) {
        return res.status(401).json({ message: 'Cannot edit another user article' });
      }

      const { title, article } = req.body;
      const query = {
        text: 'UPDATE article SET title = $1, article = $2 WHERE article_id = $3 RETURNING *',
        values: [title, article, id],
      };
      return pool
        .query(query)
        .then(() => {
          res.status(201).json({
            status: 'success',
            data: {
              message: 'Article successfully updated',
              title,
              article,
            },
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(401).json({ error }));
};

//  Delete an article
exports.deleteArticle = (req, res) => {
  const { id } = req.params;
  pool
    .query('SELECT * FROM article WHERE article_id =$1', [id])
    .then((articleTable) => {
      if (req.user.userId !== articleTable.rows[0].user_id) {
        return res.status(401).json({ message: 'Cannot delete another user article' });
      }
      return pool
        .query('DELETE FROM article WHERE article_id =$1', [id])
        .then(() => {
          res.status(201).json({
            status: 'success',
            data: {
              message: 'Article successfully deleted',
            },
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(401).json({ error }));
};


//  Create Comment
exports.createComment = (req, res) => {
  const query = {
    text: 'INSERT INTO article_comment (comment, user_id, article_id) VALUES ($1, $2, $3) RETURNING *',
    values: [req.body.comment, req.user.userId, req.params.id],
  };
  pool
    .query(query)
    .then((commentTable) => {
      const articleId = commentTable.rows[0].article_id;
      return pool.query('SELECT * FROM article WHERE article_id = $1', [articleId])
        .then((articleTable) => {
          const { article, title } = articleTable.rows[0];
          res.status(201).json({
            status: 'success',
            data: {
              message: 'Comment Successfully Created',
              createdOn: commentTable.rows[0].created_on,
              articleTitle: title,
              article,
              comment: req.body.comment,
            },
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

// Get a single article by ID
exports.getOneArticle = (req, res) => {
  const { id } = req.params;
  const query = {
    text: `SELECT article.article_id, article.created_on, article.title, article.article,
           article_comment.comment_id, article_comment.comment, article_comment.user_id
            FROM article 
              INNER JOIN article_comment
              ON article.article_id = article_comment.article_id
                WHERE article.article_id = $1`,
    values: [id],
  };
  pool
    .query(query)
    .then((article) => {
      res.status(201).json({
        status: 'success',
        data: {
          id: article.rows[0].article_id,
          createdOn: article.rows[0].created_on,
          title: article.rows[0].title,
          article: article.rows[0].article,
          comments: article.rows.map((comment) => ({
            commentId: comment.comment_id,
            comment: comment.comment,
            authorId: comment.user_id,
          })),
        },
      });
    })
    .catch((error) => res.status(401).json({ error }));
};
