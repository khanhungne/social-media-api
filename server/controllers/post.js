// post.controller.js
const Post = require('../models/post');
const User = require('../models/user');
const cloudinary = require('cloudinary').v2;
const { uploadWithTransformation } = require('../utils/upload');

const { sendSuccess, sendBadRequest, sendNotFound, sendServerError } = require('../middlewares/response');

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
            sendNotFound(res, "Bài viết không tồn tại");
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
            return sendBadRequest(res, "Người dùng không tồn tại", post);
        }
        if (!content && (req.files || req.files.length === 0)) {
            return sendBadRequest(res, "Bài viết cần có nội dung hoặc tệp đính kèm", post);
        }
        const media = [];
        if (req.files && req.files.length > 0) {
            try {
                const uploadPromises = req.files.map(file =>uploadWithTransformation(file));
                const uploadResults = await Promise.all(uploadPromises);
                uploadResults.forEach(result => {
                    const resourceType = result.resource_type; 
                    let type;
                    if (result.resource_type === 'image') {
                        type = 'image';
                    } else if (result.resource_type === 'video') {
                        type = 'video';
                    } else if (result.resource_type === 'raw') {
                        type = 'audio';
                    } else {
                        throw new Error(`Không hỗ trợ loại file: ${result.resource_type}`);
                    }
                    media.push({
                        url: result.secure_url,
                        type,
                        resourceType
                    });
                });
            } catch (err) {
                console.error("Lỗi cụ thể khi upload lên Cloudinary:", err);
                return sendServerError(res, "Lỗi khi upload file lên Cloudinary", err);
            }
        }
        const newPost = new Post({
            userId,
            content: content || "",
            media,
            visibility,
            tags: Array.isArray(tags) ? tags : (tags ? tags.split(",") : []),
        });
        await newPost.save();
        sendSuccess(res, "Tạo bài viết thành công", newPost);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi server khi tạo bài viết", err);
    }
}
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, visibility, tags } = req.body;
        const media = [];
        if (req.files && req.files.length > 0) {
            try {
                const uploadPromises = req.files.map(file => uploadWithTransformation(file));
                const uploadResults = await Promise.all(uploadPromises);

                uploadResults.forEach(result => {
                    media.push({
                        type: result.resource_type,
                        url: result.secure_url,
                    });
                });
            } catch (err) {
                console.error("Lỗi khi upload lên Cloudinary:", err);
                return sendServerError(res, "Lỗi khi upload file lên Cloudinary", err);
            }
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                content: content || undefined,
                visibility: visibility || undefined,
                tags: Array.isArray(tags) ? tags : (tags ? tags.split(",") : []),
                ...(media.length > 0 && { media }) // Chỉ cập nhật media nếu có tệp mới
            },
            { new: true }
        );
        if (!updatedPost) {
            return sendBadRequest({ res, message: 'Bài viết không tồn tại' });
        }        
        sendSuccess(res, "Cập nhật bài viết thành công", updatedPost);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi server khi cập nhật bài viết", err);
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);
        if (!post) return sendBadRequest(res, "Bài viết không tìm thấy");
        if (post.media && post.media.length > 0) {
            for (const mediaItem of post.media) {
                const publicId = mediaItem.url.split('/').slice(-1)[0].split('.')[0]; // Lấy public_id từ URL
                await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
            }
        }
        sendSuccess(res, "Xóa bài viết thành công", null);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi server khi cập nhật bài viết", err);
    }
};
module.exports = {
    getAllPost,
    getOnePost,
    updatePost,
    deletePost,
    createPost
};
