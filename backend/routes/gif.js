const express = require('express');

const router = express.Router();

//  Middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//  Controller
const gifCtrl = require('../controllers/gif');


router.post('/', auth, multer, gifCtrl.uploadGif);

module.exports = router;
