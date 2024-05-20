import React from "react";
import { auth } from "./Firebase";

import { useAuthState } from "react-firebase-hooks/auth";
const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  return (
    <div
      className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="received-message">{message.text}</p>
        <p className="received-message">{message.translatedtext}</p>
      

      </div>
      
    </div>

  );
};
export default Message;

