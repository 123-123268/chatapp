import React from 'react'
import useConversation from '../../Zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';
const Chatuser = () => {
  const{selectedConversation}=useConversation();
  const {onlineUsers}=useSocketContext();
  const getOnlineUsersStatus=(userId)=>{
    return onlineUsers.includes(userId)?"Online":"Offline";
  }
  return (
    <div className='flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300'>
      <div className="avatar online">
  <div className="w-16 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>
<div>
    <h1 className='text-xl'>{`${selectedConversation.fullname}`}</h1>
    <span className='text-sm'>{getOnlineUsersStatus(selectedConversation._id)}</span>
</div>
    </div>
  )
}

export default Chatuser
