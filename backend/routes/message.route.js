import express from 'express'
import { sendMessage } from '../controller/message.controller.js';
import secureroute from '../middleware/secureroute.js';
import { getMessage } from '../controller/message.controller.js';
const messageRouter=express.Router();

messageRouter.post("/send/:id",sendMessage);
messageRouter.get("/get/:id",getMessage);
export default messageRouter;