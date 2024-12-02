const express = require('express');
const connectDB = require('./config/db');


const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
connectDB();

app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;