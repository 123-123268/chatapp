import React, { useEffect, useState } from 'react';
import useConversation from '../Zustand/useConversation';
import axios from "axios";

function useGetMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const loggedinUser = JSON.parse(localStorage.getItem("ChatApp"));
  const loggedinId = loggedinUser?.user._id;

  // Dynamically determine backend URL
  const BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3001"
      : "https://chatapp-backenf.onrender.com";

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      if (selectedConversation && selectedConversation._id) {
        try {
          const response = await axios.get(
            `${BASE_URL}/api/message/get/${loggedinId}/${selectedConversation._id}`,
            { withCredentials: true }
          );
          setMessages(response.data);
        } catch (error) {
          console.log("Error in getting messages: ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getMessages();
  }, [selectedConversation, setMessages]);

  return { loading, messages };
}

export default useGetMessage;
