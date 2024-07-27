// import "./App.css";
// import NavBar from "./components/NavBar";
// import ChatBox from "./components/ChatBox";
// import Welcome from "./components/Welcome";
// import { useState } from "react";
// import { auth } from "./components/Firebase";
// import { useAuthState } from "react-firebase-hooks/auth";


// function App() {
//   const [user] = useAuthState(auth);

//   return (
//     <div className="App">
//       <NavBar />
//       {!user ? (
//         <Welcome />
//       ) : (
//         <>
//           <ChatBox />
//           </>
//       )}
//     </div>
//   );
// }

// export default App;

// App.js

// import React, { useState } from 'react';
// import './App.css';
// import NavBar from './components/NavBar';
// import Welcome from './components/Welcome';
// import ChatBox from './components/ChatBox';
// import PrivacyPolicy from './components/PrivacyPolicy'; // Import PrivacyPolicy component
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from './components/Firebase';

// function App() {
//   const [user] = useAuthState(auth);
//   const [currentRoom, setCurrentRoom] = useState(null);
//   const [language, setLanguage] = useState('en');
//   const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false); // State to toggle privacy policy

//   const toggleLanguage = () => {
//     setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'jp' : 'en'));
//   };

//   return (
//     <div className="App">
//       <NavBar setCurrentRoom={setCurrentRoom} currentRoom={currentRoom} language={language} toggleLanguage={toggleLanguage} />
//       {user ? (
//         currentRoom ? (
//           <ChatBox currentRoom={currentRoom} language={language} />
//         ) : (
//           <>
//             {showPrivacyPolicy ? (
//               <PrivacyPolicy language={language} />
//             ) : (
//               <div>
//                 <header>
//                   <h1>{language === 'en' ? 'Instructions' : '説明書'}</h1><br />
//                 </header>
//                 <button onClick={toggleLanguage} className="language-toggle">
//                   {language === 'en' ? '日本語へ切り替える' : 'Switch to English'}
//                 </button>
//                 <main>
//                   <section>
//                     <h2>{language === 'en' ? 'Creating a Room' : 'ルームを作成する'}</h2>
//                     <br />
//                     <ol type="1">
//                       <li>{language === 'en' ? "Click on the 'Menu' button in the navigation bar." : 'ナビゲーションバーの「メニュー」ボタンをクリックします。'}</li>
//                       <li>{language === 'en' ? 'Choose "Create Room" from the menu options.' : 'メニューオプションから「ルームを作成」を選択します。'}</li>
//                       <li>{language === 'en' ? 'Enter a unique name for your room in the provided input field.' : '提供された入力フィールドにルームの名前を入力します。'}</li>
//                       <li>{language === 'en' ? 'Click on the "Create" button to create the room.' : '「作成」ボタンをクリックしてルームを作成します。'}</li>
//                     </ol>
//                   </section><br />
//                   <section>
//                     <h2>{language === 'en' ? 'Joining a Room' : 'ルームに参加する'}</h2><br />
//                     <ol type="1">
//                       <li>{language === 'en' ? "Click on the 'Menu' button in the navigation bar." : 'ナビゲーションバーの「メニュー」ボタンをクリックします。'}</li>
//                       <li>{language === 'en' ? 'Choose "Join Room" from the menu options.' : 'メニューオプションから「ルームに参加」を選択します。'}</li>
//                       <li>{language === 'en' ? 'Select a room from the list of available rooms.' : '利用可能なルームのリストからルームを選択します。'}</li>
//                       <li>{language === 'en' ? 'Click on the room name to join the selected room.' : 'ルーム名をクリックして選択したルームに参加します。'}</li>
//                     </ol>
//                   </section>
//                 </main>
//                 <button className="bottom-center-button" onClick={() => setShowPrivacyPolicy(true)}>View Privacy Policy
//                 </button>
//               </div>
//             )}
//           </>
//         )
//       ) : (
//         <Welcome />
//       )}

