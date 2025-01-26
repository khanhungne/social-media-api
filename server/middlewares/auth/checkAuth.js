const { verifyToken } = require('../../utils/jwt');
const User = require('../../models/user');
const { sendUnauthorized, sendForbidden, sendServerError } = require('../response');

// ng dùng đã đăng nhập hay chưa
const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return sendUnauthorized(res, "Không tìm thấy token, vui lòng đăng nhập");
    }
    try {
        const decoded = verifyToken(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return sendForbidden(res, "Token không hợp lệ hoặc đã hết hạn", err);
    }
}
const isAdmin = async (req, res, next) => {
    try{
        if (!req.user) {
            return sendUnauthorized(res, "Vui lòng đăng nhập");
        }
        const { userId } = req.user;
        const user = await User.findById(userId);

        if (!user) {
            return sendUnauthorized(res, "Người dùng không tồn tại hoặc chưa được xác thực");
        }
        if (user.role !== 'admin') {
            return sendForbidden(res, "Bạn không có quyền truy cập");
        }
        next();
    }catch(err) {
        console.error(err);
        return sendServerError(res, "Lỗi kiểm tra quyền admin", err);
    }

};
module.exports = { isAuthenticated, isAdmin };
