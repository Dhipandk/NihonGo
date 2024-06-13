

// // SendMessage.js
import React, { useState } from "react";
import { auth, db } from "./Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import axios from 'axios';

const SendMessage = ({ scroll, currentRoom }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;

    const response = await axios.post("https://exotic-celestyn-citchennai-3903b27e.koyeb.app/send-message", {
      message: message,
      displayName: displayName,
      uid: uid,
    });

    console.log("Response from Flask:", response.data);

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
        roomId: currentRoom.id,
        translatedtext: response.data.message,
      });

      setMessage("");
      scroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form onSubmit={sendMessage} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
// SendMessage.js
// import React, { useState } from "react";
// import { auth, db } from "./Firebase";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import axios from 'axios';
// import vmsg from 'vmsg';

// const recorder = new vmsg.Recorder({
//   wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm'
// });

// const SendMessage = ({ scroll, currentRoom }) => {
//   const [message, setMessage] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const startRecording = async () => {
//     setIsLoading(true);
//     try {
//       await recorder.initAudio();
//       await recorder.initWorker();
//       recorder.startRecording();
//       setIsRecording(true);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const stopRecording = async () => {
//     setIsLoading(true);
//     try {
//       const blob = await recorder.stopRecording();
//       setAudioBlob(blob);
//       setIsRecording(false);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const sendMessage = async (event) => {
//     event.preventDefault();

//     if (message.trim() === "" && !audioBlob) {
//       alert("Enter a valid message or record audio");
//       return;
//     }

//     const { uid, displayName, photoURL } = auth.currentUser;

//     const formData = new FormData();
//     formData.append("message", message);
//     formData.append("uid", uid);
//     formData.append("displayName", displayName);
//     if (audioBlob) {
//       formData.append("audio", audioBlob, 'audio.wav');
//     }

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/send-message", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const { translation_text, audioURL, transcript, translated_audio_url, translated_transcript } = response.data;

//       await addDoc(collection(db, "messages"), {
//         text: message,
//         translatedtext: translation_text,
//         name: displayName,
//         avatar: photoURL,
//         createdAt: serverTimestamp(),
//         uid,
//         roomId: currentRoom.id,
//         audioURL,
//         transcript,
//         translated_audio_url,
//         translated_transcript,
//       });

//       setMessage("");
//       setAudioBlob(null);
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
//         placeholder="Type a message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <div className="voice-message-controls">
//         <button
//           type="button"
//           onClick={isRecording ? stopRecording : startRecording}
//           className="voice-record-button"
//           disabled={isLoading}
//         >
//           {isRecording ? "Stop" : "Record"}
//         </button>
//       </div>
//       <button type="submit">Send</button>
//       {audioBlob && (
//         <audio controls>
//           <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
//         </audio>
//       )}
//     </form>
//   );
// };

// export default SendMessage;



// SendMessage.js
// import React, { useState } from "react";
// import { auth, db } from "./Firebase";
// import { addDoc, collection, serverTimestamp, doc, getDoc } from "firebase/firestore";
// import axios from 'axios';
// import vmsg from 'vmsg';

// const recorder = new vmsg.Recorder({
//   wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm'
// });

// const SendMessage = ({ scroll, currentRoom }) => {
//   const [message, setMessage] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const startRecording = async () => {
//     setIsLoading(true);
//     try {
//       await recorder.initAudio();
//       await recorder.initWorker();
//       recorder.startRecording();
//       setIsRecording(true);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const stopRecording = async () => {
//     setIsLoading(true);
//     try {
//       const blob = await recorder.stopRecording();
//       setAudioBlob(blob);
//       setIsRecording(false);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const sendMessage = async (event) => {
//     event.preventDefault();

//     if (message.trim() === "" && !audioBlob) {
//       alert("Enter a valid message or record audio");
//       return;
//     }

//     const { uid, displayName, photoURL } = auth.currentUser;

//     try {
//       // Fetch user preferences from Firestore
//       const userDoc = doc(db, "users", uid);
//       const userSnapshot = await getDoc(userDoc);
//       if (!userSnapshot.exists()) {
//         console.error("No such user!");
//         return;
//       }

//       const { preferredLanguage, translatedLanguage } = userSnapshot.data();

