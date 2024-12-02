const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;