const express = require('express');
const { register, login, logout, refreshToken } = require('../../controllers/auth');
const validateRegister = require('../../middlewares/validation/validateRegister');
const validateLogin = require('../../middlewares/validation/validateLogin');
const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

module.exports = router;
