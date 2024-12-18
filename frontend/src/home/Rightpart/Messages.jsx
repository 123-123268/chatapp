import React, { useEffect } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import { useRef } from "react";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";
const Messages = () => {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage();//listining incoming messages
  const lastMessage = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMessage.current) {
        lastMessage.current.scrollIntoView({ behavior: "smooth", });
      }
    }, 100);
  }, [messages]);
  return (
    <div className=" overflow-y-auto" style={{ minHeight: "calc(92vh - 8vh)" }}>
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
         <div key={message._id} ref={lastMessage}>
            <Message key={message._id} message={message} />
          </div>
          
        ))
      )}
      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">No messages yet</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
