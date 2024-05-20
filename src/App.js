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
import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import ChatBox from "./components/ChatBox";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./components/Firebase";

function App() {
  const [user] = useAuthState(auth);
  const [currentRoom, setCurrentRoom] = useState(null);

  return (
    <div className="App">
      <NavBar setCurrentRoom={setCurrentRoom} />
      {user ? (
        currentRoom ? (
          <ChatBox currentRoom={currentRoom} />
        ) : (
          <div>
          <header>
        <h1>Instructions</h1><br/>
    </header>
    <main>
        <section>
            <h2>Creating a Room</h2>
            <br/>
            <ol type="1">
                <li>Click on the "Menu" button in the navigation bar.</li>
                <li>Choose "Create Room" from the menu options.</li>
                <li>Enter a unique name for your room in the provided input field.</li>
                <li>Click on the "Create" button to create the room.</li>
            </ol>    
        </section><br/>
        <section>
            <h2>Joining a Room</h2><br/>
            <ol type="1">
                <li>Click on the "Menu" button in the navigation bar.</li>
                <li>Choose "Join Room" from the menu options.</li>
                <li>Select a room from the list of available rooms.</li>
                <li>Click on the room name to join the selected room.</li>
            </ol>
        </section>
    </main>
    </div>
        )
      ) : (
        <Welcome />
      )}
    </div>
  );
}

export default App;

