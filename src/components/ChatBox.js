// import React, { useEffect, useRef, useState } from "react";
// import {
//   query,
//   collection,
//   orderBy,
//   onSnapshot,
//   limit,
// } from "firebase/firestore";
// import { db } from "./Firebase";
// import Message from "./Message";
// import SendMessage from "./SendMessage";

// const ChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const scroll = useRef();

//   useEffect(() => {
//     const q = query(
//       collection(db, "messages"),
//       orderBy("createdAt", "desc"),
//       limit(50)
//     );

//     const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
//       const fetchedMessages = [];
//       QuerySnapshot.forEach((doc) => {
//         fetchedMessages.push({ ...doc.data(), id: doc.id });
//       });
//       const sortedMessages = fetchedMessages.sort(
//         (a, b) => a.createdAt - b.createdAt
//       );
//       setMessages(sortedMessages);
//     });
//     return () => unsubscribe;
//   }, []);

//   return (
//     <main className="chat-box">
//       <div className="messages-wrapper">
//         {messages?.map((message) => (
//           <Message key={message.id} message={message} />
//         ))}
//       </div>
//       {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
//       <span ref={scroll}></span>
//       <SendMessage scroll={scroll} />
//     </main>
//   );
// };

// export default ChatBox;

import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
  limit,
} from "firebase/firestore";
import { db } from "./Firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = ({ currentRoom }) => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    if (currentRoom) {
      const q = query(
        collection(db, "messages"),
        where("room", "==", currentRoom),
        orderBy("createdAt", "desc"),
        limit(50)
      );

      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        const fetchedMessages = [];
        QuerySnapshot.forEach((doc) => {
          fetchedMessages.push({ ...doc.data(), id: doc.id });
        });
        const sortedMessages = fetchedMessages.sort(
          (a, b) => a.createdAt - b.createdAt
        );
        setMessages(sortedMessages);
      });
      return () => unsubscribe;
    }
  }, [currentRoom]);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} currentRoom={currentRoom} />
    </main>
  );
};

export default ChatBox;
