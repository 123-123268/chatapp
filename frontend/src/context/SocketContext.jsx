import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./Authprovider";
import io from "socket.io-client";

const socketContext = createContext();

// Hook to access socket
export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [authUser] = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Dynamically determine the backend URL
    const BACKEND_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:3001"
        : "https://chatapp-backenf.onrender.com";

    if (authUser) {
      const newSocket = io(BACKEND_URL, {
        query: {
          userId: authUser.user._id,
        },
        withCredentials: true,
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => newSocket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
