require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const connectDB = require('./config/db');
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require('cors');
const authRoutes = require('./routes/v1/auth');
const userRoutes = require('./routes/v1/user');
const postRoutes = require('./routes/v1/posts');
const commentRoutes = require('./routes/v1/comment');
const likeRoutes = require('./routes/v1//like');
const messageRoutes = require('./routes/v1/message');
const chatRoutes = require('./routes/v1/chat');
const relationshipRoutes = require('./routes/v1/relationship');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use('/likes', likeRoutes);
app.use('/relationship', relationshipRoutes);
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;