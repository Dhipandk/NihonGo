
// import React, { useState } from "react";
// import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
// import { auth } from "./Firebase";
// import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

// const Welcome = () => {
//   const [language, setLanguage] = useState("en");

//   const toggleLanguage = () => {
//     setLanguage((prevLanguage) => (prevLanguage === "en" ? "jp" : "en"));
//   };

//   const googleSignIn = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithRedirect(auth, provider);
//   };

//   return (
//     <main className="welcome">
//       <header>
//         <h2>{language === "en" ? "Welcome to NihonGo." : "ようこそNihonGoへ。"}</h2>
//         <button onClick={toggleLanguage} className="language-toggle">
//           {language === "en" ? "日本語へ切り替える" : "Switch to English"}
//         </button>
//         <h1>
//           {language === "en"
//             ? "Welcome to Our Chat Application!"
//             : "私たちのチャットアプリケーションへようこそ！"}
//         </h1>
//       </header>
//       <main>
//         <section>
//           <h2>{language === "en" ? "About Our Application" : "私たちのアプリについて"}</h2>
//           <p>
//             {language === "en"
//               ? "Our chat application is designed to break language barriers and bring people together from different linguistic backgrounds. With our intuitive interface and powerful translation capabilities, users can seamlessly communicate with each other regardless of the language they speak."
//               : "私たちのチャットアプリは、言語の壁を取り払い、異なる言語背景を持つ人々を結びつけるように設計されています。直感的なインターフェースと強力な翻訳機能を備えており、ユーザーは話す言語に関係なく、シームレスにコミュニケーションを取ることができます。"}
//           </p>
//         </section>
//         <section>
//           <h2>{language === "en" ? "Key Features" : "主な機能"}</h2>
//           <ul>
//             <li>
//               <strong>{language === "en" ? "Language Translation:" : "言語翻訳:"}</strong>
//               {language === "en"
//                 ? " Our application provides real-time translation between English and Japanese, enabling users to chat fluently in their preferred language."
//                 : " 私たちのアプリケーションは、英語と日本語のリアルタイム翻訳を提供し、ユーザーが希望する言語で流暢にチャットできるようにします。"}
//             </li>
//             <li>
//               <strong>{language === "en" ? "Multi-User Chat Rooms:" : "マルチユーザーチャットルーム:"}</strong>
//               {language === "en"
//                 ? " Users can create or join chat rooms where multiple participants can engage in conversations."
//                 : " ユーザーは、複数の参加者が会話に参加できるチャットルームを作成または参加できます。"}
//             </li>
//             <li>
//               <strong>{language === "en" ? "Breaking Language Barriers:" : "言語の壁を打ち破る:"}</strong>
//               {language === "en"
//                 ? " Our primary goal is to break down the barriers created by language differences."
//                 : " 私たちの主な目標は、言語の違いによって生じる障壁を取り除くことです。"}
//             </li>
//           </ul>
//         </section>
//         <section>
//           <h2>{language === "en" ? "Our Mission" : "私たちの使命"}</h2>
//           <p>
//             {language === "en"
//               ? "At NihonGo, we believe that effective communication should not be hindered by linguistic differences. Our mission is to create a welcoming environment where people from diverse backgrounds can come together, exchange ideas, and build relationships without language being a barrier."
//               : "NihonGoでは、効果的なコミュニケーションは言語の違いによって妨げられるべきではないと考えています。私たちの使命は、多様な背景を持つ人々が集まり、アイデアを交換し、言語の壁を感じることなく関係を築ける歓迎的な環境を作ることです。"}
//           </p>
//           <p>
//             {language === "en"
//               ? "Join us today and experience the power of seamless communication, transcending linguistic boundaries!"
//               : "今日参加して、言語の境界を超えたシームレスなコミュニケーションの力を体験してください！"}
//           </p>
//         </section>
//       </main>
//       <center>
//         <button className="sign-in">
//           <img
//             onClick={googleSignIn}
//             src={GoogleSignin}
//             alt={language === "en" ? "sign in with google" : "Googleでサインイン"}
//             type="button"
//           />
//         </button>
//       </center>
//     </main>
//   );
// };