//       const formData = new FormData();
//       formData.append("message", message);
//       formData.append("uid", uid);
//       formData.append("displayName", displayName);
//       formData.append("preferredLanguage", preferredLanguage);
//       formData.append("translatedLanguage", translatedLanguage);
//       if (audioBlob) {
//         formData.append("audio", audioBlob, 'audio.wav');
//       }

//       const response = await axios.post("http://127.0.0.1:5000/send-message", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const { translation_text, audioURL, transcript, translated_audio_url, translated_transcript } = response.data;

//       await addDoc(collection(db, "messages"), {
//         text: message,
//         translatedtext: translation_text,
//         name: displayName,
//         avatar: photoURL,
//         createdAt: serverTimestamp(),
//         uid,
//         roomId: currentRoom.id,
//         audioURL,
//         transcript,
//         translated_audio_url,
//         translated_transcript,
//       });

//       setMessage("");
//       setAudioBlob(null);
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
//         placeholder="Type a message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <div className="voice-message-controls">
//         <button
//           type="button"
//           onClick={isRecording ? stopRecording : startRecording}
//           className="voice-record-button"
//           disabled={isLoading}
//         >
//           {isRecording ? "Stop" : "Record"}
//         </button>
//       </div>
//       <button type="submit">Send</button>
//       {audioBlob && (
//         <audio controls>
//           <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
//         </audio>
//       )}
//     </form>
//   );
// };

// export default SendMessage;

// import React, { useState } from "react";
// import { auth, db } from "./Firebase";
// import { addDoc, collection, serverTimestamp, doc, getDoc } from "firebase/firestore";
// import axios from 'axios';
// import vmsg from 'vmsg';

// const recorder = new vmsg.Recorder({
//   wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm'
// });

// const SendMessage = ({ scroll, currentRoom, preferences }) => {
//   const [message, setMessage] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioBlob, setAudioBlob] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const startRecording = async () => {
//     setIsLoading(true);
//     try {
//       await recorder.initAudio();
//       await recorder.initWorker();
//       recorder.startRecording();
//       setIsRecording(true);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const stopRecording = async () => {
//     setIsLoading(true);
//     try {
//       const blob = await recorder.stopRecording();
//       setAudioBlob(blob);
//       setIsRecording(false);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const sendMessage = async (event) => {
//     event.preventDefault();

//     if (message.trim() === "" && !audioBlob) {
//       alert("Enter a valid message or record audio");
//       return;
//     }

//     const { uid, displayName, photoURL } = auth.currentUser;

//     try {
//       // Fetch user preferences from Firestore
//       const userDoc = doc(db, "users", uid);
//       const userSnapshot = await getDoc(userDoc);
//       if (!userSnapshot.exists()) {
//         console.error("No such user!");
//         return;
//       }
//       // const { preferredLanguage, translatedLanguage } = userSnapshot.data();

//       const formData = new FormData();
//       formData.append("message", message);
//       formData.append("uid", uid);
//       formData.append("displayName", displayName);
//       formData.append("preferredLanguage", preferences.preferredLanguage);
//       formData.append("translatedLanguage", preferences.translatedLanguage);
//       if (audioBlob) {
//         formData.append("audio", audioBlob, 'audio.wav');
//       }

//       const response = await axios.post("http://127.0.0.1:5000/send-message", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const { translation_text, audioURL, transcript, translated_audio_url, translated_transcript } = response.data;

//       await addDoc(collection(db, "messages"), {
//         text: message,
//         translatedtext: translation_text,
//         name: displayName,
//         avatar: photoURL,
//         createdAt: serverTimestamp(),
//         uid,
//         roomId: currentRoom.id,
//         audioURL,
//         transcript,
//         translated_audio_url,
//         translated_transcript,
//       });

//       setMessage("");
//       setAudioBlob(null);
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
//         placeholder="Type a message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <div className="voice-message-controls">
//         <button
//           type="button"
//           onClick={isRecording ? stopRecording : startRecording}
//           className="voice-record-button"
//           disabled={isLoading}
//         >
//           {isRecording ? "Stop" : "Record"}
//         </button>
//       </div>
//       <button type="submit" disabled={isLoading}>Send</button>
//       {audioBlob && (
//         <audio controls>
//           <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
//         </audio>
//       )}
//     </form>
//   );
// };

// export default SendMessage;

