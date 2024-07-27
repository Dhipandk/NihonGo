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

// import React, { useState, useEffect } from "react";
// import { auth, db } from "./Firebase"; // Assuming db is your Firestore instance
// import { useAuthState } from "react-firebase-hooks/auth";
// import { doc, updateDoc } from "firebase/firestore";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
// import debounce from 'lodash.debounce'; // Import lodash.debounce for debouncing

// const Message = ({ message }) => {
//   const [user] = useAuthState(auth);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedText, setEditedText] = useState(message.text || "");
//   const [editedTranslatedText, setEditedTranslatedText] = useState(
//     message.translatedtext || ""
//   );
//   const [canEdit, setCanEdit] = useState(false);
//   const [editTimestamp, setEditTimestamp] = useState(null);

//   useEffect(() => {
//     // Calculate if message can still be edited
//     if (message.createdAt) {
//       const editTimeLimit = 5 * 60 * 1000; // 5 minutes in milliseconds
//       const messageTime = message.createdAt.toMillis();
//       const currentTime = new Date().getTime();
//       const elapsedTime = currentTime - messageTime;
//       setCanEdit(elapsedTime <= editTimeLimit);
//     }

//     // Set edit timestamp if message has been edited
//     if (message.editedAt) {
//       setEditTimestamp(message.editedAt.toDate()); // Assuming editedAt is a Firestore Timestamp
//     } else {
//       setEditTimestamp(null);
//     }
//   }, [message.createdAt, message.editedAt]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const translateText = async (text, from, to) => {
//     if (!text.trim()) return "";
//     const authKey = "4f50da36-2758-43d2-a887-77cc7a06db8c:fx";
//     try {
//       const response = await fetch("https://api-free.deepl.com/v2/translate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           auth_key: authKey,
//           text: text,
//           source_lang: from,
//           target_lang: to,
//         }),
//       });
//       const data = await response.json();
//       return data.translations[0].text;
//     } catch (error) {
//       console.error("Error translating:", error);
//       return "Translation Error";
//     }
//   };

//   const detectLanguageAndTranslate = async (text) => {
//     try {
//       const isAscii = text.charCodeAt(0) <= 127;
//       let fromLang = isAscii ? "en" : "ja";
//       let toLang = isAscii ? "ja" : "en";

//       const translatedText = await translateText(text, fromLang, toLang);
//       return translatedText;
//     } catch (error) {
//       console.error("Error detecting language and translating:", error);
//       return "Translation Error";
//     }
//   };

//   const handleSaveClick = async () => {
//     try {
//       const translatedText = await detectLanguageAndTranslate(editedText);

//       const messageRef = doc(db, "messages", message.id);
//       const now = new Date();
//       await updateDoc(messageRef, {
//         text: editedText,
//         translatedtext: translatedText,
//         editedAt: now, // Update editedAt timestamp
//       });
//       setEditedTranslatedText(translatedText);
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

//   const debouncedTranslate = debounce(async (text) => {
//     const translatedText = await detectLanguageAndTranslate(text);
//     setEditedTranslatedText(translatedText);
//   }, 300); // Debounce time set to 300ms

//   useEffect(() => {
//     if (editedText.trim() === "") {
//       setEditedTranslatedText("");
//       return;
//     }
//     debouncedTranslate(editedText);
//   }, [editedText]);

//   const isCurrentUserMessage = message.uid === user.uid;

//   // Function to format timestamp to HH:MM format
//   const formatTimestamp = (timestamp) => {
//     if (!timestamp) return "";
//     const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
//     const formatted = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     return formatted;
//   };

//   // Determine which timestamp to show: editedAt if available, otherwise createdAt
//   const displayTimestamp = editTimestamp ? formatTimestamp(editTimestamp) : formatTimestamp(message.createdAt);

