const Comment = require('../models/comment');
const Post = require('../models/post');
const { sendSuccess, sendBadRequest, sendNotFound, sendServerError } = require('../middlewares/response');

const createComment = async (req, res) => {
    try {
        const {userId, postId, content} = req.body;
        const post = await Post.findById(postId);
        if(!post) {
            return sendBadRequest(res, "Bài viết không tồn tại");
        }
        const newComment = new Comment({ postId, userId, content });
        await newComment.save();
        await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });
        sendSuccess(res, "Thêm bình luận thành công", newComment);
    } catch (error) {
        console.error(err);
        sendServerError(res, "Lỗi khi thêm bình luận", err);
    }
}

const getComments = async (req, res) => {
    try {
        const comment = await Comment.find({postId: req.params.postId}).populate('userId', 'username name').sort({ createdAt: -1 });
        sendSuccess(res, "Danh sách bình luận", comments);
    } catch (error) {
        console.error(err);
        sendServerError(res, "Lỗi khi lấy bình luận", err);
    }
}

const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedComment = await Comment.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedComment) {
            return sendBadRequest(res, "Bình luận không tồn tại");
        }
        sendSuccess(res, "Cập nhật bình luận thành công", updatedComment);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi khi cập nhật bình luận", err);
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return sendBadRequest(res, "Bình luận không tồn tại");
        }
        // Cập nhật số lượng bình luận trong bài viết
        await Post.findByIdAndUpdate(deletedComment.postId, { $inc: { commentsCount: -1 } });
        sendSuccess(res, "Xóa bình luận thành công");
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi khi xóa bình luận", err);
    }
};
module.exports = {
    createComment,
    deleteComment,
    updateComment,
    getComments
}