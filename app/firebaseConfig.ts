// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFICpxRFuLIxBUJegXgUXoFJPbY_lZYyE",
  authDomain: "abbott-diabetes-project.firebaseapp.com",
  projectId: "abbott-diabetes-project",
  storageBucket: "abbott-diabetes-project.appspot.com",
  messagingSenderId: "894825327347",
  appId: "1:894825327347:web:b4a392563812cec6dea586",
  measurementId: "G-D21K3PHBBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;