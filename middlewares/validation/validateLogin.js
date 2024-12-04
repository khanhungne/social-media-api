const { body, validationResult } = require('express-validator');

const validateLogin = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email bắt buộc')
        .isEmail().withMessage('Địa chỉ email không hợp lệ'),
    body('password')
        .trim()
        .notEmpty().withMessage('Password phải dài ít nhất 6 ký tự')
        .isLength({ min: 6 }).withMessage("Password phải dài ít nhất 6 ký tự"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
module.exports = validateLogin;
