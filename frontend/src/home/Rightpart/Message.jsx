import React from "react";

const Message = ({ message }) => {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;
  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor=itsMe?"bg-blue-500":"bg-yellow-500";
  return (
    <div className="p-4">
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble chat-bubble-info ${chatColor} text-white`}>{message.message}</div>
      </div>
    </div>
  );
};

export default Message;
