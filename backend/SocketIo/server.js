import { Server } from "socket.io";
import http from 'http';
import express from 'express'

const app = express();

const server=http.createServer(app);
// Allow multiple origins
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://chatapp-frontend-ay66.onrender.com",
        "http://localhost:3001"
      ];

      // If origin is undefined (like in Postman or curl), allow it
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  }
});
//realtimemess
export const getRecieverSocketId=(recieverId)=>{
    return users[recieverId];
}



const users={}
//use to listen events on server side
io.on("connection",(socket)=>{
    console.log("new connection",socket.id);
    const userId=socket.handshake.query.userId;
    if(userId){
        users[userId]=socket.id; 
        console.log("hello",users);
    }
//used to send events to all connected clients
    io.emit("getOnlineUsers",Object.keys(users));

    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
        delete users[userId];
        io.emit("getOnlineUsers",Object.keys(users));
    })
})
export {app,io,server};