// export default Welcome;

// src/components/Welcome.js
import React, { useState } from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "./Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Welcome = () => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "jp" : "en"));
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("User signed in:", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Error during sign-in:", errorCode, errorMessage, email, credential);
      });
  };

  return (
    <main className="welcome">
      <header>
        <h2>{language === "en" ? "Welcome to NihonGo." : "ようこそNihonGoへ。"}</h2>
        <button onClick={toggleLanguage} className="language-toggle">
          {language === "en" ? "日本語へ切り替える" : "Switch to English"}
        </button>
        <h1>
          {language === "en"
            ? "Welcome to Our Chat Application!"
            : "私たちのチャットアプリケーションへようこそ！"}
        </h1>
      </header>
      <main>
        <section>
          <h2>{language === "en" ? "About Our Application" : "私たちのアプリについて"}</h2>
          <p>
            {language === "en"
              ? "Our chat application is designed to break language barriers and bring people together from different linguistic backgrounds. With our intuitive interface and powerful translation capabilities, users can seamlessly communicate with each other regardless of the language they speak."
              : "私たちのチャットアプリは、言語の壁を取り払い、異なる言語背景を持つ人々を結びつけるように設計されています。直感的なインターフェースと強力な翻訳機能を備えており、ユーザーは話す言語に関係なく、シームレスにコミュニケーションを取ることができます。"}
          </p>
        </section>
        <section>
          <h2>{language === "en" ? "Key Features" : "主な機能"}</h2>
          <ul>
            <li>
              <strong>{language === "en" ? "Language Translation:" : "言語翻訳:"}</strong>
              {language === "en"
                ? " Our application provides real-time translation between English and Japanese, enabling users to chat fluently in their preferred language."
                : " 私たちのアプリケーションは、英語と日本語のリアルタイム翻訳を提供し、ユーザーが希望する言語で流暢にチャットできるようにします。"}
            </li>
            <li>
              <strong>{language === "en" ? "Multi-User Chat Rooms:" : "マルチユーザーチャットルーム:"}</strong>
              {language === "en"
                ? " Users can create or join chat rooms where multiple participants can engage in conversations."
                : " ユーザーは、複数の参加者が会話に参加できるチャットルームを作成または参加できます。"}
            </li>
            <li>
              <strong>{language === "en" ? "Breaking Language Barriers:" : "言語の壁を打ち破る:"}</strong>
              {language === "en"
                ? " Our primary goal is to break down the barriers created by language differences."
                : " 私たちの主な目標は、言語の違いによって生じる障壁を取り除くことです。"}
            </li>
          </ul>
        </section>
        <section>
          <h2>{language === "en" ? "Our Mission" : "私たちの使命"}</h2>
          <p>
            {language === "en"
              ? "At NihonGo, we believe that effective communication should not be hindered by linguistic differences. Our mission is to create a welcoming environment where people from diverse backgrounds can come together, exchange ideas, and build relationships without language being a barrier."
              : "NihonGoでは、効果的なコミュニケーションは言語の違いによって妨げられるべきではないと考えています。私たちの使命は、多様な背景を持つ人々が集まり、アイデアを交換し、言語の壁を感じることなく関係を築ける歓迎的な環境を作ることです。"}
          </p>
          <p>
            {language === "en"
              ? "Join us today and experience the power of seamless communication, transcending linguistic boundaries!"
              : "今日参加して、言語の境界を超えたシームレスなコミュニケーションの力を体験してください！"}
          </p>
        </section>
      </main>
      <center>
        <button className="sign-in">
          <img
            onClick={googleSignIn}
            src={GoogleSignin}
            alt={language === "en" ? "sign in with google" : "Googleでサインイン"}
            type="button"
          />
        </button>
      </center>
    </main>
  );
};

export default Welcome;
