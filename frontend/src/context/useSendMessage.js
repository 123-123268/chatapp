import React from "react";
import { useState } from "react";
import useConversation from "../Zustand/useConversation.js";
import axios from 'axios';
const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const loggedinUser = JSON.parse(localStorage.getItem("ChatApp"));
    const loggedinId = loggedinUser?.user._id; 

  
    const sendMessages = async ( message ) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `http://localhost:3001/api/message/send/${selectedConversation._id}`,{
           
                _id:loggedinId,
                message:message,
            
          }
        );
        console.log("after", selectedConversation._id);
        console.log(response.data);
        setMessages([...messages,response.data.newMessage]);
        setLoading(false);
      } catch (error) {
        console.log("Error in sending messages: ", error);
        setLoading(false);
      }
    };

  return {loading,sendMessages};
};

export default useSendMessage;
