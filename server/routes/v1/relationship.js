const express = require('express');
const {follow,
    unfollow,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    unfriend,
    getFriendsList,
    getFollowersAndFollowing,
    getRelationshipStatus,
    resendFriendRequest,} = require('../../controllers/relationship');
const router = express.Router();

router.post('/follow', follow);
router.post('/unfollow', unfollow);

router.post('/friend-request/send', sendFriendRequest);
router.post('/friend-request/accept', acceptFriendRequest);
router.post('/friend-request/reject', rejectFriendRequest);

router.post('/unfriend', unfriend);

router.get('/friends/:userId', getFriendsList);
router.get('/followers-following/:userId', getFollowersAndFollowing);

router.post('/status', getRelationshipStatus);
router.post('/friend-request/resend', resendFriendRequest);

module.exports = router;
