const cloudinary = require('cloudinary').v2;
const pool = require('../queries');

cloudinary.config({
  cloud_name: 'samuelweke',
  api_key: '118733324129639',
  api_secret: '6ALBNt-9bsE8ZR2jjtiwxaSiuh0',
});

exports.uploadGif = (req, res) => {
  cloudinary.uploader.upload(req.file.path)
    .then((gif) => {
      const query = {
        text: 'INSERT INTO gif (url, title, emp_id) VALUES ($1, $2, $3) RETURNING *',
        values: [gif.url, req.body.title, req.user.userId],
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
