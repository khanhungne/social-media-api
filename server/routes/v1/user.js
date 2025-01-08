const express = require('express');
const { getAllUsers, getOneUser, updateUser, deleteUser } = require('../../controllers/user');
const { isAuthenticated, isAdmin } = require('../../middlewares/auth/checkAuth'); // Import các middleware bảo vệ route
const router = express.Router();

router.get('/', isAuthenticated, getAllUsers);
router.get('/:id',isAuthenticated, getOneUser);
router.put('/:id',isAuthenticated, updateUser);
router.delete('/:id',isAuthenticated, isAdmin, deleteUser);
module.exports = router;
