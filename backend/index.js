import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
const app = express()
app.use(cookieParser());
app.use(cors());
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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
