import express from 'express'
import { allUsers, logout, signin } from '../controller/user.controller.js';
import { login } from '../controller/user.controller.js';
import secureroute from '../middleware/secureroute.js';
const userRouter=express.Router();

userRouter.post("/signup",signin);
userRouter.post("/login",login);
userRouter.post("/logout",logout); 
userRouter.get("/allUsers/:id", allUsers);
export default userRouter;