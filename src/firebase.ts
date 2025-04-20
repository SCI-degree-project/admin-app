import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAKK2uyOzhnhOvWtAum-L2027I6pgCD9V0",
    authDomain: "degree-project-ics-fb.firebaseapp.com",
    projectId: "degree-project-ics-fb",
    storageBucket: "degree-project-ics-fb.firebasestorage.app",
    messagingSenderId: "337587283025",
    appId: "1:337587283025:web:2dc46405540a60a9bb0470",
    measurementId: "G-YDMF6MJ5EF"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
