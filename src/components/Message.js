

// import React from "react";
// import { auth } from "./Firebase";
// import { useAuthState } from "react-firebase-hooks/auth";

// const Message = ({ message }) => {
//   const [user] = useAuthState(auth);

//   return (
//     <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
//       <img className="chat-bubble__left" src={message.avatar} alt="user avatar" />
//       <div className="chat-bubble__right">
//         <p className="user-name">{message.name}</p>
//         {message.text && <p className="received-message">{message.text}</p>}
//         {message.translatedtext && <p className="received-message">{message.translatedtext}</p>}
  
//       </div>
//     </div>
//   );
// };

// export default Message;

// import React from "react";
// import { auth } from "./Firebase";
// import { useAuthState } from "react-firebase-hooks/auth";

// const Message = ({ message }) => {
//   const [user] = useAuthState(auth);

//   return (
//     <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
//       <img className="chat-bubble__left" src={message.avatar} alt="user avatar" />
//       <div className="chat-bubble__right">
//         <p className="user-name">{message.name}</p>
        
//         {message.text && <p className="received-message">{message.text}</p>}
        
//         {message.translatedtext && (
//           <p className="received-message">
//             <em>{message.translatedtext}</em>
//           </p>
//         )}
        
//         {message.audioURL && (
//           <div>
//             <audio controls src={message.audioURL}></audio>
//             {message.transcript && (
//               <p className="received-message">Transcript: {message.transcript}</p>
//             )}
//             {message.translated_audio_url && (
//               <div>
//                 <audio controls src={message.translated_audio_url}></audio>
//                 {message.translated_transcript && (
//                   <p className="received-message">
//                     Translated Transcript: {message.translated_transcript}
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Message;

import React, { useState } from "react";
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const messageRef = doc(db, "messages", message.id);
      await updateDoc(messageRef, {
        text: editedText,
        translatedtext: editedTranslatedText,
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

  return (
    <div className={`chat-bubble ${isCurrentUserMessage ? "right" : ""}`}>
      <img className="chat-bubble__left" src={message.avatar} alt="user avatar" />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        {isEditing && isCurrentUserMessage ? (
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
            {message.text && <p className="received-message">{message.text}</p>}
            {message.translatedtext && <p className="received-message">{message.translatedtext}</p>}
            {isCurrentUserMessage && (
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


