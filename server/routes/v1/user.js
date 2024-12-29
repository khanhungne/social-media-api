const express = require('express');
const { getAllUsers, getOneUser, updateUser, deleteUser } = require('../../controllers/user');
const validateRegister = require('../../middlewares/validation/validateRegister');
const validateLogin = require('../../middlewares/validation/validateLogin');
const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
module.exports = router;
