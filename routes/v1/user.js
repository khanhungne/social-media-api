const express = require('express');
const { register, login, logout, refreshToken } = require('../../controllers/auth');
const { getAllUsers, getOneUser, updateUser, deleteUser } = require('../../controllers/user');
const validateRegister = require('../../middlewares/validation/validateRegister');
const validateLogin = require('../../middlewares/validation/validateLogin');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
module.exports = router;
