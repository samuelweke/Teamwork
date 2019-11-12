const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  if (file.mimetype != 'image/gif') {
    return callback(new Error ('Only GIF files are allowed !!!'));
  }
  return callback(null, true);
};

module.exports = multer({ fileFilter, storage }).single('image');
