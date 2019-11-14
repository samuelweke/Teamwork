const cloudinary = require('cloudinary').v2;
const Datauri = require('datauri');
const path = require('path');

const pool = require('../queries');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload Gif
exports.uploadGif = (req, res) => {
  const DataUri = new Datauri();
  const datauri = (request) => DataUri.format(path.extname(request.file.originalname).toString(),
    request.file.buffer);
  const imagePath = datauri(req).content;

  cloudinary.uploader.upload(imagePath, { folder: 'Teamwork/' })
    .then((gif) => {
      const query = {
        text: 'INSERT INTO gif (cloudinary_id, url, title, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [gif.public_id, gif.url, req.body.title, req.user.userId],
      };
      return pool
        .query(query)
        .then((gifTable) => {
          res.status(201).json({
            message: 'GIF image successfully posted',
            createdOn: gifTable.rows[0].created_on,
            title: gifTable.rows[0].title,
            imageUrl: gifTable.rows[0].url,
          });
        })
        .catch((error) => res.status(401).json({ error }));
    })
    .then((error) => res.status(500).json({ error }));
};

// Delete a gif
exports.deleteGif = (req, res) => {
  pool
    .query('SELECT * FROM gif WHERE gif_id = $1', [req.params.id])
    .then((gifTable) => {
      if (req.user.userId !== gifTable.rows[0].user_id) {
        return res.status(401).json({ message: 'Cannot delete another user gif' });
      }
      return cloudinary.uploader.destroy(gifTable.rows[0].cloudinary_id)
        .then(() => {
          pool
            .query('DELETE FROM gif WHERE gif_id = $1', [req.params.id])
            .then(() => {
              res.status(201).json({
                message: 'gif post successfully deleted',
              });
            })
            .catch((error) => res.status(401).json({ error }));
        })
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => res.status(401).json({ error }));
};

// Post comment
exports.postComment = (req, res) => {
  const query = {
    text: 'INSERT INTO gif_comment (comment, user_id, gif_id) VALUES($1, $2, $3) RETURNING *',
    values: [req.body.comment, req.user.userId, req.params.id],
  };
  pool
    .query(query)
    .then((gifCommentTable) => {
      const gifId = gifCommentTable.rows[0].gif_id;
      return pool
        .query('SELECT * FROM gif WHERE gif_id = $1', [gifId])
        .then((gifTable) => {
          res.status(201).json({
            message: 'Comment Successfully Created',
            createdOn: gifCommentTable.rows[0].created_on,
            gifTitle: gifTable.rows[0].title,
            comment: req.body.comment,
          });
        })
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => res.status(401).json({ error }));
};

// Get a single gif
exports.getOneGif = (req, res) => {
  const query = {
    text: `SELECT gif.gif_id, gif.created_on, gif.title, gif.url, gif_comment.comment_id, gif_comment.comment, gif_comment.user_id
            FROM gif 
              INNER JOIN gif_comment
              ON gif.gif_id = gif_comment.gif_id
                WHERE gif.gif_id = $1;`,
    values: [req.params.id],
  };
  pool
    .query(query)
    .then((gif) => {
      res.status(201).json({
        id: gif.rows[0].gif_id,
        createdOn: gif.rows[0].created_on,
        title: gif.rows[0].title,
        url: gif.rows[0].url,
        comments: gif.rows.map((comment) => ({
          commentId: comment.comment_id,
          comment: comment.comment,
          authorId: comment.user_id,
        })),
      });
    })
    .catch((error) => res.status(401).json({ error }));
};
