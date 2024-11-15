import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import mongoose from "mongoose"
import dotenv from 'dotenv';


const app=express();
// app.use(cors({
//     origin:process.env.CORS_ORIGIN,
//     credentials:true
// }))
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.route.js"
import carRouter from "./routes/car.route.js"

app.use("/api/v1", userRouter)
app.use("/api", carRouter);
app.get('/test-db', async (req, res) => {
    try {
        const dbState = mongoose.connection.readyState;
        const states = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting'
        };
        
        if (dbState === 1) {
            // Try to execute a simple MongoDB operation
            const collections = await mongoose.connection.db.listCollections().toArray();
            
            res.json({
                status: 'success',
                message: `Database is ${states[dbState]}`,
                state: dbState,
                collections: collections.map(col => col.name)
            });
        } else {
            res.json({
                status: 'warning',
                message: `Database is ${states[dbState]}`,
                state: dbState
            });
        }
    } catch (error) {
        console.error('Database test error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error checking database connection',
            error: error.message
        });
    }
  });
  
export default app;