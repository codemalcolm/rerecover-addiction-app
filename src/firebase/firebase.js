import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
	apiKey: "AIzaSyBIi3Af_XM9pq6R3d1txYmcP-7iP8ycGOE",
	authDomain: "rerecover-app.firebaseapp.com",
	projectId: "rerecover-app",
	storageBucket: "rerecover-app.appspot.com",
	messagingSenderId: "749209873753",
	appId: "1:749209873753:web:4ffdf7094ce004dc70f048",
	measurementId: "G-RJSFBM85D1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app)

export {app, auth, firestore, storage}