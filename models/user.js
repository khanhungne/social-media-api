const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

// Tạo một User Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
        // match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Please fill a valid email address'], // Kiểm tra email hợp lệ
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        maxlength: 150,
        default: '',
    },
    profilePicture: {
        type: String,
        default: '',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    status: {
        type: String,
        enum: ['active', 'banned', 'pending', 'deleted'],
        default: 'active',
    },
    lastLogin: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

// Mã hóa mật khẩu trước khi lưu vào DB
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next(); // Chỉ mã hóa nếu mật khẩu đã thay đổi
//   this.password = await bcrypt.hash(this.password, 10); // Mã hóa mật khẩu với bcrypt
//   next();
// });

// Phương thức xác minh mật khẩu
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password); // So sánh mật khẩu đã mã hóa
// };

// Tạo model từ schema
const User = mongoose.model('User', userSchema);
module.exports = User;
