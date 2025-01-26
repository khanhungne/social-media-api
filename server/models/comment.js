const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        media: [
            {
                url: { type: String, required: false },
                type: { type: String, enum: ['image', 'video'],
                required: false },
            },
        ],
        parentCommentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            default: null,
        },
        nestedLevel: {
            type: Number,
            default: 1,
        },
        likesCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