//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import "./App.css";
// import NavBar from "./components/NavBar";
// import Welcome from "./components/Welcome";
// import ChatBox from "./components/ChatBox";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db } from "./components/Firebase";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import PrivacyPolicy from "./components/PrivacyPolicy";
// import LanguagePreferences from "./components/LanguagePreferences";

// function App() {
//   const [user] = useAuthState(auth);
//   const [currentRoom, setCurrentRoom] = useState(null);
//   const [language, setLanguage] = useState("en");
//   const [preferences, setPreferences] = useState(null);
//   const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

//   useEffect(() => {
//     const fetchPreferences = async () => {
//       if (!user) return;

//       const userDoc = doc(db, "users", user.uid);
//       const docSnapshot = await getDoc(userDoc);

//       if (docSnapshot.exists()) {
//         setPreferences(docSnapshot.data());
//       } else {
//         setPreferences(null);
//       }
//     };

//     fetchPreferences();
//   }, [user]);

//   const handleSetPreferences = async (prefs) => {
//     if (!user) return;

//     const userDoc = doc(db, "users", user.uid);
//     await setDoc(userDoc, {
//       uid: user.uid,
//       preferredLanguage: prefs.preferredLanguage,
//       translatedLanguage: prefs.translatedLanguage,
//     });

//     setPreferences(prefs);
//   };
  
//   // console.log(preferences);

//   const toggleLanguage = () => {
//     setLanguage((prevLanguage) => (prevLanguage === "en" ? "jp" : "en"));
//   };

//   return (
//     <div className="App">
//       <NavBar setCurrentRoom={setCurrentRoom} currentRoom={currentRoom} language={language} toggleLanguage={toggleLanguage} />
//       {user ? (
//         preferences ? (
//           currentRoom ? (
//             <ChatBox currentRoom={currentRoom} preferences={preferences}/>
//           ) : (
//             <>
//              {showPrivacyPolicy ? (
//                <PrivacyPolicy language={language} />
//              ) : (
//             <div>
//               <header>
//                 <h1>{language === "en" ? "Instructions" : "説明書"}</h1>
//                 <br />
//               </header>
//               <button onClick={toggleLanguage} className="language-toggle">
//                 {language === "en" ? "日本語へ切り替える" : "Switch to English"}
//               </button>
//               <main>
//                 <section>
//                   <h2>{language === "en" ? "Creating a Room" : "ルームを作成する"}</h2>
//                   <br />
//                   <ol type="1">
//                     <li>{language === "en" ? "Click on the 'Menu' button in the navigation bar." : "ナビゲーションバーの「メニュー」ボタンをクリックします。"}</li>
//                     <li>{language === "en" ? "Choose 'Create Room' from the menu options." : "メニューオプションから「ルームを作成」を選択します。"}</li>
//                     <li>{language === "en" ? "Enter a unique name for your room in the provided input field." : "提供された入力フィールドにルームの名前を入力します。"}</li>
//                     <li>{language === "en" ? "Click on the 'Create' button to create the room." : "「作成」ボタンをクリックしてルームを作成します。"}</li>
//                   </ol>
//                 </section>
//                 <br />
//                 <section>
//                   <h2>{language === "en" ? "Joining a Room" : "ルームに参加する"}</h2>
//                   <br />
//                   <ol type="1">
//                     <li>{language === "en" ? "Click on the 'Menu' button in the navigation bar." : "ナビゲーションバーの「メニュー」ボタンをクリックします。"}</li>
//                     <li>{language === "en" ? "Choose 'Join Room' from the menu options." : "メニューオプションから「ルームに参加」を選択します。"}</li>
//                     <li>{language === "en" ? "Select a room from the list of available rooms." : "利用可能なルームのリストからルームを選択します。"}</li>
//                     <li>{language === "en" ? "Click on the room name to join the selected room." : "ルーム名をクリックして選択したルームに参加します。"}</li>
//                   </ol>
//                 </section>
//               </main>
//               <button className="bottom-center-button" onClick={() => setShowPrivacyPolicy(true)}>View Privacy Policy
//                  </button>
//                </div>
//              )}
//          </>

