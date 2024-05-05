import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDm5vJwvu6iQ9s7POX33UGw2piPP-TolCM",
	authDomain: "rerecover-bbdb0.firebaseapp.com",
	projectId: "rerecover-bbdb0",
	storageBucket: "rerecover-bbdb0.appspot.com",
	messagingSenderId: "1011614995565",
	appId: "1:1011614995565:web:8024d20054a47f1f99db64",
	measurementId: "G-HG9C80SR2X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
