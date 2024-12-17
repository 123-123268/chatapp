import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../Zustand/useConversation.js";

import { useAuth } from "../../context/Authprovider.jsx";
const Right = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
   < div className="w-[70%] text-gray-300 bg-slate-900">
    <div>
      {!selectedConversation ? (
        <Nochatselected />
      ) : (
        <>
            <Chatuser />
            <div
              className=" overflow-y-auto"
              style={{ maxHeight: "calc(92vh - 8vh)" }}
            >
              <Messages />
            </div>

            <Typesend />
          
        </>
      )}
    </div>
   </div>
  );
};

export default Right;

const Nochatselected = () => {
  const [authUser] = useAuth();
  return (
    <>
      <div className="flex h-screen items-center text-center justify-center">
        <h1 className="text-center">
          Welcome {""}
          <span className="font-semibold text-xl">{authUser.user.fullname}</span>
          <br />
          No chat selected,please start conversation by selecting anyone.
        </h1>
      </div>
    </>
  );
};
