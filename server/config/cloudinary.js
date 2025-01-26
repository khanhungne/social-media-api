const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET,
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let transformation = [];
        if (file.mimetype.startsWith('image')) {
            transformation = [{ width: 800, height: 600, crop: 'limit', quality: 'auto' }];
        } else if (file.mimetype.startsWith('video')) {
            transformation = [{ width: 800, height: 450, crop: 'limit', quality: 'auto' }];
        }
        return {
            folder: 'social-media/uploads',
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'webm'],
            resource_type: 'auto',
            transformation: transformation,
        };
    },
});
module.exports = { cloudinary, storage };