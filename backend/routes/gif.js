const express = require('express');

const router = express.Router();

//  Middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//  Controller
const gifCtrl = require('../controllers/gif');


router.post('/', auth, multer, gifCtrl.uploadGif);
router.delete('/:id', auth, multer, gifCtrl.deleteGif);
router.post('/:id/comment', auth, gifCtrl.postComment);
router.get('/:id', auth, gifCtrl.getOneGif);

module.exports = router;
