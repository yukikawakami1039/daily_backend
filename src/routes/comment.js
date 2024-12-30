const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

console.log('CommentController:', commentController);// デバッグ用

// コメントの作成または更新
router.post('/commentCreate', commentController.commentCreate);

module.exports = router;