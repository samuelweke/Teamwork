const pool = require('../queries');
const multer = require('../middleware/multer-config')
const uniqueFilename = new Date().toISOString()
const cloudinary = require('../middleware/cloudinary-config');

exports.uploadGif = (req, res) => {
   res.json(req.file)

    const path = req.file.path;

    cloudinary.uploader.multer(
        path,
        { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
        function(err, image) {
          if (err) return res.send(err)
          console.log('file uploaded to Cloudinary')
          // remove file from server
          const fs = require('fs')
          fs.unlinkSync(path)
          // return image details
          res.json(image)
        }
    )
    
}