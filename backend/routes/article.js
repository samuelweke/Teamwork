const express = require('express');

const router = express.Router();

const articleCtrl = require('../controllers/article');
const auth = require('../middleware/auth');

router.post('/', auth, articleCtrl.createArticle);
router.get('/:id', auth, articleCtrl.getOneArticle);
router.patch('/:id', auth, articleCtrl.editArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);

router.post('/:id/comment', auth, articleCtrl.createComment);

module.exports = router;
