

// // SendMessage.js
// import React, { useState } from "react";
// import { auth, db } from "./Firebase";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import axios from 'axios';

// const SendMessage = ({ scroll, currentRoom, preferences }) => {
//   const [message, setMessage] = useState("");

//   const sendMessage = async (event) => {
//     event.preventDefault();

//     if (message.trim() === "") {
//       alert("Enter valid message");
//       return;
//     }

//     const { uid, displayName, photoURL } = auth.currentUser;

//     const response = await axios.post("https://exotic-celestyn-citchennai-3903b27e.koyeb.app/send-message", {
//       message: message,
//       displayName: displayName,
//       uid: uid,
//     });

//     console.log("Response from Flask:", response.data);

//     try {
//       await addDoc(collection(db, "messages"), {
//         text: message,
//         name: displayName,
//         avatar: photoURL,
//         createdAt: serverTimestamp(),
//         uid,
//         roomId: currentRoom.id,
//         translatedtext: response.data.message,
//       });

//       setMessage("");
//       scroll.current.scrollIntoView({ behavior: "smooth" });
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <form onSubmit={sendMessage} className="send-message">
//       <label htmlFor="messageInput" hidden>
//         Enter Message
//       </label>
//       <input
//         id="messageInput"
//         name="messageInput"
//         type="text"
//         className="form-input__input"
//         placeholder="type message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button type="submit">Send</button>
//     </form>
//   );
// };

// export default SendMessage;

// import React, { useState } from "react";
// import { auth, db } from "./Firebase";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import axios from "axios";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';

