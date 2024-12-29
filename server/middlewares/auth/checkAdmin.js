const User = require('../../models/user');

const isAdmin = async (req, res, next) => {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (user && user.role === 'admin') {
        return next();
    }

    res.status(403).json({ message: "Bạn không có quyền truy cập" });
};
module.exports = { isAuthenticated, isAdmin };
