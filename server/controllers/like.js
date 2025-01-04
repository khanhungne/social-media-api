const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

const { sendSuccess, sendBadRequest, sendServerError } = require('../middlewares/response');

const likePost = async (req, res) => {
    try {
        const { userId, postId } = req.body;

        const user = await User.findById(userId);
        if (!user) return sendBadRequest(res, "Người dùng không tồn tại");

        const post = await Post.findById(postId);
        if (!post) return sendBadRequest(res, "Bài viết không tồn tại");

        const existingLike = await Like.findOne({ userId, postId });

        if (existingLike) {
            // Unlike Post
            await Like.deleteOne({ _id: existingLike._id });
            await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });
            return sendSuccess(res, "Đã bỏ thích bài viết");
        }

        // Like Post
        const newLike = new Like({ userId, postId });
        await newLike.save();
        await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });
        sendSuccess(res, "Đã thích bài viết", newLike);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi khi thích bài viết", err);
    }
};

// Like/Unlike Comment
const likeComment = async (req, res) => {
    try {
        const { userId, commentId } = req.body;

        const user = await User.findById(userId);
        if (!user) return sendBadRequest(res, "Người dùng không tồn tại");

        const comment = await Comment.findById(commentId);
        if (!comment) return sendBadRequest(res, "Bình luận không tồn tại");

        const existingLike = await Like.findOne({ userId, commentId });

        if (existingLike) {
            // Unlike Comment
            await Like.deleteOne({ _id: existingLike._id });
            await Comment.findByIdAndUpdate(commentId, { $inc: { likesCount: -1 } });
            return sendSuccess(res, "Đã bỏ thích bình luận");
        }
        // Like Comment
        const newLike = new Like({ userId, commentId });
        await newLike.save();
        await Comment.findByIdAndUpdate(commentId, { $inc: { likesCount: 1 } });
        sendSuccess(res, "Đã thích bình luận", newLike);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi khi thích bình luận", err);
    }
};
const getLikesForPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const likes = await Like.find({ postId }).populate('userId', 'username profilePicture');
        sendSuccess(res, "Danh sách người đã thích bài viết", likes);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi khi lấy danh sách người thích bài viết", err);
    }
};
const getLikesForComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const likes = await Like.find({ commentId }).populate('userId', 'username profilePicture');
        sendSuccess(res, "Danh sách người đã thích bình luận", likes);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi khi lấy danh sách người thích bình luận", err);
    }
};
module.exports = {
    likePost,
    likeComment,
    getLikesForComment,
    getLikesForPost
};
