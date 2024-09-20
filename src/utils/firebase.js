// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkJ-AoOoGvpwP1EgI0HfXtuJOiz0jyL84",
  authDomain: "viso-frontend-task-77fe2.firebaseapp.com",
  projectId: "viso-frontend-task-77fe2",
  storageBucket: "viso-frontend-task-77fe2.appspot.com",
  messagingSenderId: "332662290842",
  appId: "1:332662290842:web:e48781040097fc49ef6223",
  databaseURL: "https://viso-frontend-task-77fe2-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);