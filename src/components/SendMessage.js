// import React, { useState } from "react";
// import { auth, db } from "./Firebase";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import axios from 'axios';

// const SendMessage = ({ scroll }) => {

//   const [message, setMessage] = useState("");
 
//   const sendMessage = async (event) => {
//     event.preventDefault();

//     if (message.trim() === "") {
//       alert("Enter valid message");
//       return;
//     }

//     const { uid, displayName, photoURL } = auth.currentUser;



//       // Send message data to Flask backend
//       const response = await axios.post("https://exotic-celestyn-citchennai-3903b27e.koyeb.app/send-message", {
//         message: message,
//         displayName: displayName,
//         uid: uid,
//       });

//       console.log("Response from Flask:", response.data);

//       try {
//         await addDoc(collection(db, "messages"), {
//           text: message,
//           name: displayName,
//           avatar: photoURL,
//           createdAt: serverTimestamp(),
//           uid,
//           translatedtext: response.data.message
//         });

//       setMessage("");
//       scroll.current.scrollIntoView({ behavior: "smooth" })
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };



//     // setMessage("");
  
 
  
  
//   return (
//     <div>
//     <form onSubmit={(event) => sendMessage(event)} className="send-message">
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
//     </div>
//   );

// };

// export default SendMessage;

import React, { useState } from "react";
import { auth, db } from "./Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import axios from "axios";

const SendMessage = ({ scroll, currentRoom }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;

    const response = await axios.post(
      "https://exotic-celestyn-citchennai-3903b27e.koyeb.app/send-message",
      {
        message: message,
        displayName: displayName,
        uid: uid,
      }
    );

    console.log("Response from Flask:", response.data);

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
        room: currentRoom,
        translatedtext: response.data.message,
      });

      setMessage("");
      scroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <form onSubmit={(event) => sendMessage(event)} className="send-message">
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
    </div>
  );
};

export default SendMessage;
