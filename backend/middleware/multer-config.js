const multer = require('multer');


const MIME_TYPES = {
  'image/gif': 'gif',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name + Date.now()}.${extension}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype != 'image/gif') {
    return callback(null, false);
  }
  return callback(null, true);
};

module.exports = multer({ fileFilter, storage }).single('image');
