const { verifyToken } = require('../utils/generateToken');
const User = require('../../models/user');

// ng dùng đã đăng nhập hay chưa
const isAuthenticated = (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Không tìm thấy token, vui lòng đăng nhập" });
    }
    try {
        // giải mã token
        const decoded = verifyToken(token, process.env.JWT_ACCESS_SECRET);
        // lưu thông tin user vào req.user
        req.user = decoded;
        next();
    } catch (error) {
        console.error(err);
        res.status(403).json({ message: "Token không hợp lệ" });
    }
}
const isAdmin = async (req, res, next) => {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (user && user.role === 'admin') {
        return next();
    }

    res.status(403).json({ message: "Bạn không có quyền truy cập" });
};
module.exports = { isAuthenticated, isAdmin };
