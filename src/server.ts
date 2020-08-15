require('dotenv').config();
import express from 'express';
import mongoose  from "mongoose";
import cors  from 'cors';
import path from 'path';
import { errors } from 'celebrate';

const app = express();

import routes from './routes';

mongoose.connect(process.env.MONGODB_URL as string,
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

app.listen(process.env.PORT || 3333, ()=> {
    console.log("listen on PORT 3333");
})

