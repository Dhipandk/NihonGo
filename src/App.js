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
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "jp" : "en"));
  };

  return (
    <div className="App">
      <NavBar setCurrentRoom={setCurrentRoom} currentRoom={currentRoom} language={language} toggleLanguage={toggleLanguage} />
      {user ? (
        currentRoom ? (
          <ChatBox currentRoom={currentRoom} language={language} />
        ) : (
          <div>
            <header>
              <h1>{language === "en" ? "Instructions" : "説明書"}</h1><br/>
            </header>
            <button onClick={toggleLanguage} className="language-toggle">
              {language === "en" ? "日本語へ切り替える" : "Switch to English"}
            </button>
            <main>
              <section>
                <h2>{language === "en" ? "Creating a Room" : "ルームを作成する"}</h2>
                <br/>
                <ol type="1">
                  <li>{language === "en" ? "Click on the 'Menu' button in the navigation bar." : "ナビゲーションバーの「メニュー」ボタンをクリックします。"}</li>
                  <li>{language === "en" ? "Choose 'Create Room' from the menu options." : "メニューオプションから「ルームを作成」を選択します。"}</li>
                  <li>{language === "en" ? "Enter a unique name for your room in the provided input field." : "提供された入力フィールドにルームの名前を入力します。"}</li>
                  <li>{language === "en" ? "Click on the 'Create' button to create the room." : "「作成」ボタンをクリックしてルームを作成します。"}</li>
                </ol>
              </section><br/>
              <section>
                <h2>{language === "en" ? "Joining a Room" : "ルームに参加する"}</h2><br/>
                <ol type="1">
                  <li>{language === "en" ? "Click on the 'Menu' button in the navigation bar." : "ナビゲーションバーの「メニュー」ボタンをクリックします。"}</li>
                  <li>{language === "en" ? "Choose 'Join Room' from the menu options." : "メニューオプションから「ルームに参加」を選択します。"}</li>
                  <li>{language === "en" ? "Select a room from the list of available rooms." : "利用可能なルームのリストからルームを選択します。"}</li>
                  <li>{language === "en" ? "Click on the room name to join the selected room." : "ルーム名をクリックして選択したルームに参加します。"}</li>
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


// App.js
// import React, { useState } from "react";
// import NavBar from "./components/NavBar";
// import ChatBox from "./components/ChatBox";
// import "./App.css";

// function App() {
//   const [currentRoom, setCurrentRoom] = useState(null);

//   return (
//     <div className="App">
//       <NavBar setCurrentRoom={setCurrentRoom} currentRoom={currentRoom} />
//       <ChatBox currentRoom={currentRoom} />
//     </div>
//   );
// }

// export default App;
