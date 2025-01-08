const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['image', 'video', 'audio'],
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    content: { type: String, require: false },
    media: [mediaSchema],
    likesCount: {
        type: Number,
        default: 0,
    },
    commentsCount: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
        default: [],
        require: false,
    },
    visibility: {
        type: String,
        enum: ['public', 'private', 'friends'],
        default: 'public',
    },
},
    { timestamps: true }
);
const Post = mongoose.model('Post', postSchema);
module.exports = Post;