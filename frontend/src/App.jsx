import React from "react";
import Left from "./home/Leftpart/Left";
import Right from "./home/Rightpart/Right";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Route,Routes} from "react-router-dom";
import { useAuth } from "./context/Authprovider";
import { Navigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
const App = () => {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
    <Routes>
      <Route
        path="/"
        element={
          authUser ? (
            <div className="flex h-screen">
              <Left />
              <Right />
            </div>
          ) : (
          <Navigate to ={"/login"} />
          )
        }
      />
      <Route path="/login" element={authUser?<Navigate to="/"/>: <Login />} />
      <Route path="/signup" element={authUser?<Navigate to="/"/>: <Signup />} />
    </Routes>
    <Toaster/>
    </>
  );
};

export default App;
