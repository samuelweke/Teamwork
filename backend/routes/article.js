const express = require('express');

const router = express.Router();

const articleCtrl = require('../controllers/article');
const auth = require('../middleware/auth');

router.post('/', auth, articleCtrl.createArticle);
router.patch('/:id', auth, articleCtrl.editArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);

module.exports = router;
