const User = require('../models/user.js');
const Relationship = require('../models/relationship.js');
const mongoose = require("mongoose");
const { sendSuccess, sendBadRequest, sendServerError, sendNotFound } = require('../middlewares/response');

const follow = async (req, res) => {
    try {
        const { userId1, userId2 } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId1) || !mongoose.Types.ObjectId.isValid(userId2)) {
            return sendBadRequest(res, "ID người dùng không hợp lệ.");
        }
        if (userId1 === userId2) return sendBadRequest(res, "Bạn không thể theo dõi chính mình.");

        const user1 = await User.findById(userId1);
        const user2 = await User.findById(userId2);
        if (!user1 || !user2) return sendNotFound(res, "Người dùng không tồn tại.");

        const existingRelationship = await Relationship.findOne({ userId1, userId2, type: 'follow' });
        if (existingRelationship) return sendBadRequest(res, "Bạn đã theo dõi người này rồi.");

        const relationship = new Relationship({ userId1, userId2, type: 'follow' });
        await relationship.save();

        sendSuccess(res, "Theo dõi thành công", relationship);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi theo dõi người dùng", err);
    }
};

const unfollow = async (req, res) => {
    try {
        const { userId1, userId2 } = req.body;

        const deFollow = await Relationship.findOneAndDelete({
            userId1,
            userId2,
            type: 'follow',
        });

        if (!deFollow) return sendNotFound(res, "Không tìm thấy quan hệ để hủy theo dõi.");

        sendSuccess(res, "Hủy theo dõi thành công", deFollow);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi hủy theo dõi người dùng", err);
    }
};

const sendFriendRequest = async (req, res) => {
    try {
        const { userId1, userId2 } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId1) || !mongoose.Types.ObjectId.isValid(userId2)) {
            return sendBadRequest(res, "ID người dùng không hợp lệ.");
        }
        if (userId1 === userId2) return sendBadRequest(res, "Bạn không thể gửi yêu cầu kết bạn cho chính mình.");

        const existingRequest = await Relationship.findOne({ userId1, userId2, type: 'friend', status: 'pending' });
        if (existingRequest) return sendBadRequest(res, "Bạn đã gửi yêu cầu kết bạn cho người này.");

        const relationship = new Relationship({ userId1, userId2, type: 'friend', status: 'pending' });
        await relationship.save();

        sendSuccess(res, "Yêu cầu kết bạn đã được gửi.", relationship);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi gửi yêu cầu kết bạn", err);
    }
};

const acceptFriendRequest = async (req, res) => {
    try {
        const { userId1, userId2 } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId1) || !mongoose.Types.ObjectId.isValid(userId2)) {
            return sendBadRequest(res, "ID người dùng không hợp lệ.");
        }

        const relationship = await Relationship.findOneAndUpdate(
            { userId1, userId2, type: 'friend', status: 'pending' },
            { status: 'accepted' },
            { new: true }
        );

        if (!relationship) return sendNotFound(res, "Không tìm thấy yêu cầu kết bạn.");

        sendSuccess(res, "Yêu cầu kết bạn được chấp nhận.", relationship);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi xử lý yêu cầu kết bạn.", err);
    }
};
const rejectFriendRequest = async (req, res) => {
    try {
        const { userId1, userId2 } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId1) || !mongoose.Types.ObjectId.isValid(userId2)) {
            return sendBadRequest(res, "ID người dùng không hợp lệ.");
        }
        const relationship = await Relationship.findOneAndUpdate(
            {
                userId1,
                userId2,
                type: 'friend_request',
                status: 'pending'
            },
            { status: 'rejected' },
            { new: true }
        );
        if (!relationship) {
            return sendNotFound(res, "Không tìm thấy yêu cầu kết bạn để từ chối.");
        }

        sendSuccess(res, "Yêu cầu kết bạn đã bị từ chối.", relationship);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi từ chối yêu cầu kết bạn.", err);
    }
};
const unfriend = async (req, res) => {
    try {
        const { userId1, userId2 } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId1) || !mongoose.Types.ObjectId.isValid(userId2)) {
            return sendBadRequest(res, "ID người dùng không hợp lệ.");
        }
        const relationship = await Relationship.findOneAndDelete({
            $or: [
                { userId1, userId2, type: 'friend', status: 'accepted' },
                { userId1: userId2, userId2: userId1, type: 'friend', status: 'accepted' }
            ]
        });

        if (!relationship) {
            return sendNotFound(res, "Không tìm thấy quan hệ bạn bè để hủy.");
        }

        sendSuccess(res, "Hủy kết bạn thành công.", relationship);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi hủy kết bạn.", err);
    }
};

const getFriendsList = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return sendBadRequest(res, "ID người dùng không hợp lệ.");
        }
        const friends = await Relationship.find({
            $or: [
                { userId1: userId, type: 'friend', status: 'accepted' },
                { userId2: userId, type: 'friend', status: 'accepted' }
            ]
        }).populate('userId1 userId2', 'name email');

        sendSuccess(res, "Lấy danh sách bạn bè thành công.", friends);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi lấy danh sách bạn bè.", err);
    }
};
const getFollowersAndFollowing = async (req, res) => {
    try {
        const { userId } = req.params;

        const followers = await Relationship.find({ userId2: userId, type: 'follow' }).populate('userId1', 'name email');
        const following = await Relationship.find({ userId1: userId, type: 'follow' }).populate('userId2', 'name email');

        sendSuccess(res, "Lấy danh sách người theo dõi và đang theo dõi thành công.", { followers, following });
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi lấy danh sách người theo dõi và đang theo dõi.", err);
    }
};
const getRelationshipStatus = async (req, res) => {
    try {
        const { userId1, userId2 } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId1) || !mongoose.Types.ObjectId.isValid(userId2)) {
            return sendBadRequest(res, "ID người dùng không hợp lệ.");
        }
        const relationship = await Relationship.findOne({
            $or: [
                { userId1, userId2 },
                { userId1: userId2, userId2: userId1 }
            ]
        });

        if (!relationship) {
            return sendSuccess(res, "Không có mối quan hệ giữa hai người dùng.", { status: "none" });
        }

        sendSuccess(res, "Lấy trạng thái quan hệ thành công.", relationship);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi lấy trạng thái quan hệ.", err);
    }
};
const resendFriendRequest = async (req, res) => {
    try {
        const { userId1, userId2 } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId1) || !mongoose.Types.ObjectId.isValid(userId2)) {
            return sendBadRequest(res, "ID người dùng không hợp lệ.");
        }
        const existingRelationship = await Relationship.findOneAndUpdate(
            {
                userId1,
                userId2,
                type: 'friend_request',
                status: 'rejected'
            },
            { status: 'pending', updatedAt: Date.now() },
            { new: true }
        );

        if (!existingRelationship) {
            return sendBadRequest(res, "Không thể gửi lại yêu cầu. Không có yêu cầu nào bị từ chối trước đó.");
        }

        existingRelationship.status = 'pending';
        await existingRelationship.save();

        sendSuccess(res, "Yêu cầu kết bạn đã được gửi lại.", existingRelationship);
    } catch (err) {
        console.error(err);
        sendServerError(res, "Lỗi gửi lại yêu cầu kết bạn.", err);
    }
};

module.exports = {
    follow,
    unfollow,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    unfriend,
    getFriendsList,
    getFollowersAndFollowing,
    getRelationshipStatus,
    resendFriendRequest
};
