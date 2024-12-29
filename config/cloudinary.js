const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

 // Thiết lập thông tin tài khoản Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET,
});
    // Thiết lập storage cho multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'social-media/uploads', // Thư mục lưu trữ trên Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'webm'], // Định dạng cho phép
        resource_type: 'auto', // Để tự động nhận diện loại file
    },
});
module.exports = { cloudinary, storage };