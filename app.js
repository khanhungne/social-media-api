const express = require('express');
const mongoose = require("mongoose");
const connectDB = require('./config/db');
const bodyParser = require("body-parser");
const helmet = require("helmet");
const authRoutes = require('./routes/v1/user');

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

app.use('/users', authRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;