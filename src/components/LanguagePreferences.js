// import React, { useState } from "react";
// import { auth, db } from "./Firebase";
// import { doc, setDoc } from "firebase/firestore";
// import "./LanguagePreferences.css";

// const LanguagePreferences = ({ setPreferences, language }) => {
//   const [preferredLanguage, setPreferredLanguage] = useState("");
//   const [translatedLanguage, setTranslatedLanguage] = useState("");
//   const [error, setError] = useState("");

//   const handleSavePreferences = async () => {
//     if (!preferredLanguage || !translatedLanguage) {
//       setError(
//         language === "en"
//           ? "**Please select both preferred language and translated language.**"
//           : "**優先言語と翻訳言語の両方を選択してください。**"
//       );
//       return;
//     }

//     if (preferredLanguage === translatedLanguage) {
//       setError(
//         language === "en"
//           ? "**Preferred language and translated language must not be the same.**"
//           : "**優先言語と翻訳言語は同じであってはなりません。**"
//       );
//       return;
//     }

//     const user = auth.currentUser;
//     if (!user) {
//       console.error("No user is logged in.");
//       return;
//     }

//     const userDoc = doc(db, "users", user.uid);
//     const preferences = { preferredLanguage, translatedLanguage };

//     try {
//       await setDoc(userDoc, preferences);
//       setPreferences(preferences);
//       setError(""); // Clear error on successful save
//     } catch (error) {
//       console.error("Error saving preferences:", error);
//     }
//   };

//   return (
//     <div className="language-preferences">
//       <center>
//         <h3>
//           {language === "en"
//             ? "Please Select your language preferences before creating or joining a room"
//             : "部屋を作成または参加する前に、言語設定を選択してください"}
//         </h3>
//       </center>
//       <br />
//       <div className="language-options">
//         <div>
//           <h2>{language === "en" ? "Preferred Language" : "優先言語"}</h2>
//           <br />
//           <label>
//             <input
//               type="radio"
//               value="en"
//               checked={preferredLanguage === "en"}
//               onChange={() => setPreferredLanguage("en")}
//             />
//             {language === "en" ? "English" : "英語"}
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="ja"
//               checked={preferredLanguage === "ja"}
//               onChange={() => setPreferredLanguage("ja")}
//             />
//             {language === "en" ? "Japanese" : "日本語"}
//           </label>
//         </div>
//         <div>
//           <h2>{language === "en" ? "Translated Language" : "翻訳言語"}</h2>
//           <br />
//           <label>
//             <input
//               type="radio"
//               value="en"
//               checked={translatedLanguage === "en"}
//               onChange={() => setTranslatedLanguage("en")}
//             />
//             {language === "en" ? "English" : "英語"}
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="ja"
//               checked={translatedLanguage === "ja"}
//               onChange={() => setTranslatedLanguage("ja")}
//             />
//             {language === "en" ? "Japanese" : "日本語"}
//           </label>
//         </div>
//       </div>
//       {error && <p className="error-message">{error}</p>}
//       <button className="save-button" onClick={handleSavePreferences}>
//         {language === "en" ? "Save Preferences" : "設定を保存"}
//       </button>
//     </div>
//   );
// };

// export default LanguagePreferences;

import React, { useState } from "react";
import { auth, db } from "./Firebase";
import { doc, setDoc } from "firebase/firestore";
import "./LanguagePreferences.css";

const LanguagePreferences = ({ setPreferences, language }) => {
  const [error, setError] = useState("");

  const handleSavePreferences = async (preferredLanguage, translatedLanguage) => {
    if (!preferredLanguage || !translatedLanguage) {
      setError(
        language === "en"
          ? "**Please select both preferred language and translated language.**"
          : "**優先言語と翻訳言語の両方を選択してください。**"
      );
      return;
    }

    if (preferredLanguage === translatedLanguage) {
      setError(
        language === "en"
          ? "**Preferred language and translated language must not be the same.**"
          : "**優先言語と翻訳言語は同じであってはなりません。**"
      );
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      console.error("No user is logged in.");
      return;
    }

    const userDoc = doc(db, "users", user.uid);
    const preferences = { preferredLanguage, translatedLanguage };

    try {
      await setDoc(userDoc, preferences);
      setPreferences(preferences);
      setError(""); // Clear error on successful save
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  return (
    <div className="language-preferences">
      <center>
        <h3 className="Hello">
          <br/>
          <br/><br/><br/>
          {language === "en"
            ? "Please Select your language preferences before creating or joining a room"
            : "部屋を作成または参加する前に、言語設定を選択してください"}
        </h3>
      </center>
      <br />
      <div className="language-buttons">
        <button
          className="language-button"
          onClick={() => handleSavePreferences("ja", "en")}
        >
          {language === "en" ? "Japanese to English" : "日本語から英語へ"}
        </button>
        <button
          className="language-button"
          onClick={() => handleSavePreferences("en", "ja")}
        >
          {language === "en" ? "English to Japanese" : "英語から日本語へ"}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LanguagePreferences;