//           )
//         ) : (
//           <LanguagePreferences setPreferences={handleSetPreferences} language={language}/>
//         )
//       ) : (
//         <Welcome />
//       )}
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import "./App.css";
// import NavBar from "./components/NavBar";
// import Welcome from "./components/Welcome";
// import ChatBox from "./components/ChatBox";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db } from "./components/Firebase";
// import { collection, query, orderBy, getDocs, doc, getDoc, setDoc, addDoc, serverTimestamp } from "firebase/firestore";
// import PrivacyPolicy from "./components/PrivacyPolicy";
// import LanguagePreferences from "./components/LanguagePreferences";

// function App() {
//   const [user] = useAuthState(auth);
//   const [currentRoom, setCurrentRoom] = useState(null);
//   const [language, setLanguage] = useState("en");
//   const [preferences, setPreferences] = useState(null);
//   const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
//   const [rooms, setRooms] = useState([]);
//   const [passKey, setPassKey] = useState("");
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [createRoomVisible, setCreateRoomVisible] = useState(false);
//   const [roomName, setRoomName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredRooms, setFilteredRooms] = useState([]);

//   useEffect(() => {
//     const fetchPreferences = async () => {
//       if (!user) return;

//       const userDoc = doc(db, "users", user.uid);
//       const docSnapshot = await getDoc(userDoc);

//       if (docSnapshot.exists()) {
//         setPreferences(docSnapshot.data());
//       } else {
//         setPreferences(null);
//       }
//     };

//     fetchPreferences();
//   }, [user]);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       const q = query(collection(db, "rooms"), orderBy("createdAt", "desc"));
//       const querySnapshot = await getDocs(q);
//       const roomsData = [];
//       querySnapshot.forEach((doc) => {
//         roomsData.push({ id: doc.id, ...doc.data() });
//       });
//       setRooms(roomsData);
//     };

//     fetchRooms();
//   }, []);

//   useEffect(() => {
//     if (searchTerm === "") {
//       setFilteredRooms(rooms);
//     } else {
//       const filtered = rooms.filter((room) =>
//         room.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredRooms(filtered);
//     }
//   }, [searchTerm, rooms]);

//   const handleSetPreferences = async (prefs) => {
//     if (!user) return;

//     const userDoc = doc(db, "users", user.uid);
//     await setDoc(userDoc, {
//       uid: user.uid,
//       preferredLanguage: prefs.preferredLanguage,
//       translatedLanguage: prefs.translatedLanguage,
//     });

//     setPreferences(prefs);
//   };

//   const toggleLanguage = () => {
//     setLanguage((prevLanguage) => (prevLanguage === "en" ? "jp" : "en"));
//   };

//   const createRoom = async () => {
//     if (!user) return;

//     try {
//       const newRoomRef = await addDoc(collection(db, "rooms"), {
//         name: roomName,
//         createdBy: user.displayName || user.email,
//         createdAt: serverTimestamp(),
//         passKey: passKey,
//       });
//       setRoomName("");
//       setPassKey("");
//       setCreateRoomVisible(false);
//       // Fetch rooms again after creating a new room
//     } catch (error) {
//       console.error("Error creating room: ", error);
//     }
//   };

//   const handlePassKeySubmit = () => {
//     if (passKey === selectedRoom.passKey) {
//       setCurrentRoom(selectedRoom);
//       setSelectedRoom(null);
//       setPassKey("");
//     } else {
//       alert(language === "en" ? "Invalid pass key. Please try again." : "無効なパスキーです。再試行してください。");
//     }
//   };

//   const handleCreateRoomClick = () => {
//     setCreateRoomVisible(true);
//   };

//   const togglePrivacyPolicy = () => {
//     setShowPrivacyPolicy(!showPrivacyPolicy); // Toggle the state
//   };

