import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const server = express();
server.use(express.json());
const port = process.env.PORT || 5000;
server.use('/api/auth',userRoutes);
server.listen(port,()=>{
    console.log(`server runs on port ${port}`);
});
