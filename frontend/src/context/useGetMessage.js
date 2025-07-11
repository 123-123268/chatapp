import React, { useEffect , useState} from 'react'
import useConversation from '../Zustand/useConversation';
import axios from "axios";


function useGetMessage() {
    const [loading,setLoading]=useState(false);
    const {messages,setMessages,selectedConversation}=useConversation();
    const loggedinUser = JSON.parse(localStorage.getItem("ChatApp"));
    const loggedinId = loggedinUser?.user._id; 
    useEffect(()=>{
        const getMessages=async()=>{
            setLoading(true);
            if(selectedConversation && selectedConversation._id){
                try{
                    const response=await axios.get(`https://chatapp-backenf.onrender.com/api/message/get/${loggedinId}/${selectedConversation._id}`);
                    setMessages(response.data);
                    setLoading(false);
                }
                catch(error){
                    console.log("Error in getting messages: ",error);
                    setLoading(false);
                }
            }
        }
        getMessages();
    },[selectedConversation,setMessages]);
  return {loading, messages}
}

export default useGetMessage
