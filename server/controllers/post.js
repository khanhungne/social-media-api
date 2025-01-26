// post.controller.js
const Post = require('../models/post');
const User = require('../models/user');
const cloudinary = require('cloudinary').v2;
const {  deleteMediaFromCloudinary} = require('../utils/upload');

const { sendSuccess, sendBadRequest, sendNotFound, sendServerError, sendForbidden } = require('../middlewares/response');

const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find();
        sendSuccess(res, "Lấy danh sách bài viết thành công", posts);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi server khi lấy danh sách bài viết", err);
    }
}
const getOnePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return sendNotFound(res, "Bài viết không tồn tại");
        }
        sendSuccess(res, "Lấy bài viết thành công", post);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi server khi lấy bài viết", err);
    }
}
const createPost = async (req, res) => {
    try {
        const { userId, content, visibility, tags } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return sendBadRequest(res, "Người dùng không tồn tại");
        }   
        if ((!content || content.trim() === "") && (!req.files || req.files.length === 0)) {
            console.log("Nội dung hoặc file bị thiếu: ", { content, files: req.files });
            return sendBadRequest(res, "Bài viết cần có nội dung hoặc tệp đính kèm");
        }
        const media = [];
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                let type;
                if (file.mimetype.startsWith('image')) {
                    type = 'image';
                } else if (file.mimetype.startsWith('video')) {
                    type = 'video';
                } else if (file.mimetype.startsWith('audio')) {
                    type = 'audio';
                } else {
                    throw new Error(`Không hỗ trợ loại file: ${file.mimetype}`);
                }
                media.push({
                    url: file.path, 
                    type,
                });
            });
        }
        const newPost = new Post({
            userId,
            content: content ? content.trim() : "", 
            media,
            visibility: visibility || "public",
            tags: Array.isArray(tags) ? tags : (tags ? tags.split(",") : []),
        });
        await newPost.save();
        sendSuccess(res, "Tạo bài viết thành công", newPost);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi server khi tạo bài viết", err);
    }
};
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, visibility, tags } = req.body;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Bài viết không tồn tại' });
        }
        if (post.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Bạn không có quyền cập nhật bài viết này' });
        }
        if (post.media && post.media.length > 0) {
            await deleteMediaFromCloudinary(post.media);
        }
        let media = [];
        if (req.files && req.files.length > 0) {
            media = req.files.map(file => ({
                url: file.path,
                type: file.mimetype.startsWith('image') ? 'image' : 'video',
            }));
        }
        post.content = content || post.content;
        post.visibility = visibility || post.visibility;
        post.tags = Array.isArray(tags) ? tags : (tags ? tags.split(",") : post.tags);
        if (media.length > 0) {
            post.media = media;
        }
        const updatedPost = await post.save();
        res.status(200).json({ message: 'Cập nhật bài viết thành công', data: updatedPost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server khi cập nhật bài viết', error: err });
    }
};

    


const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return sendBadRequest(res, 'Bài viết không tồn tại');
        }
        if (post.userId.toString() !== req.user.id) {
            return sendForbidden(res, 'Bạn không có quyền xóa bài viết này');
        }
        await deleteMediaFromCloudinary(post.media);
        await Post.findByIdAndDelete(id);
        sendSuccess(res, "Xóa bài viết thành công", null);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi server khi xóa bài viết", err);
    }
};


module.exports = {
    getAllPost,
    getOnePost,
    updatePost,
    deletePost,
    createPost
};
