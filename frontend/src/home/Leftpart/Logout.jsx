import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import axios from 'axios'
import Cookies from 'js-cookie'
const Logout = () => {
  const [loading,setloading]=useState(false);
  const handlelogout=async()=>{
    setloading(true);
   try {
   const response= await axios.post("/api/user/logout");
   localStorage.removeItem("ChatApp");
   Cookies.remove("jwt");
   setloading(false);
   alert("logout successfully");
   window.location.reload();
   } catch (error) {
    
    console.log("error in logout",error);
   }
  }
  return (
   <div className='h-[10vh]'>
    <div>
    <BiLogOutCircle onClick={handlelogout} className='text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-1' />
    </div>
  
   </div>
  )
}

export default Logout