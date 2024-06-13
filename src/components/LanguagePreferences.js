import React, { useState } from "react";
import { auth, db } from "./Firebase";
import { doc, setDoc } from "firebase/firestore";
import "./LanguagePreferences.css";

const LanguagePreferences = ({ setPreferences }) => {
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [translatedLanguage, setTranslatedLanguage] = useState("");
  const [error, setError] = useState("");

  const handleSavePreferences = async () => {
    if (preferredLanguage === translatedLanguage) {
      setError("Preferred language and translated language must not be the same.");
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
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  return (
    <div className="language-preferences">
      <h1>Select your language preferences</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="language-options">
        <div>
          <h2>Preferred Language</h2>
          <label>
            <input
              type="radio"
              value="en"
              checked={preferredLanguage === "en"}
              onChange={() => setPreferredLanguage("en")}
            />
            English
          </label>
          <label>
            <input
              type="radio"
              value="jp"
              checked={preferredLanguage === "jp"}
              onChange={() => setPreferredLanguage("jp")}
            />
            Japanese
          </label>
        </div>
        <div>
          <h2>Translated Language</h2>
          <label>
            <input
              type="radio"
              value="en"
              checked={translatedLanguage === "en"}
              onChange={() => setTranslatedLanguage("en")}
            />
            English
          </label>
          <label>
            <input
              type="radio"
              value="jp"
              checked={translatedLanguage === "jp"}
              onChange={() => setTranslatedLanguage("jp")}
            />
            Japanese
          </label>
        </div>
      </div>
      <button onClick={handleSavePreferences}>Save Preferences</button>
    </div>
  );
};

export default LanguagePreferences;
