import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import messageRouter from "./routes/message.route.js";
import { app, server } from "./SocketIo/server.js";
// Allow multiple origins
const allowedOrigins = [
  "https://chatapp-frontend-ay66.onrender.com",
  "http://localhost:3001",
];

dotenv.config();

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT || 3000;

// Database Connection
const connectDB = async () => {
  try {
    console.log("Mongo URI exists:", !!process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// Routes
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

// Start Server
const startServer = async () => {
  await connectDB();

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();