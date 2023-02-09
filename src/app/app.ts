import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

// Conexão ao Banco Mongoose
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_LINK}`).then(() => {
    console.log('⚡️[server]: Conectado ao MongoDb');
});

// App Express
const app = express();

// Json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'PUT', 'POST', 'DELETE']
}));

import indexRoute from '../routes/indexRoute';
import userRouter from '../routes/userRoute';
import movieRoute from '../routes/movieRoute';
import movieRatingRoute from '../routes/movieRatingRoute';

app.use('/', indexRoute);
app.use('/users', userRouter);
app.use('/movies', movieRoute);
app.use('/ratings', movieRatingRoute);

export default app;