//   return (
//     <div className={`chat-bubble ${isCurrentUserMessage ? "right" : ""}`}>
//       <img className="chat-bubble__left" src={message.avatar} alt="user avatar" />
//       <div className="chat-bubble__right">
//         <p className="user-name">{message.name}</p>
//         {isEditing && isCurrentUserMessage && canEdit ? (
//           <>
//             <input
//               type="text"
//               className="edit-input"
//               value={editedText}
//               onChange={(e) => setEditedText(e.target.value)}
//             />
//             <div className="edit-buttons">
//               <button className="edit-button" onClick={handleSaveClick}>Save</button>
//               <button className="edit-button" onClick={handleCancelClick}>Cancel</button>
//             </div>
//           </>
//         ) : (
//           <>
//             {message.text && (
//               <p className={`received-message ${editTimestamp ? "edited" : ""}`}>{message.text}</p>
//             )}
//             {message.translatedtext && (
//               <p className={`received-message ${editTimestamp ? "edited" : ""}`}>{message.translatedtext}</p>
//             )}
//             {editTimestamp && (
//               <p className="edited-indicator">Edited</p>
//             )}
//             <p className="message-timestamp">{displayTimestamp}</p>
//             {isCurrentUserMessage && canEdit && (
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


// import React, { useState, useEffect } from "react";
// import { auth, db } from "./Firebase"; // Assuming db is your Firestore instance
// import { useAuthState } from "react-firebase-hooks/auth";
// import { doc, updateDoc, onSnapshot } from "firebase/firestore";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
// import debounce from 'lodash.debounce';

// const Message = ({ message }) => {
//   const [user] = useAuthState(auth);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedText, setEditedText] = useState(message.text || "");
//   const [editedTranslatedText, setEditedTranslatedText] = useState(message.translatedtext || "");
//   const [canEdit, setCanEdit] = useState(false);
//   const [editTimestamp, setEditTimestamp] = useState(null);
//   const [readByUsers, setReadByUsers] = useState([]);

//   useEffect(() => {
//     // Calculate if message can still be edited
//     if (message.createdAt) {
//       const editTimeLimit = 5 * 60 * 1000; // 5 minutes in milliseconds
//       const messageTime = message.createdAt.toMillis();
//       const currentTime = new Date().getTime();
//       const elapsedTime = currentTime - messageTime;
//       setCanEdit(elapsedTime <= editTimeLimit);
//     }

//     // Set edit timestamp if message has been edited
//     if (message.editedAt) {
//       setEditTimestamp(message.editedAt.toDate()); // Assuming editedAt is a Firestore Timestamp
//     } else {
//       setEditTimestamp(null);
//     }

//     // Subscribe to read receipts updates
//     const messageRef = doc(db, "messages", message.id);
//     const unsubscribe = onSnapshot(messageRef, (doc) => {
//       const data = doc.data();
//       setReadByUsers(data.readBy || []);
//     });

//     return () => unsubscribe();
//   }, [message.createdAt, message.editedAt]);

//   useEffect(() => {
//     // Update read receipts
//     if (!readByUsers.includes(user.uid)) {
//       const messageRef = doc(db, "messages", message.id);
//       updateDoc(messageRef, {
//         readBy: [...readByUsers, user.uid]
//       });
//     }
//   }, [user.uid, readByUsers]);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const translateText = async (text, from, to) => {
//     if (!text.trim()) return "";
//     const authKey = "4f50da36-2758-43d2-a887-77cc7a06db8c:fx";
//     try {
//       const response = await fetch("https://api-free.deepl.com/v2/translate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           auth_key: authKey,
//           text: text,
//           source_lang: from,
//           target_lang: to,
//         }),
//       });
//       const data = await response.json();
//       return data.translations[0].text;
//     } catch (error) {
//       console.error("Error translating:", error);
//       return "Translation Error";
//     }
//   };

//   const detectLanguageAndTranslate = async (text) => {
//     try {
//       const isAscii = text.charCodeAt(0) <= 127;
//       let fromLang = isAscii ? "en" : "ja";
//       let toLang = isAscii ? "ja" : "en";

