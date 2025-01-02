const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models//user');

const { sendSuccess, sendBadRequest, sendNotFound, sendServerError } = require('../middlewares/response');

const createComment = async (req, res) => {
    try {
        const {userId, postId, content, parentCommentId} = req.body;

        const user = await User.findById(userId);
        const post = await Post.findById(postId);

        if (!user) {
            return sendBadRequest(res, "Người dùng không tồn tại");
        }
        if(!post) {
            return sendBadRequest(res, "Bài viết không tồn tại");
        }
        let nestedLevel = 1; 
        // Nếu có parentCommentId, tìm bình luận cha để xác định nestedLevel
        if(parentCommentId) {
            const parentComment = await Comment.findById(parentCommentId);
            if(parentComment){
                nestedLevel = parentComment.nestedLevel + 1;  // Cộng thêm 1 vào nestedLevel của bình luận cha
            } else {
                return sendBadRequest(res, "Bình luận cha không tồn tại");
            }
        }

        const newComment = new Comment({ postId, userId, content, parentCommentId, nestedLevel});
        await newComment.save();
        await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });
        sendSuccess(res, "Thêm bình luận thành công", newComment);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi khi thêm bình luận", err);
    }
}
const getRootComments = async (req, res) => {
    try {
        const { commentId } = req.params;

        const replies = await Comment.find({ parentCommentId: commentId })
            .populate('userId', 'username name')
            .sort({ createdAt: -1 });

        sendSuccess(res, "Danh sách bình luận cha", replies);
    } catch (error) {
        console.error(error);
        sendServerError(res, "Lỗi khi lấy bình luận cha", error);
    }
};

const getChildComments = async (req, res) => {
    try {
        const { parentCommentId } = req.params; 
        const childComments = await Comment.find({ parentCommentId }) 
            .populate('userId', 'username name') 
            .sort({ createdAt: -1 }); 
        // Thêm trường repliesCount cho mỗi bình luận con
        const childCommentsWithRepliesCount = await Promise.all(
            childComments.map(async comment => {
                const repliesCount = await Comment.countDocuments({ parentCommentId: comment._id });
                return {
                    ...comment._doc,
                    repliesCount
                };
            })
        );

        sendSuccess(res, "Danh sách bình luận con", childCommentsWithRepliesCount);
    } catch (error) {
        console.error(error);
        sendServerError(res, "Lỗi khi lấy danh sách bình luận con", error);
    }
};
const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId, content } = req.body;
        const comment = await Comment.findById(commentId)

        if (!comment) {
            return sendNotFound
            (res, "Bình luận không tồn tại");
        }
        if(comment.userId.toString() !== userId.toString()) {
            return sendBadRequest(res, "Bạn không có quyền chỉnh sửa bình luận này");
        }

        comment.content = content;
        comment.updatedAt = new Date(); // Cập nhật thời gian sửa
        await comment.save();

        sendSuccess(res, "Chỉnh sửa bình luận thành công", comment);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi khi cập nhật bình luận", err);
    }
};

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params; 
        const { userId } = req.body; 
        const deletedComment = await Comment.findById(commentId);
        if (!deletedComment) {
            return sendNotFound(res, "Bình luận không tồn tại");
        }
        const post = await Post.findById(deletedComment.postId);
        if (!post) {
            return sendNotFound(res, "Bài viết không tồn tại");
        }
        const isPostCreator = post.userId.toString() === userId; // Người tạo bài viết
        const isCommentCreator = deletedComment.userId.toString() === userId; // Người tạo bình luận
        if (!isPostCreator && !isCommentCreator) {
            return sendBadRequest(res, "Bạn không có quyền xóa bình luận này");
        }
        // Xóa các bình luận con
        await Comment.deleteMany({ parentCommentId: commentId });
        // Tiến hành xóa bình luận
        await Comment.findByIdAndDelete(commentId);
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
    getChildComments,
    getRootComments
}