// const SendMessage = ({ scroll, currentRoom, preferences }) => {
//   const [message, setMessage] = useState("");
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   const handleSendMessage = async (text) => {
//     if (text.trim() === "") {
//       alert("Enter valid message");
//       return;
//     }

//     const { uid, displayName, photoURL } = auth.currentUser;

//     const response = await axios.post("https://exotic-celestyn-citchennai-3903b27e.koyeb.app/send-message", {
//       message: text,
//       displayName: displayName,
//       uid: uid,
//     });

//     console.log("Response from Flask:", response.data);

//     try {
//       await addDoc(collection(db, "messages"), {
//         text: text,
//         name: displayName,
//         avatar: photoURL,
//         createdAt: serverTimestamp(),
//         uid,
//         roomId: currentRoom.id,
//         translatedtext: response.data.message,
//       });

//       setMessage("");
//       scroll.current.scrollIntoView({ behavior: "smooth" });
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const sendMessage = async (event) => {
//     event.preventDefault();
//     await handleSendMessage(message);
//   };

//   const handleMicClick = async() => {
//     const preferredLanguage = preferences.preferredLanguage; // Default to English if no preference

//     try {
//       if (listening) {
//         SpeechRecognition.stopListening();
//         await handleSendMessage(transcript);
        
//         resetTranscript();
//       } else {
//         await navigator.mediaDevices.getUserMedia({ audio: true });
        
//         SpeechRecognition.startListening({ continuous: true, language: preferredLanguage });
//       }
//     } catch (error) {
//       console.error("Error with speech recognition:", error);
//     }

//   };

//   return (
//     <form onSubmit={sendMessage} className="send-message">
//       <label htmlFor="messageInput" hidden>
//         Enter Message
//       </label>
//       <input
//         id="messageInput"
//         name="messageInput"
//         type="text"
//         className="form-input__input"
//         placeholder="type message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button className="send" type="submit">Send</button>
//       <button className="mic" type="button" onClick={handleMicClick}>
//       <FontAwesomeIcon icon={listening ? faMicrophone :faMicrophoneSlash } />
//     </button>
//     </form>
//   );
// };

// export default SendMessage;


// import React, { useState, useEffect } from "react";
// import { auth, db } from "./Firebase";
// import { addDoc, collection, serverTimestamp, doc, updateDoc } from "firebase/firestore";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
// import debounce from "lodash.debounce";
// // import { GoogleGenerativeAI } from "@google/generative-ai";

// const SendMessage = ({ scroll, currentRoom, preferences }) => {
//   const [message, setMessage] = useState("");
//   const [translatedMessage, setTranslatedMessage] = useState("");
//   const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
//   // const [isTranslating,setIsTranslating] = useState(false);
//   const { uid, displayName, photoURL } = auth.currentUser;
//   const [preferredLanguage, setPreferredLanguage] = useState(preferences.preferredLanguage || "en"); // Default to English if no preference
//   const [translatedLanguage, setTranslatedLanguage] = useState(preferredLanguage === "en" ? "ja" : "en"); 
//   // const prefer = preferredLanguage;
//   // const trans = translatedLanguage;

//   const updateTypingStatus = async (isTyping, currentMessage = "", currentTranslation = "") => {
//     if (auth.currentUser) {
//       const userRef = doc(db, "users", auth.currentUser.uid);
//       await updateDoc(userRef, {
//         typing: isTyping,
//         currentMessage: currentMessage,
//         translatedMessage: currentTranslation,
//         roomId: currentRoom.id,
//         uid:uid,
//         displayName:displayName,
//         photoURL:photoURL,
//       });
//     }
//   };
//   useEffect(() => {
//     setPreferredLanguage(preferences.preferredLanguage);
//     setTranslatedLanguage(preferences.preferredLanguage === "en" ? "ja" : "en");
//   }, [preferences]);

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(async () => {
//       if (message.trim() === "") {
//         setTranslatedMessage("");
//         await updateTypingStatus(false);
//         return;
//       }

//       const translatedText = await detectLanguageAndTranslate(message);
//       setTranslatedMessage(translatedText);
//       await updateTypingStatus(true, message, translatedText);
//     }, 300); // Debounce time set to 300ms

//     return () => clearTimeout(delayDebounceFn);
//   }, [message]);

//   const detectLanguageAndTranslate = async (text) => {
//     try {
//       // const isAscii = preferences.preferredLanguage;
//       let fromLang = preferredLanguage;
//       let toLang = translatedLanguage;

//       const translatedText = await translateText(text, fromLang, toLang);
//       return translatedText;
//     } catch (error) {
//       console.error("Error detecting language and translating:", error);
//       return "Translation Error";
//     }
//   };

//   const translateText = async (text, from, to) => {
//     if (!text.trim()) return "";
//     const authKey = "8d076432-892a-4c29-8854-890321883b5c:fx";

// //   try {
// //     const response = await fetch(
// //       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
// //     );

// //     const data = await response.json();
// //     return data.responseData.translatedText;
// //   } catch (error) {
// //     console.error("Error translating:", error);
// //     return "Translation Error";
// //   }
// // };

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
// // const genAI = new GoogleGenerativeAI("AIzaSyBWA_LHGQqKhEMKY20OqS6qSvpuKmDnHP4");

// // try {

// //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// //   const prompt = `Translate the following text from ${from} to ${to}: ${text}`;

// //   const result = await model.generateContent(prompt);
// //   const response = result.response;
// //   const translatedText = await response.text();
// //   return translatedText;
// // } catch (error) {
// //   console.error("Error translating:", error);
// //   return "Translation Error";
// // }

   
//   };


//   const debouncedTranslate = debounce(async (text) => {
//     const translatedText = await detectLanguageAndTranslate(text);
//     setTranslatedMessage(translatedText);
//     await updateTypingStatus(true, text, translatedText);
//   }, 300); // Debounce time set to 300ms

//   useEffect(() => {
//     if (message.trim() === "") {
//       setTranslatedMessage("");
//       updateTypingStatus(false);
//       return;
//     }
//     debouncedTranslate(message);
//   }, [message]);

//   const handleSendMessage = async (text) => {
//     if (text.trim() === "") {
//       alert("Enter valid message");
//       return;
//     }

//     try {
//       const translatedText = await detectLanguageAndTranslate(text);
//       setTranslatedMessage(translatedText);

//       await addDoc(collection(db, "messages"), {
//         text: text,
//         name: displayName,
//         avatar: photoURL,
//         createdAt: serverTimestamp(),
//         uid,
//         roomId: currentRoom.id,
//         translatedtext: translatedText,
//       });

//       setMessage("");
//       await updateTypingStatus(false);
//       scroll.current.scrollIntoView({ behavior: "smooth" });
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const handleMicClick = async () => {
//     const preferLanguage = preferredLanguage; // Default to English if no preference

//     try {
//       if (listening) {
//         SpeechRecognition.stopListening();
//         await handleSendMessage(transcript);
//         resetTranscript();
//       } else {
//         await navigator.mediaDevices.getUserMedia({ audio: true });
//         SpeechRecognition.startListening({ continuous: true, language: preferLanguage });
//       }
//     } catch (error) {
//       console.error("Error with speech recognition:", error);
//     }
//   };

//   const handleInputKeyDown = (e) => {
//     if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
//       e.preventDefault(); // Prevent default behavior (form submission)
//       handleSendMessage(message);
//     }
//   };
//   const handleLanguageSwitch = async () => {
//     // Use a temporary variable to swap the languages
//     const tempLanguage = preferredLanguage;
//     setPreferredLanguage(translatedLanguage);
//     setTranslatedLanguage(tempLanguage);

//     // const userRef = doc(db, "users", auth.currentUser.uid);
//     // await updateDoc(userRef, {
//     //   preferredLanguage: prefer,
//     //   translatedLanguage: trans,
//     // });

//   };



//   return (
//     <div>
//       {!browserSupportsSpeechRecognition && <span>Browser doesn't support speech recognition.</span>}
//       <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(message); }} className="send-message">
//         <textarea
//           id="messageInput"
//           name="messageInput"
//           type="text"
//           className="form-input__input"
//           placeholder="Type message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={handleInputKeyDown}
//           onBlur={() => updateTypingStatus(false)}
//         />
        
//         <button type="submit" className="send">Send</button>
//         <button type="button" onClick={handleMicClick} className="mic-icon">
//           <FontAwesomeIcon icon={listening ? faMicrophone : faMicrophoneSlash}  />
//         </button>
//         <button type="button" onClick={handleLanguageSwitch} className="switch-icon">
//         <div>
//           {preferredLanguage === "en" ? "EN" : "JP"}
//         </div>
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SendMessage;


import React, { useState, useEffect } from "react";
import { auth, db } from "./Firebase";
import { addDoc, collection, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import debounce from "lodash.debounce";
// import { GoogleGenerativeAI } from "@google/generative-ai";

const SendMessage = ({ scroll, currentRoom, preferences }) => {
  const [message, setMessage] = useState("");
  const [translatedMessage, setTranslatedMessage] = useState("");
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  // const [isTranslating,setIsTranslating] = useState(false);
  const { uid, displayName, photoURL } = auth.currentUser;
  const [preferredLanguage, setPreferredLanguage] = useState(preferences.preferredLanguage || "en"); // Default to English if no preference
  const [translatedLanguage, setTranslatedLanguage] = useState(preferredLanguage === "en" ? "ja" : "en"); 
  // const prefer = preferredLanguage;
  // const trans = translatedLanguage;

  const updateTypingStatus = async (isTyping, currentMessage = "", currentTranslation = "") => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        typing: isTyping,
        currentMessage: currentMessage,
        translatedMessage: currentTranslation,
        roomId: currentRoom.id,
        uid:uid,
        displayName:displayName,
        photoURL:photoURL,
      });
    }
  };
  useEffect(() => {
    setPreferredLanguage(preferences.preferredLanguage);
    setTranslatedLanguage(preferences.preferredLanguage === "en" ? "ja" : "en");
  }, [preferences]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (message.trim() === "") {
        setTranslatedMessage("");
        await updateTypingStatus(false);
        return;
      }

      const translatedText = await detectLanguageAndTranslate(message);
      setTranslatedMessage(translatedText);
      await updateTypingStatus(true, message, translatedText);
    }, 300); // Debounce time set to 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [message]);

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

  useEffect(() => {
    navigator.permissions.query({ name: 'microphone' }).then((result) => {
      if (result.state === 'granted') {
        console.log('Microphone permission granted');
      } else if (result.state === 'prompt') {
        console.log('Microphone permission prompt');
      } else if (result.state === 'denied') {
        console.log('Microphone permission denied');
      }
      result.onchange = function() {
        console.log('Microphone permission status changed to: ', result.state);
      }
    });
  }, []);

  const translateText = async (text, from, to) => {
    if (!text.trim()) return "";
    const authKey = "8d076432-892a-4c29-8854-890321883b5c:fx";

//   try {
//     const response = await fetch(
//       `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
//     );

//     const data = await response.json();
//     return data.responseData.translatedText;
//   } catch (error) {
//     console.error("Error translating:", error);
//     return "Translation Error";
//   }
// };

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
// const genAI = new GoogleGenerativeAI("AIzaSyBWA_LHGQqKhEMKY20OqS6qSvpuKmDnHP4");

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

   
  };


  const debouncedTranslate = debounce(async (text) => {
    const translatedText = await detectLanguageAndTranslate(text);
    setTranslatedMessage(translatedText);
    await updateTypingStatus(true, text, translatedText);
  }, 300); // Debounce time set to 300ms

  useEffect(() => {
    if (message.trim() === "") {
      setTranslatedMessage("");
      updateTypingStatus(false);
      return;
    }
    debouncedTranslate(message);
  }, [message]);

  const handleSendMessage = async (text) => {
    if (text.trim() === "") {
      alert("Enter valid message");
      return;
    }

    try {
      const translatedText = await detectLanguageAndTranslate(text);
      setTranslatedMessage(translatedText);

      await addDoc(collection(db, "messages"), {
        text: text,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
        roomId: currentRoom.id,
        translatedtext: translatedText,
      });

      setMessage("");
      await updateTypingStatus(false);
      scroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleMicClick = async () => {
    const preferLanguage = preferredLanguage; // Default to English if no preference

    try {
      if (listening) {
        SpeechRecognition.stopListening();
        await handleSendMessage(transcript);
        resetTranscript();
      } else {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        SpeechRecognition.startListening({ continuous: true, language: preferLanguage });
      }
    } catch (error) {
      console.error("Error with speech recognition:", error);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault(); // Prevent default behavior (form submission)
      handleSendMessage(message);
    }
  };
  const handleLanguageSwitch = async () => {
    // Use a temporary variable to swap the languages
    const tempLanguage = preferredLanguage;
    setPreferredLanguage(translatedLanguage);
    setTranslatedLanguage(tempLanguage);

    // const userRef = doc(db, "users", auth.currentUser.uid);
    // await updateDoc(userRef, {
    //   preferredLanguage: prefer,
    //   translatedLanguage: trans,
    // });

  };



  return (
    <div>
      {!browserSupportsSpeechRecognition && <span>Browser doesn't support speech recognition.</span>}
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(message); }} className="send-message">
        <textarea
          id="messageInput"
          name="messageInput"
          type="text"
          className="form-input__input"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleInputKeyDown}
          onBlur={() => updateTypingStatus(false)}
        />
        
        <button type="submit" className="send">Send</button>
        <button type="button" onClick={handleMicClick} className="mic-icon">
          <FontAwesomeIcon icon={listening ? faMicrophone : faMicrophoneSlash}  />
        </button>
        <button type="button" onClick={handleLanguageSwitch} className="switch-icon">
        <div>
          {preferredLanguage === "en" ? "EN" : "JP"}
        </div>
        </button>
      </form>
    </div>
  );
};

export default SendMessage;