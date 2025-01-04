const express = require('express');
const { likePost, likeComment, getLikesForPost, getLikesForComment } = require('../../controllers/like');
const router = express.Router();

router.post('/post', likePost);
router.post('/comment', likeComment); 

router.get('/post/:postId', getLikesForPost); 
router.get('/comment/:commentId', getLikesForComment); 

module.exports = router;
