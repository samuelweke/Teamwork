const express = require('express');

const router = express.Router();

const articleCtrl = require('../controllers/article');
const auth = require('../middleware/auth');

router.post('/',  articleCtrl.createArticle);
router.patch('/:id',  articleCtrl.editArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);
router.post('/:id/comment', auth, articleCtrl.createComment);
router.get('/:id',  articleCtrl.getOneArticle);


module.exports = router;
