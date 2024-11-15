import dotenv from "dotenv"
import app from './app.js'
import cors from 'cors'


import connectDB from "./db/connectTomongoDb.js"

import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 15;

dotenv.config({
    path:'./.env'
})
app.use(cors())
app.get('/',(req, res)=>{
    res.send("Server is running")
})

connectDB()
.then(()=>{
  app.listen( process.env.PORT || 8000, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
  })
})

.catch((err) => {
  console.log("MongoDb connection failed", err)
})
