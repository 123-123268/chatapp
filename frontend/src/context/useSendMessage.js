import React from "react";


const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const loggedinUser = JSON.parse(localStorage.getItem("ChatApp"));
    const loggedinId = loggedinUser?.user._id; 

  
    const sendMessages = async ({ message }) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `http://localhost:3001/api/message/send/${selectedConversation._id}`,{
            body:{
                "_id":loggedinId,
                "message":message,
            }
          }
        );
        console.log("after", selectedConversation._id);
        setMessages(...messages,response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in sending messages: ", error);
        setLoading(false);
      }
    };

  return {loading,sendMessages};
};

export default useSendMessage;
