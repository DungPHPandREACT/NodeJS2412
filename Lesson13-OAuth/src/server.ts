import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import authRoutes from './routes/auth.route'
import mongoose from 'mongoose';
import { databaseConfig } from './configs/databaseConfig';
import { appConfig } from './configs/appConfig';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use(authRoutes);

mongoose.connect(databaseConfig.mongoURI)

const PORT = appConfig.port

app.listen(PORT,  () => {
    console.log(`Server đang hoạt động trên localhost:${PORT}`)
})