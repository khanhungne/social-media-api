require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const connectDB = require('./config/db');
const bodyParser = require("body-parser");
const helmet = require("helmet");
const authRoutes = require('./routes/v1/auth');
const userRoutes = require('./routes/v1/user');
const postRoutes = require('./routes/v1/posts');
const commentRoutes = require('./routes/v1/comment');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;