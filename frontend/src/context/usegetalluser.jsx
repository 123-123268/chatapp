import React, { useEffect,useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

const usegetalluser = () => {
 const [allusers, setallUsers] = useState([])
 const [loading, setloading] = useState(false)
 useEffect(()=>{
        const getusers=async()=>{
            setloading(true);
            try {
                const token=Cookies.get("jwt");
             const response=   await axios.get("/api/user/allusers",{
                    credentials:"include",
                    headers:{
                        "Authorization":`Bearer ${token}`
                        }
                })
                setallUsers(response.data);
                setloading(false);
            } catch (error) {
                console.log(error)
            }
        }
        getusers();
    },[])
 return [allusers,loading]
}

export default usegetalluser
