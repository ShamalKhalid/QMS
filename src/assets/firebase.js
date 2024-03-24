// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlDyDm8lmGzm741WtcZ9gJIdhlym5LkeU",
  authDomain: "qms-project-27a3c.firebaseapp.com",
  projectId: "qms-project-27a3c",
  storageBucket: "qms-project-27a3c.appspot.com",
  messagingSenderId: "986396859546",
  appId: "1:986396859546:web:7f5ae033f09a6cbb2b5323",
  measurementId: "G-ESCP4WYSLZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

const submitDataToFirestore = async (data) => {
  try {
    data.date = serverTimestamp();
    const docRef = await addDoc(collection(db, "requests"), data);
    console.log("Data submitted successfully with ID: ", docRef.id);
    alert("Service request submitted successfully!");
  } catch (error) {
    console.error("Error submitting data: ", error);
  }
};
export { db, submitDataToFirestore };
