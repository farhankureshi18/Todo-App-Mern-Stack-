const express = require('express');
require('dotenv').config();
require('./dbconfig'); // DB connection
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

app.set('view engine', 'ejs');
app.use(express.json());

const todoRouter = require('./Router/todoRouter');
app.use('/Todo', todoRouter);

app.listen(process.env.port, () => {
    console.log(`Server running on port ${process.env.port}`);
});


