import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const usegetalluser = () => {
  const [allusers, setAllUsers] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const getusers = async () => {
      setloading(true);
      try {
         const token = Cookies.get('jwt');
        
      console.log(token);
        if (!token) {
          console.log("JWT token is missing");
          setloading(false);
        }
        const response = await axios.get("/api/user/allusers", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response && response.data) {
            setAllUsers(response.data);
            
          } else {
            console.error("Response is undefined or does not contain data");
          }
          
      } catch (error) {
        console.log("error in this is"+error);
      } finally {
        setloading(false);
      }
    };
    getusers();
  }, []);
  return [allusers, loading];
};

export default usegetalluser;
