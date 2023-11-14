import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import {Book} from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//middleware for parsing request body
app.use(express.json());
//allow all origins with default o cors
app.use(cors());
//allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowHeaders: ['Content-Type'],
//     })
// );

app.get('/',(request,response) => {
    console.log(request);
    return response.status(234).send('Welcome');
});

app.use('/books',booksRoute);

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('App is connected to database');
    app.listen(PORT, () =>{
        console.log(`App is listening to port: ${PORT}`);
    });
    
})
.catch((error)=> {
    console.log(error);
})