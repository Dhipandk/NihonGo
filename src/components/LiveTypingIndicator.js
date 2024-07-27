import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from "./Firebase"; // Assuming db and auth are your Firestore and Auth instances
import { useAuthState } from "react-firebase-hooks/auth";

const LiveTypingIndicator = ({ currentRoom }) => {
  const [typingUsers, setTypingUsers] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!currentRoom) return;

    const q = query(
      collection(db, "users"),
      where("roomId", "==", currentRoom.id),
      where("typing", "==", true)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const typingUsersData = snapshot.docs.map((doc) => doc.data());
      setTypingUsers(typingUsersData);
    });

    return () => unsubscribe();
  }, [currentRoom]);

  if (typingUsers.length === 0) return null;

  return (
    <div className="typing-indicator-container">
      {typingUsers.map((typingUser) => (
        <div
          key={typingUser.uid}
          className={`chat-bubble ${typingUser.uid === user?.uid ? "right" : ""}`}
        >
          <img
            className="chat-bubble__left"
            src={typingUser.photoURL}
            alt={`${typingUser.displayName}'s avatar`}
          />
          <div className="chat-bubble__right">
            <span>{typingUser.displayName} is typing...</span>
            {typingUser.currentMessage && (
              <pre className="received-message">{typingUser.currentMessage}</pre>
            )}
            {typingUser.translatedMessage && (
              <pre className="received-message">{typingUser.translatedMessage}</pre>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveTypingIndicator;