const express = require('express');

const router = express.Router();

const feedCtrl = require('../controllers/feed');
const auth = require('../middleware/auth');

router.get('/', auth, feedCtrl.getFeed);


module.exports = router;