//   return (
//     <div className="App">
//       <NavBar setCurrentRoom={setCurrentRoom} currentRoom={currentRoom} language={language} toggleLanguage={toggleLanguage} />
//       {user ? (
//         preferences ? (
//           currentRoom ? (
//             <ChatBox currentRoom={currentRoom} preferences={preferences} />
//           ) : (
//             <>
//               {showPrivacyPolicy ? (
//                 <PrivacyPolicy language={language} />
//               ) : (
//                 <>
//                   <div className="search-bar">
//                     <input
//                       type="text"
//                       placeholder={language === "en" ? "Search rooms" : "ルームを検索"}
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <div className="room-container">
//                     <button className="crea" onClick={handleCreateRoomClick}>
//                       <span>{language === "en" ? "+" : "＋"}</span>
//                       <p>{language === "en" ? "Create Room" : "ルームを作成"}</p>
//                     </button>

//                     {filteredRooms.map((room) => (
//                       <div key={room.id} className="room" onClick={() => setSelectedRoom(room)}>
//                         <h4>{room.name}</h4><br/>
//                         <h5>{language === "en" ? `Created by: ${room.createdBy}` : `作成者: ${room.createdBy}`}</h5>
//                         <h6>{room.createdAt && room.createdAt.toDate().toLocaleString()}</h6>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               )}
//               {selectedRoom && (
//                 <div className="modal-overlay">
//                   <div className="modal">
//                     <h2>{language === "en" ? "Enter Pass Key" : "パスキーを入力"}</h2>
//                     <input
//                       type="password"
//                       value={passKey}
//                       onChange={(e) => setPassKey(e.target.value)}
//                       placeholder={language === "en" ? "Enter pass key" : "パスキーを入力"}
//                     />
//                     <button onClick={handlePassKeySubmit}>{language === "en" ? "Submit" : "送信"}</button>
//                     <button onClick={() => setSelectedRoom(null)}>{language === "en" ? "Cancel" : "キャンセル"}</button>
//                   </div>
//                 </div>
//               )}
//               {createRoomVisible && (
//                 <div className="modal-overlay">
//                   <div className="create-room">
//                     <h2>{language === "en" ? "Create Room" : "ルームを作成する"}</h2>
//                     <input
//                       type="text"
//                       placeholder={language === "en" ? "Enter room name" : "ルーム名を入力"}
//                       value={roomName}
//                       onChange={(e) => setRoomName(e.target.value)}
//                     />
//                     <input
//                       type="password"
//                       placeholder={language === "en" ? "Enter pass key" : "パスキーを入力"}
//                       value={passKey}
//                       onChange={(e) => setPassKey(e.target.value)}
//                     />
//                     <button onClick={createRoom}>{language === "en" ? "Create" : "作成"}</button>
//                     <button onClick={() => setCreateRoomVisible(false)}>{language === "en" ? "Cancel" : "キャンセル"}</button>
//                   </div>
//                 </div>
//               )}
              

//               <div>
//                 <button className="bottom-center-button" onClick={togglePrivacyPolicy}>View Privacy Policy
//                 </button>
//               </div>
//             </>
//           )
//         ) : (
//           <LanguagePreferences setPreferences={handleSetPreferences} language={language} />
//         )
//       ) : (
//         <Welcome />
//       )}
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import "./App.css";
// import NavBar from "./components/NavBar";
// import Welcome from "./components/Welcome";
// import ChatBox from "./components/ChatBox";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db } from "./components/Firebase";
// import { collection, query, orderBy, doc, getDoc, setDoc, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
// import PrivacyPolicy from "./components/PrivacyPolicy";
// import LanguagePreferences from "./components/LanguagePreferences";

// function App() {
//   const [user] = useAuthState(auth);
//   const [currentRoom, setCurrentRoom] = useState(null);
//   const [language, setLanguage] = useState("en");
//   const [preferences, setPreferences] = useState(null);
//   const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
//   const [rooms, setRooms] = useState([]);
//   const [passKey, setPassKey] = useState("");
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [createRoomVisible, setCreateRoomVisible] = useState(false);
//   const [roomName, setRoomName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredRooms, setFilteredRooms] = useState([]);

//   useEffect(() => {
//     const fetchPreferences = async () => {
//       if (!user) return;

