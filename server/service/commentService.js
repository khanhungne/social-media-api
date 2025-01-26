const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require('../models/user');
const cloudinary = require('cloudinary').v2;
const { sendSuccess, sendBadRequest, sendNotFound, sendServerError } = require('../middlewares/response');

const createComment = async ({ userId, postId, content, parentCommentId, media }) => {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    if (!user) {
        return sendBadRequest(res, "Người dùng không tồn tại");
    }
    if(!post) {
        return sendBadRequest(res, "Bài viết không tồn tại");
    }
    let nestedLevel = 1; 
        if(parentCommentId) {
            const parentComment = await Comment.findById(parentCommentId);
            if(parentComment){
                nestedLevel = parentComment.nestedLevel + 1; 
            } else {
                return sendBadRequest(res, "Bình luận cha không tồn tại");
            }
        }
        const newComment = new Comment({
            postId,
            userId,
            content,
            parentCommentId,
            nestedLevel,
            media,
        });
        await newComment.save();
        await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });
        return newComment;
}
const deleteComment = async ({ commentId, userId }) => {
    // Kiểm tra người dùng
    const user = await User.findById(userId);
    if (!user) throw new Error("Người dùng không tồn tại");

    // Kiểm tra bình luận
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Bình luận không tồn tại");

    // Kiểm tra bài viết
    const post = await Post.findById(comment.postId);
    if (!post) throw new Error("Bài viết không tồn tại");

    // Xác định quyền xóa (người tạo bài viết hoặc bình luận)
    const isPostCreator = post.userId.toString() === userId.toString();
    const isCommentCreator = comment.userId.toString() === userId.toString();
    if (!isPostCreator && !isCommentCreator) throw new Error("Không có quyền xóa bình luận");

    // Xóa các file media nếu có
    if (comment.media && comment.media.length > 0) {
        for (const mediaItem of comment.media) {
            const publicId = mediaItem.url.split('/').slice(-1)[0].split('.')[0];
            await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
        }
    }

    // Xóa bình luận và các bình luận con
    await Comment.deleteMany({ parentCommentId: commentId });
    await Comment.findByIdAndDelete(commentId);
    await Post.findByIdAndUpdate(comment.postId, { $inc: { commentsCount: -1 } });

    return comment;
};
module.exports = { createComment, deleteComment };

