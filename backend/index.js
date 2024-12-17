import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import messageRouter from "./routes/message.route.js";
import secureroute from "./middleware/secureroute.js";
import { app, server } from "./SocketIo/server.js";

app.use(cors({
  origin: 'http://localhost:3001', // Frontend URL
  credentials: true, // Allow cookies to be sent
}));
app.use(cookieParser());
app.use(express.json());
dotenv.config();

const port = process.env.PORT;

try{
    mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to the database!");
}
catch(error){
    console.log(error);
}
app.use('/api/user',userRouter);
app.use("/api/message",messageRouter);
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
