import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from '../context/Authprovider';
import { Link } from 'react-router-dom';



const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [authUser,setAuthUser]=useAuth()
  const password= watch("password","");
  const ConfirmPassword = watch("confirmPassword","");
  const validatePassword=(value)=>{
    return value===password || "password do not match"
  }

  const onSubmit=async (data)=>{
    const userInfo={
      fullname:data.fullname,
      email:data.email,
      password:data.password,
      confirmPassword:data.confirmPassword,
    };
    console.log(data);
    console.log(userInfo);
    await axios.post("/api/user/signup",userInfo)
    .then((response)=>{  
      console.log(response.data);
      if(response.data){
        alert("signup successfull!");
      }
      localStorage.setItem("ChatApp",JSON.stringify(response.data));
      setAuthUser(response.data) 
    })
    .catch((error)=>{
      if(error.response){
        alert("Error:" + error.response.data.message);
      }
    })
  }
  return (
    <div className='flex h-screen items-center justify-center bg-gray-800 text-white '>
      <form onSubmit={handleSubmit(onSubmit)} className='border border-white p-6 rounded-xl min-w-[24%] space-y-3'> 
        <h1 className='text-2xl text-center text-white'>Text <span className='text-green-500 font-semibold'>App</span></h1>
        <h2 className='text-xl font-semibold '>Signup</h2>
        <label className="input input-bordered flex items-center gap-2 bg-gray-700">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
  <input type="text" className="grow" placeholder="fullname" {...register("fullname", { required: true })} />
  
</label>
{errors.fullname && <span>This field is required</span>}

<label className="input input-bordered flex items-center gap-2 bg-gray-700">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="text" className="grow" placeholder="Email" {...register("email", { required: true })}  />
  
</label>
{errors.email && <span >This field is required</span>}

<label className="input input-bordered flex items-center gap-2 bg-gray-700">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input type="password" className="grow" placeholder='password' {...register("password", { required: true })} />  
</label>
{errors.password && <span>This field is required</span>}

<label className="input input-bordered flex items-center gap-2 bg-gray-700">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70 ">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input type="password" className="grow" placeholder="confirmPassword" {...register("confirmPassword", { required: true ,validate:validatePassword})} />
</label>
{errors.ConfirmPassword && <span>{errors.ConfirmPassword.message}</span>}

<div className=' flex  justify-between'>
    <p>Have an account? <Link to={"/login"} className='text-blue-700 underline cursor-pointer font-semibold'> login!!!</Link></p>
    <input type='submit' value='signup' className='text-white font-semibold p-2 bg-green-700 rounded-md hover:bg-green-600 cursor-pointer' />
    
</div>
      </form>
    </div>
  )
}

export default Signup
