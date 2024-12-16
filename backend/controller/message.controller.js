import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessage = async (req, res) => {
  //   console.log("messagesend");
  try {
    const message = req.body.message;
    const senderId = req.body._id;
    const receiverId= req.params.id;

    // const conversationId=req.body.conversationId;
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save();
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]); //run parallel
    res.status(201).json({ message: "message sent successfully", newMessage });
  } catch (error) {
    console.log("error in send message", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getMessage = async (req, res) => {
  try {
    const senderId = req.params.senderId; 
    const chatUser  = req.params.chatUserId;
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");
    if (!conversation) {
      return res.status(201).json([]);
    }
    const messages = conversation.messages;
    res.status(201).json(messages);
  } catch (error) {
    console.log("error in getting message", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
