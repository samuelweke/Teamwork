const express = require('express');

const router = express.Router();

const articleCtrl = require('../controllers/article');

router.post('/', articleCtrl.createArticle);
router.patch('/:id', articleCtrl.editArticle);

module.exports = router;
