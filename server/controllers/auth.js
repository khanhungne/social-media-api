const User = require('../models/user');
const { generateToken, verifyToken } = require('../utils/jwt');
const { sendSuccess, sendServerError } = require('../middlewares/response');
const register = async (req, res) => {
    const { username, name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Email hoặc Username đã tồn tại" });
        }
        const user = new User({
            username, name, email, password,
        });
        await user.save();

        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        // res.status(201).json({
        //     stautus: true,
        //     message: "Đăng ký thành công",
        //     user,
        //     accessToken,
        //     refreshToken
        // });
        sendSuccess(res, "Đăng ký thành công", {
            user,
            accessToken,
            refreshToken
        });
    } catch (err) {
        console.error(err);
        // res.status(500).json({
        //     stautus: false,
        //     message: "Lỗi server",
        //     err  
        // });
        console.error(err);
        sendServerError(res, "Lỗi server", err);
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không đúng" });
        }

        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        // res.status(200).json({
        //     status: true,
        //     message: "Đăng nhập thành công",
        //     user,
        //     accessToken,
        //     refreshToken
        // });
        sendSuccess(res, "Đăng nhập thành công", {
            user,
            accessToken,
            refreshToken
        });

    } catch (err) {
        console.error(err);
        // res.status(500).json({ stautus: false, message: "Lỗi server" }, err);
        console.error(err);
        sendServerError(res, "Lỗi server", err);
    }
}
const logout = async (req, res) => {
    try {
        sendSuccess(res, 'Đăng xuất thành công');
        // res.status(200).json({
        //     success: true,
        //     message: 'Đăng xuất thành công'
        // });
    } catch (err) {
        console.error(err);
        // res.status(500).json({ stautus: false, message: "Lỗi server" }, err);
        sendServerError(res, "Lỗi server", err);
    }

}
const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        // return res.status(401).json({ message: 'Refresh token là bắt buộc' });
        return sendUnauthorized(res, 'Refresh token là bắt buộc');
    }

    try {
        const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = generateToken(
            { id: decoded.id, role: decoded.role },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '15m' }
        );

        // res.status(200).json({ accessToken: newAccessToken });
        sendSuccess(res, "Token mới đã được cấp", { accessToken: newAccessToken });

    } catch (err) {
        console.error(err);
        // res.status(403).json({ message: 'Refresh token không hợp lệ' });
        sendUnauthorized(res, 'Refresh token không hợp lệ', err);

    }
};
const createAccessToken = (user) => {
    return generateToken(
        { id: user._id, role: user.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '30m' }
    );
};
const createRefreshToken = (user) => {
    return generateToken(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};

module.exports = { register, login, logout, refreshToken }