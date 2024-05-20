// import React, { useState } from "react";
// import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
// import { auth } from "./Firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

// const NavBar = () => {
//   const [user] = useAuthState(auth);
//   const [menuVisible, setMenuVisible] = useState(false);

//   const toggleMenu = () => {
//     setMenuVisible(!menuVisible);
//   };
  

//   const googleSignIn = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithRedirect(auth, provider);
//   };
//   const signOut = () => {
//     auth.signOut();
//   };



//   return (
//     <nav className="nav-bar">
//       <h1>Group Chat</h1>


  

//       {user ? (
//         <>

//             <button onClick={toggleMenu} className="menu-toggle" type="button">
//           Menu
//           </button>
//           {menuVisible && (
//             <ul className="menu">
//               <li><button>Create Room</button></li>
              
//               <li><button onClick={signOut} type="button">
//              Sign Out
//           </button></li>

//             </ul>
//           )}
//           </>
//         //         <button onClick={signOut} className="sign-out" type="button">
//         //   Sign Out
//         // </button>
     
//       ) : (
//         <button className="sign-in">
//           <img
//             onClick={googleSignIn}
//             src={GoogleSignin}
//             alt="sign in with google"
//             type="button"
//           />
//         </button>
//       )}
//     </nav>
//   );
// };

// export default NavBar;

import React, { useState } from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth, db } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";

const NavBar = ({ setCurrentRoom }) => {
  const [user] = useAuthState(auth);
  const [menuVisible, setMenuVisible] = useState(false);
  const [createRoomVisible, setCreateRoomVisible] = useState(false);
  const [joinRoomVisible, setJoinRoomVisible] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
  };

  const createRoom = async () => {
    if (roomName.trim() === "") {
      alert("Enter valid room name");
      return;
    }

    try {
      await addDoc(collection(db, "rooms"), {
        name: roomName,
      });
      setCurrentRoom(roomName);
      setCreateRoomVisible(false);
      setMenuVisible(false);
    } catch (error) {
      console.error("Error creating room: ", error);
    }
  };

  const showJoinRoom = async () => {
    const querySnapshot = await getDocs(collection(db, "rooms"));
    const roomsList = querySnapshot.docs.map((doc) => doc.data().name);
    setRooms(roomsList);
    setJoinRoomVisible(true);
    setMenuVisible(false);
  };

  const selectRoom = (room) => {
    setCurrentRoom(room);
    setSelectedRoom(room);
    setJoinRoomVisible(false);
  };

  return (
    <nav className="nav-bar">
      <h1>NihonGo</h1>

      {user ? (
        <>
          <button onClick={toggleMenu} className="menu-toggle" type="button">
            Menu
          </button>
          {menuVisible && (
            <ul className="menu">
              <li>
                <button onClick={() => setCreateRoomVisible(true)}>
                  Create Room
                </button>
              </li>
              <li>
                <button onClick={showJoinRoom}>Join Room</button>
              </li>
              <li>
                <button onClick={signOut} type="button">
                  Sign Out
                </button>
              </li>
            </ul>
          )}
          {createRoomVisible && (
            <div className="modal-overlay">
              <div className="create-room">
                <input
                  type="text"
                  placeholder="Enter room name"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
                <button onClick={createRoom}>Create</button>
                <button onClick={() => setCreateRoomVisible(false)}>Cancel</button>
              </div>
            </div>
          )}
          {joinRoomVisible && !selectedRoom && (
            <div className="modal-overlay">
              <div className="join-room">
                {rooms.map((room) => (
                  <button key={room} onClick={() => selectRoom(room)}>
                    {room}
                  </button>
                ))}
                <button onClick={() => setJoinRoomVisible(false)}>Cancel</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <button className="sign-in">
          <img
            onClick={googleSignIn}
            src={GoogleSignin}
            alt="sign in with google"
            type="button"
          />
        </button>
      )}
    </nav>
  );
};

export default NavBar;