//       const translatedText = await translateText(text, fromLang, toLang);
//       return translatedText;
//     } catch (error) {
//       console.error("Error detecting language and translating:", error);
//       return "Translation Error";
//     }
//   };

//   const handleSaveClick = async () => {
//     try {
//       const translatedText = await detectLanguageAndTranslate(editedText);

//       const messageRef = doc(db, "messages", message.id);
//       const now = new Date();
//       await updateDoc(messageRef, {
//         text: editedText,
//         translatedtext: translatedText,
//         editedAt: now, // Update editedAt timestamp
//       });
//       setEditedTranslatedText(translatedText);
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

//   const debouncedTranslate = debounce(async (text) => {
//     const translatedText = await detectLanguageAndTranslate(text);
//     setEditedTranslatedText(translatedText);
//   }, 300); // Debounce time set to 300ms

//   useEffect(() => {
//     if (editedText.trim() === "") {
//       setEditedTranslatedText("");
//       return;
//     }
//     debouncedTranslate(editedText);
//   }, [editedText]);

//   const isCurrentUserMessage = message.uid === user.uid;

//   // Function to format timestamp to HH:MM format
//   const formatTimestamp = (timestamp) => {
//     if (!timestamp) return "";
//     const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
//     const formatted = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     return formatted;
//   };

//   // Determine which timestamp to show: editedAt if available, otherwise createdAt
//   const displayTimestamp = editTimestamp ? formatTimestamp(editTimestamp) : formatTimestamp(message.createdAt);

//   return (
//     <div className={`chat-bubble ${isCurrentUserMessage ? "right" : ""}`}>
//       <img className="chat-bubble__left" src={message.avatar} alt="user avatar" />
//       <div className="chat-bubble__right">
//         <p className="user-name">{message.name}</p>
//         {isEditing && isCurrentUserMessage && canEdit ? (
//           <>
//             <textarea
//               type="text"
//               className="edit-textarea"
//               value={editedText}
//               onChange={(e) => setEditedText(e.target.value)}
//             />
//             <div className="edit-buttons">
//               <button className="edit-button" onClick={handleSaveClick}>Save</button>
//               <button className="edit-button" onClick={handleCancelClick}>Cancel</button>
//             </div>
//           </>
//         ) : (
//           <>
//             {message.text && (
//               <pre className={`received-message ${editTimestamp ? "edited" : ""}`}>{message.text}</pre>
//             )}
//             {message.translatedtext && (
//               <pre className={`received-message ${editTimestamp ? "edited" : ""}`}>{message.translatedtext}</pre>
//             )}
//             {editTimestamp && (
//               <p className="edited-indicator">Edited</p>
//             )}
//             <p className="message-timestamp">{displayTimestamp}</p>
//             {isCurrentUserMessage && canEdit && (
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
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import debounce from 'lodash.debounce';
// import { GoogleGenerativeAI } from "@google/generative-ai";

