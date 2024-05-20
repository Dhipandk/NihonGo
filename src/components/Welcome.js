import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "./Firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
};
  return (
    <main className="welcome">
      <h2>Welcome to NihonGo.</h2>
      {/* <img src="/logo512.png" alt="ReactJs logo" width={50} height={50} /> */}
      <header>
        <h1>Welcome to Our Chat Application!</h1>
    </header>
    <main>
        <section>
            <h2>About Our Application</h2>
            <p>
                Our chat application is designed to break language barriers and bring people together from different linguistic backgrounds. With our intuitive interface and powerful translation capabilities, users can seamlessly communicate with each other regardless of the language they speak.
            </p>
        </section>
        <section>
            <h2>Key Features</h2>
            <ul>
                <li><strong>Language Translation:</strong> Our application provides real-time translation between English and Japanese, enabling users to chat fluently in their preferred language.</li>
                <li><strong>Multi-User Chat Rooms:</strong> Users can create or join chat rooms where multiple participants can engage in conversations.</li>
                <li><strong>Breaking Language Barriers:</strong> Our primary goal is to break down the barriers created by language differences.</li>
            </ul>
        </section>
        <section><br/>  
               <h2>Our Mission</h2>
            <p>
                At NihonGo , we believe that effective communication should not be hindered by linguistic differences. Our mission is to create a welcoming environment where people from diverse backgrounds can come together, exchange ideas, and build relationships without language being a barrier.
            </p>
            <p>
                Join us today and experience the power of seamless communication, transcending linguistic boundaries!
            </p>
        </section>
    </main>
    <center>
      <button className="sign-in">
        <img
          onClick={googleSignIn}
          src={GoogleSignin}
          alt="sign in with google"
          type="button"
        />
      </button>
      </center>
    </main>
  );
};
export default Welcome;