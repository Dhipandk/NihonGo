// import React, { useState } from "react";
// import { auth, db } from "./Firebase"; // Assuming db is your Firestore instance
// import { useAuthState } from "react-firebase-hooks/auth";
// import { doc, updateDoc } from "firebase/firestore";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";

// const Message = ({ message }) => {
//   const [user] = useAuthState(auth);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedText, setEditedText] = useState(message.text || "");
//   const [editedTranslatedText, setEditedTranslatedText] = useState(
//     message.translatedtext || ""
//   );

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
//     try {
//       const messageRef = doc(db, "messages", message.id);
//       await updateDoc(messageRef, {
//         text: editedText,
//         translatedtext: editedTranslatedText,
//       });
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating message:", error);
//     }
//   };

//   const handleCancelClick = () => {
//     // Revert changes to original message content
//     setEditedText(message.text || "");
//     setEditedTranslatedText(message.translatedtext || "");
//     setIsEditing(false);
//   };

//   const isCurrentUserMessage = message.uid === user.uid;

//   return (
//     <div className={`chat-bubble ${isCurrentUserMessage ? "right" : ""}`}>
//       <img className="chat-bubble__left" src={message.avatar} alt="user avatar" />
//       <div className="chat-bubble__right">
//         <p className="user-name">{message.name}</p>
//         {isEditing && isCurrentUserMessage ? (
//           <>
//             <input
//               type="text"
//               className="edit-input"
//               value={editedText}
//               onChange={(e) => setEditedText(e.target.value)}
//             />
//             <input
//               type="text"
//               className="edit-input"
//               value={editedTranslatedText}
//               onChange={(e) => setEditedTranslatedText(e.target.value)}
//             />
//             <div className="edit-buttons">
//               <button className="edit-button" onClick={handleSaveClick}>Save</button>
//               <button className="edit-button" onClick={handleCancelClick}>Cancel</button>
//             </div>
//           </>
//         ) : (
//           <>
//             {message.text && <p className="received-message">{message.text}</p>}
//             {message.translatedtext && <p className="received-message">{message.translatedtext}</p>}
//             {isCurrentUserMessage && (
//               <button className="edit-button" onClick={handleEditClick}>
//                 <FontAwesomeIcon icon={faEdit} />
//               </button>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Message;

import React, { useState, useEffect } from "react";
import { auth, db } from "./Firebase"; // Assuming db is your Firestore instance
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(message.text || "");
  const [editedTranslatedText, setEditedTranslatedText] = useState(
    message.translatedtext || ""
  );
  const [canEdit, setCanEdit] = useState(false);
  const [editTimestamp, setEditTimestamp] = useState(null);

  useEffect(() => {
    // Calculate if message can still be edited
    if (message.createdAt) {
      const editTimeLimit = 5 * 60 * 1000; // 5 minutes in milliseconds
      const messageTime = message.createdAt.toMillis();
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - messageTime;
      setCanEdit(elapsedTime <= editTimeLimit);
    }

    // Set edit timestamp if message has been edited
    if (message.editedAt) {
      setEditTimestamp(message.editedAt.toDate()); // Assuming editedAt is a Firestore Timestamp
    } else {
      setEditTimestamp(null);
    }
  }, [message.createdAt, message.editedAt]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const messageRef = doc(db, "messages", message.id);
      const now = new Date();
      await updateDoc(messageRef, {
        text: editedText,
        translatedtext: editedTranslatedText,
        editedAt: now, // Update editedAt timestamp
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const handleCancelClick = () => {
    // Revert changes to original message content
    setEditedText(message.text || "");
    setEditedTranslatedText(message.translatedtext || "");
    setIsEditing(false);
  };

  const isCurrentUserMessage = message.uid === user.uid;

  // Function to format timestamp to HH:MM format
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const formatted = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return formatted;
  };

  // Determine which timestamp to show: editedAt if available, otherwise createdAt
  const displayTimestamp = editTimestamp ? formatTimestamp(editTimestamp) : formatTimestamp(message.createdAt);

  return (
    <div className={`chat-bubble ${isCurrentUserMessage ? "right" : ""}`}>
      <img className="chat-bubble__left" src={message.avatar} alt="user avatar" />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        {isEditing && isCurrentUserMessage && canEdit ? (
          <>
            <input
              type="text"
              className="edit-input"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <input
              type="text"
              className="edit-input"
              value={editedTranslatedText}
              onChange={(e) => setEditedTranslatedText(e.target.value)}
            />
            <div className="edit-buttons">
              <button className="edit-button" onClick={handleSaveClick}>Save</button>
              <button className="edit-button" onClick={handleCancelClick}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            {message.text && (
              <p className={`received-message ${editTimestamp ? "edited" : ""}`}>{message.text}</p>
            )}
            {message.translatedtext && (
              <p className={`received-message ${editTimestamp ? "edited" : ""}`}>{message.translatedtext}</p>
            )}
            {editTimestamp && (
              <p className="edited-indicator">Edited</p>
            )}
            <p className="message-timestamp">{displayTimestamp}</p>
            {isCurrentUserMessage && canEdit && (
              <button className="edit-button" onClick={handleEditClick}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )}
            
          </>
        )}
      </div>
    </div>
  );
};

export default Message;

