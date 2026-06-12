import React, { useState } from "react";
import useConversation from "../Zustand/useConversation.js";
import axios from 'axios';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const loggedinUser = JSON.parse(localStorage.getItem("ChatApp"));
  const loggedinId = loggedinUser?.user._id;

  // Determine backend base URL
  const BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3001"
      : "https://chatapp-backenf.onrender.com";

  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/message/send/${selectedConversation._id}`,
        {
          _id: loggedinId,
          message: message,
        },
        {
          withCredentials: true, // Include cookies if required
        }
      );

      setMessages([...messages, response.data.newMessage]);
    } catch (error) {
      console.error(
        'Error in sending messages:',
        error.response ? error.response.data : error.message
      );
      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