//       const userDoc = doc(db, "users", user.uid);
//       const docSnapshot = await getDoc(userDoc);

//       if (docSnapshot.exists()) {
//         setPreferences(docSnapshot.data());
//       } else {
//         setPreferences(null);
//       }
//     };

//     fetchPreferences();
//   }, [user]);

//   useEffect(() => {
//     const q = query(collection(db, "rooms"), orderBy("createdAt", "desc"));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const roomsData = [];
//       querySnapshot.forEach((doc) => {
//         roomsData.push({ id: doc.id, ...doc.data() });
//       });
//       setRooms(roomsData);
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (searchTerm === "") {
//       setFilteredRooms(rooms);
//     } else {
//       const filtered = rooms.filter((room) =>
//         room.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredRooms(filtered);
//     }
//   }, [searchTerm, rooms]);

//   const handleSetPreferences = async (prefs) => {
//     if (!user) return;

//     const userDoc = doc(db, "users", user.uid);
//     await setDoc(userDoc, {
//       uid: user.uid,
//       preferredLanguage: prefs.preferredLanguage,
//       translatedLanguage: prefs.translatedLanguage,
//     });

//     setPreferences(prefs);
//   };

//   const toggleLanguage = () => {
//     setLanguage((prevLanguage) => (prevLanguage === "en" ? "jp" : "en"));
//   };

//   const createRoom = async () => {
//     if (!user) return;

//     try {
//       const newRoomRef = await addDoc(collection(db, "rooms"), {
//         name: roomName,
//         createdBy: user.displayName || user.email,
//         createdAt: serverTimestamp(),
//         passKey: passKey,
//       });
//       setRoomName("");
//       setPassKey("");
//       setCreateRoomVisible(false);
//       // Enter the newly created room
//       setCurrentRoom({ id: newRoomRef.id, name: roomName, createdBy: user.displayName || user.email, createdAt: new Date(), passKey: passKey });
//     } catch (error) {
//       console.error("Error creating room: ", error);
//     }
//   };

//   const handlePassKeySubmit = () => {
//     if (passKey === selectedRoom.passKey) {
//       setCurrentRoom(selectedRoom);
//       setSelectedRoom(null);
//       setPassKey("");
//     } else {
//       alert(language === "en" ? "Invalid pass key. Please try again." : "無効なパスキーです。再試行してください。");
//     }
//   };

//   const handleCreateRoomClick = () => {
//     setCreateRoomVisible(true);
//   };

//   const togglePrivacyPolicy = () => {
//     setShowPrivacyPolicy(!showPrivacyPolicy); // Toggle the state
//   };

//   return (
//     <div className="App">
//       <NavBar setCurrentRoom={setCurrentRoom} currentRoom={currentRoom} language={language} toggleLanguage={toggleLanguage} />
//       {user ? (
//         preferences ? (
//           currentRoom ? (
//             <ChatBox currentRoom={currentRoom} preferences={preferences} setPreferences={setPreferences} />
//           ) : (
//             <>
//               {showPrivacyPolicy ? (
//                 <PrivacyPolicy language={language} />
//               ) : (
//                 <>
//                   <div className="search-bar">
//                     <input
//                       type="text"
//                       placeholder={language === "en" ? "Search rooms" : "ルームを検索"}
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <div className="room-container">
//                     <button className="crea" onClick={handleCreateRoomClick}>
//                       <span>{language === "en" ? "+" : "＋"}</span>
//                       <p>{language === "en" ? "Create Room" : "ルームを作成"}</p>
//                     </button>

//                     {filteredRooms.map((room) => (
//                       <div key={room.id} className="room" onClick={() => setSelectedRoom(room)}>
//                         <h4>{room.name}</h4><br/>
//                         <h5>{language === "en" ? `Created by: ${room.createdBy}` : `作成者: ${room.createdBy}`}</h5>
//                         <h6>{room.createdAt && room.createdAt.toDate().toLocaleString()}</h6>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               )}
//               {selectedRoom && (
//                 <div className="modal-overlay">
//                   <div className="modal">
//                     <h2>{language === "en" ? "Enter Pass Key" : "パスキーを入力"}</h2>
//                     <input
//                       type="password"
//                       value={passKey}
//                       onChange={(e) => setPassKey(e.target.value)}
//                       placeholder={language === "en" ? "Enter pass key" : "パスキーを入力"}
//                     />
//                     <button onClick={handlePassKeySubmit}>{language === "en" ? "Submit" : "送信"}</button>
//                     <button onClick={() => setSelectedRoom(null)}>{language === "en" ? "Cancel" : "キャンセル"}</button>
//                   </div>
//                 </div>
//               )}
//               {createRoomVisible && (
//                 <div className="modal-overlay">
//                   <div className="create-room">
//                     <h2>{language === "en" ? "Create Room" : "ルームを作成する"}</h2>
//                     <input
//                       type="text"
//                       placeholder={language === "en" ? "Enter room name" : "ルーム名を入力"}
//                       value={roomName}
//                       onChange={(e) => setRoomName(e.target.value)}
//                     />
//                     <input
//                       type="password"
//                       placeholder={language === "en" ? "Enter pass key" : "パスキーを入力"}
//                       value={passKey}
//                       onChange={(e) => setPassKey(e.target.value)}
//                     />
//                     <button onClick={createRoom}>{language === "en" ? "Create" : "作成"}</button>
//                     <button onClick={() => setCreateRoomVisible(false)}>{language === "en" ? "Cancel" : "キャンセル"}</button>
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <button className="bottom-center-button" onClick={togglePrivacyPolicy}>View Privacy Policy
//                 </button>
//               </div>
//             </>
//           )
//         ) : (
//           <LanguagePreferences setPreferences={handleSetPreferences} language={language} />
//         )
//       ) : (
//         <Welcome />
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import ChatBox from "./components/ChatBox";
import PrivacyPolicy from "./components/PrivacyPolicy";
import LanguagePreferences from "./components/LanguagePreferences";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./components/Firebase";
import { collection, query, orderBy, doc, getDoc, setDoc, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

function MainApp() {
  const [user] = useAuthState(auth);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [language, setLanguage] = useState("en");
  const [preferences, setPreferences] = useState(null);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [passKey, setPassKey] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [createRoomVisible, setCreateRoomVisible] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user) return;

      const userDoc = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(userDoc);

      if (docSnapshot.exists()) {
        setPreferences(docSnapshot.data());
      } else {
        setPreferences(null);
      }
    };

    fetchPreferences();
  }, [user]);

  useEffect(() => {
    const q = query(collection(db, "rooms"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const roomsData = [];
      querySnapshot.forEach((doc) => {
        roomsData.push({ id: doc.id, ...doc.data() });
      });
      setRooms(roomsData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRooms(filtered);
    }
  }, [searchTerm, rooms]);

  useEffect(() => {
    if (user) {
      if (preferences) {
        if (currentRoom) {
          navigate(`/room/${currentRoom.id}`);
        } else {
          navigate("/rooms");
        }
      } else {
        navigate("/preferences");
      }
    } else {
      navigate("/welcome");
    }
  }, [user, preferences, currentRoom, navigate]);

  const handleSetPreferences = async (prefs) => {
    if (!user) return;

    const userDoc = doc(db, "users", user.uid);
    await setDoc(userDoc, {
      uid: user.uid,
      preferredLanguage: prefs.preferredLanguage,
      translatedLanguage: prefs.translatedLanguage,
    });

    setPreferences(prefs);
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "jp" : "en"));
  };

  const createRoom = async () => {
    if (!user) return;

    try {
      const newRoomRef = await addDoc(collection(db, "rooms"), {
        name: roomName,
        createdBy: user.displayName || user.email,
        createdAt: serverTimestamp(),
        passKey: passKey,
      });
      setRoomName("");
      setPassKey("");
      setCreateRoomVisible(false);
      setCurrentRoom({ id: newRoomRef.id, name: roomName, createdBy: user.displayName || user.email, createdAt: new Date(), passKey: passKey });
    } catch (error) {
      console.error("Error creating room: ", error);
    }
  };

  const handlePassKeySubmit = () => {
    if (passKey === selectedRoom.passKey) {
      setCurrentRoom(selectedRoom);
      setSelectedRoom(null);
      setPassKey("");
    } else {
      alert(language === "en" ? "Invalid pass key. Please try again." : "無効なパスキーです。再試行してください。");
    }
  };

  const handleCreateRoomClick = () => {
    setCreateRoomVisible(true);
  };

  const togglePrivacyPolicy = () => {
    setShowPrivacyPolicy(!showPrivacyPolicy); // Toggle the state
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div className="App">
      <NavBar
        setCurrentRoom={setCurrentRoom}
        currentRoom={currentRoom}
        language={language}
        toggleLanguage={toggleLanguage}
        signOut={signOut}
      />
      <Routes>
        <Route path="/" element={<Navigate to={user ? (preferences ? (currentRoom ? `/room/${currentRoom.id}` : "/rooms") : "/preferences") : "/welcome"} />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/preferences" element={user ? <LanguagePreferences setPreferences={handleSetPreferences} language={language} /> : <Navigate to="/welcome" />} />
        <Route path="/rooms" element={
          user ? (
            <>
              {showPrivacyPolicy ? (
                <PrivacyPolicy language={language} />
              ) : (
                <>
                  <div className="search-bar">
                    <input
                      type="text"
                      placeholder={language === "en" ? "Search rooms" : "ルームを検索"}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="room-container">
                    <button className="crea" onClick={handleCreateRoomClick}>
                      <span>{language === "en" ? "+" : "＋"}</span>
                      <p>{language === "en" ? "Create Room" : "ルームを作成"}</p>
                    </button>
                    {filteredRooms.map((room) => (
                      <div key={room.id} className="room" onClick={() => setSelectedRoom(room)}>
                        <h4>{room.name}</h4><br/>
                        <h5>{language === "en" ? `Created by: ${room.createdBy}` : `作成者: ${room.createdBy}`}</h5>
                        <h6>{room.createdAt && room.createdAt.toDate().toLocaleString()}</h6>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {selectedRoom && (
                <div className="modal-overlay">
                  <div className="modal">
                    <h2>{language === "en" ? "Enter Pass Key" : "パスキーを入力"}</h2>
                    <input
                      type="password"
                      value={passKey}
                      onChange={(e) => setPassKey(e.target.value)}
                      placeholder={language === "en" ? "Enter pass key" : "パスキーを入力"}
                    />
                    <button onClick={handlePassKeySubmit}>{language === "en" ? "Submit" : "送信"}</button>
                    <button onClick={() => setSelectedRoom(null)}>{language === "en" ? "Cancel" : "キャンセル"}</button>
                  </div>
                </div>
              )}
              {createRoomVisible && (
                <div className="modal-overlay">
                  <div className="create-room">
                    <h2>{language === "en" ? "Create Room" : "ルームを作成する"}</h2>
                    <input
                      type="text"
                      placeholder={language === "en" ? "Enter room name" : "ルーム名を入力"}
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder={language === "en" ? "Enter pass key" : "パスキーを入力"}
                      value={passKey}
                      onChange={(e) => setPassKey(e.target.value)}
                    />
                    <button onClick={createRoom}>{language === "en" ? "Create" : "作成"}</button>
                    <button onClick={() => setCreateRoomVisible(false)}>{language === "en" ? "Cancel" : "キャンセル"}</button>
                  </div>
                </div>
              )}
              <div>
                <button className="bottom-center-button" onClick={togglePrivacyPolicy}>{language === "en" ? "View Privacy Policy" : "プライバシーポリシーを見る"}</button>
              </div>
            </>
          ) : <Navigate to="/welcome" />
        } />
        <Route path="/room/:roomId" element={user ? <ChatBox currentRoom={currentRoom} preferences={preferences} setPreferences={setPreferences} /> : <Navigate to="/welcome" />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy language={language} />} />
      </Routes>
    </div>
  );
}

export default App;
