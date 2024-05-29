

import React from "react";
import { auth } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  return (
    <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      <img className="chat-bubble__left" src={message.avatar} alt="user avatar" />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        {message.text && <p className="received-message">{message.text}</p>}
        {message.translatedtext && <p className="received-message">{message.translatedtext}</p>}
  
      </div>
    </div>
  );
};

export default Message;

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

