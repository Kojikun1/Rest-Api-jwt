require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');
const { errors } = require('celebrate');

const app = express();

const routes = require('./routes');

mongoose.connect(process.env.MONGODB_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/files',express.static(path.resolve(__dirname,"..","tmp","uploads")));

app.use(routes);

app.use(errors());

app.listen(3333, ()=> {
    console.log("listen on PORT 3333");
})

