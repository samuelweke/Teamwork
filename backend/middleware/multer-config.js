const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        console.log(file)
        callback(null, file.originalname)
    },
});

module.exports = multer({storage: storage}).single('image'); 