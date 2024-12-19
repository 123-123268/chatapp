import React from "react";
import useConversation from "../../Zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import { CiMenuFries } from "react-icons/ci";


const Chatuser = () => {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };
  return (
    <div className="relative flex items-center justify-center gap-4 h-[8%] bg-gray-800">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white" />
      </label>
      <div className="flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6hEUaF_RzuWqQjqmJ-Xma7HN9MVyiIMO8JA&s" className="w-10" />
          </div>
        </div>
        <div>
          <h1 className="text-xl">{`${selectedConversation.fullname}`}</h1>
          <span className="text-sm">
            {getOnlineUsersStatus(selectedConversation._id)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chatuser;
