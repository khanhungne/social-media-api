const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            default: null, // Tuỳ chọn: Like trên bài viết
        },
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            default: null, // Tuỳ chọn: Like trên comment
        },  
    },
    { timestamps: true }
);

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
