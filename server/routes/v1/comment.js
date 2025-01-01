const express = require('express');
const { createComment, getRootComments, updateComment, deleteComment, getChildComments } = require('../../controllers/comment');
const router = express.Router();

router.post('/', createComment);
router.get('/:postId', getRootComments);
router.get('/replies/:parentCommentId', getChildComments);
router.put('/:commentId', updateComment);
router.delete('/:commentId', deleteComment);

module.exports = router;