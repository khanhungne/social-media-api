const express = require('express');
const {getAllPost, getOnePost, updatePost, deletePost, createPost} = require("../../controllers/post");
const multer = require('multer');
const { storage } = require('../../config/cloudinary');
const upload = multer({ storage });
const { isAuthenticated, isAdmin } = require('../../middlewares/auth/checkAuth'); // Middleware xác thực

const router = express.Router();

router.post('/',isAuthenticated, upload.array('media', 10), createPost);
router.get('/',isAuthenticated, getAllPost);
router.get('/:id',isAuthenticated, getOnePost);
router.put('/:id', isAuthenticated, upload.array('media', 10), updatePost);
router.delete('/:id',isAuthenticated, deletePost);
module.exports = router;
