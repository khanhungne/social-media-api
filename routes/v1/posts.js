const express = require('express');
const {getAllPost, getOnePost, updatePost, deletePost, createPost} = require("../../controllers/post");
const router = express.Router();
const multer = require('multer');
const { storage } = require('../../config/cloudinary');
const upload = multer({ storage });

router.post('/', upload.array('media', 10), createPost);
router.get('/', getAllPost);
router.get('/:id', getOnePost);
router.put('/:id', upload.array('media', 10), updatePost);
router.delete('/:id', deletePost);
module.exports = router;
