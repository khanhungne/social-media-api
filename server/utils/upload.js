const cloudinary = require('cloudinary').v2;

const uploadWithTransformation = async (file) => {
    return cloudinary.uploader.upload(file.path, {
        resource_type: "auto", 
        folder: "posts_media",
        transformation: [
            file.mimetype.startsWith('image') ? {
                width: 800,
                height: 600,
                crop: "limit",
                quality: "auto"
            } : 
            file.mimetype.startsWith('video') ? {
                width: 800,
                height: 450,
                crop: "limit",
                quality: "auto"
            } : 
            // Không áp dụng chuyển đổi cho âm thanh
            {}
        ]
    });
};
module.exports = {uploadWithTransformation}