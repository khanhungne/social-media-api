const User = require('../models/user');
const { sendSuccess, sendBadRequest, sendNotFound, sendServerError } = require('../middlewares/response');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        sendSuccess(res, "Lấy danh sách người dùng thành công", users);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi server khi lấy danh sách người dùng", err);
    }
};

const getOneUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return sendNotFound(res, "Không tìm thấy người dùng");
        }
        sendSuccess(res, "Lấy thông tin người dùng thành công", user);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi server khi lấy thông tin người dùng", err);
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!user) {
            return sendNotFound(res, "Không tìm thấy người dùng để cập nhật");
        }
        sendSuccess(res, "Cập nhật thông tin người dùng thành công", user);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi server khi cập nhật thông tin người dùng", err);
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return sendNotFound(res, "Không tìm thấy người dùng để xóa");
        }
        sendSuccess(res, "Xóa người dùng thành công", user);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi server khi xóa người dùng", err);
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
};
