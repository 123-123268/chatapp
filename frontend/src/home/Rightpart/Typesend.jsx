import React from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../../context/useSendMessage.js';
import { useState } from 'react';
const Typesend = () => {
  const [message,setMessage]=useState("");
  const { loading,sendMessages }=useSendMessage();
  const handleSubmit=async(e)=>{
     e.preventDefault();
    await sendMessages(message)
     setMessage("")
   
  }
  return (
   <form onSubmit={handleSubmit}>
     <div className='flex space-x-1 h-[8vh]  bg-gray-800'>
    <div className='w-[70%] mx-4 my-1'>
      <input type="text" placeholder="Type here" value={message} onChange={(e)=>setMessage(e.target.value)} className="border rounded-xl border-gray-700 outline-none mt-1  px-4 py-3 bg-black w-full" />
    </div>
    <button><IoSend className='text-3xl' /></button>
    </div>
   </form>
  )
}

export default Typesend
