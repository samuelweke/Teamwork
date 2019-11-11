const cloudinary = require('cloudinary').v2;
const pool = require('../queries');

cloudinary.config({
  cloud_name: 'samuelweke',
  api_key: '118733324129639',
  api_secret: '6ALBNt-9bsE8ZR2jjtiwxaSiuh0',
});

exports.uploadGif = (req, res) => {
  console.log(req.file);
  cloudinary.uploader.upload(req.file.path)
    .then((gif) => {
      const query = {
        text: 'INSERT INTO gif (cloudinary_id, url, title, emp_id) VALUES ($1, $2, $3, $4) RETURNING *',
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
    .then((error) => res.status(401).json({ error }));
};

exports.deleteGif = (req, res) => {
  pool
    .query('SELECT * FROM gif WHERE id = $1', [req.params.id])
    .then((gifTable) => {
      cloudinary.uploader.destroy(gifTable.rows[0].cloudinary_id)
        .then(() => {
          pool
            .query('DELETE FROM gif WHERE id = $1', [req.params.id])
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

exports.postComment = (req, res) => {
  const query = {
    text: 'INSERT INTO gif_comment (comment, emp_id, gif_id) VALUES($1, $2, $3) RETURNING *',
    values: [req.body.comment, req.user.userId, req.params.id],
  };
  pool
    .query(query)
    .then((gifCommentTable) => {
      const gifId = gifCommentTable.rows[0].gif_id;
      return pool
        .query('SELECT * FROM gif WHERE id = $1', [gifId])
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