const Message = ({ message, preferences }) => {
  const [user] = useAuthState(auth);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(message.text || "");
  const [editedTranslatedText, setEditedTranslatedText] = useState(message.translatedtext || "");
  const [canEdit, setCanEdit] = useState(false);
  const [editTimestamp, setEditTimestamp] = useState(null);
  const [readByUsers, setReadByUsers] = useState([]);
  const [preferredLanguage, setPreferredLanguage] = useState(preferences.preferredLanguage);
  const [translatedLanguage, setTranslatedLanguage] = useState(preferredLanguage === "en" ? "ja" : "en"); 

  
   

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

    // Subscribe to read receipts updates
    const messageRef = doc(db, "messages", message.id);
    const unsubscribe = onSnapshot(messageRef, (doc) => {
      const data = doc.data();
      setReadByUsers(data.readBy || []);
    });

    return () => unsubscribe();
  }, [message.createdAt, message.editedAt]);

  useEffect(() => {
    // Update read receipts
    if (!readByUsers.includes(user.uid)) {
      const messageRef = doc(db, "messages", message.id);
      updateDoc(messageRef, {
        readBy: [...readByUsers, user.uid]
      });
    }
  }, [user.uid, readByUsers]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const translateText = async (text, from, to) => {
    if (!text.trim()) return "";

//     const genAI = new GoogleGenerativeAI("AIzaSyBWA_LHGQqKhEMKY20OqS6qSvpuKmDnHP4");

// try {

//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   const prompt = `Translate the following text from ${from} to ${to}: ${text}`;

//   const result = await model.generateContent(prompt);
//   const response = result.response;
//   const translatedText = await response.text();
//   return translatedText;
// } catch (error) {
//   console.error("Error translating:", error);
//   return "Translation Error";
// }
    const authKey = "8d076432-892a-4c29-8854-890321883b5c:fx";
    try {
      const response = await fetch("https://api-free.deepl.com/v2/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          auth_key: authKey,
          text: text,
          source_lang: from,
          target_lang: to,
        }),
      });
      const data = await response.json();
      return data.translations[0].text;
    } catch (error) {
      console.error("Error translating:", error);
      return "Translation Error";
    }
  };
  useEffect(() => {
    setPreferredLanguage(preferences.preferredLanguage);
    setTranslatedLanguage(preferences.preferredLanguage === "en" ? "ja" : "en");
  }, [preferences]);

  const detectLanguageAndTranslate = async (text) => {
    try {
      // const isAscii = preferences.preferredLanguage;
      let fromLang = preferredLanguage;
      let toLang = translatedLanguage;

      const translatedText = await translateText(text, fromLang, toLang);
      return translatedText;
    } catch (error) {
      console.error("Error detecting language and translating:", error);
      return "Translation Error";
    }
  };

  const handleSaveClick = async () => {
    try {
      const translatedText = await detectLanguageAndTranslate(editedText);

      const messageRef = doc(db, "messages", message.id);
      const now = new Date();
      await updateDoc(messageRef, {
        text: editedText,
        translatedtext: translatedText,
        editedAt: now, // Update editedAt timestamp
      });
      setEditedTranslatedText(translatedText);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };
  const handleSaveAndSwitchLanguage = async () => {
    try {
      const translatedText = await detectLanguageAndTranslate(editedText);

      const messageRef = doc(db, "messages", message.id);
      const now = new Date();
      await updateDoc(messageRef, {
        text: editedText,
        translatedtext: translatedText,
        editedAt: now, // Update editedAt timestamp
      });
      setEditedTranslatedText(translatedText);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const handleLanguageSwitchAndSave = async () => {
    const tempLanguage = preferredLanguage;
    setPreferredLanguage(translatedLanguage);
    setTranslatedLanguage(tempLanguage);// Toggle language
    // await handleSaveAndSwitchLanguage();
  };

  const handleCancelClick = () => {
    // Revert changes to original message content
    setEditedText(message.text || "");
    setEditedTranslatedText(message.translatedtext || "");
    setIsEditing(false);
  };

  const debouncedTranslate = debounce(async (text) => {
    const translatedText = await detectLanguageAndTranslate(text);
    setEditedTranslatedText(translatedText);
  }, 300); // Debounce time set to 300ms

  useEffect(() => {
    if (editedText.trim() === "") {
      setEditedTranslatedText("");
      return;
    }
    debouncedTranslate(editedText);
  }, [editedText]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSaveClick();
    }
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
            <textarea
              type="text"
              className="edit-textarea"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="edit-buttons">
            <button className="edit-button" onClick={handleLanguageSwitchAndSave}>
            {preferredLanguage === "en" ? "EN" : "JP"}
              </button>

              <button className="edit-button" onClick={handleSaveClick}>Save</button>
              <button className="edit-button" onClick={handleCancelClick}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            {message.text && (
              <pre className={`received-message ${editTimestamp ? "edited" : ""}`}>{message.text}</pre>
            )}
            {message.translatedtext && (
              <pre className={`received-message ${editTimestamp ? "edited" : ""}`}>{message.translatedtext}</pre>
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
