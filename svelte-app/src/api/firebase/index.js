import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance";
import "firebase/analytics";

const app = firebase.initializeApp({
  apiKey: "AIzaSyC7CwYQy5Hj6TD9EwK0Q6Ad-hWibDCw3as",
  authDomain: "churchapp-cotfc.firebaseapp.com",
  databaseURL: "https://churchapp-cotfc.firebaseio.com",
  projectId: "churchapp-cotfc",
  storageBucket: "churchapp-cotfc.appspot.com",
  messagingSenderId: "18475054745",
  appId: "1:18475054745:web:1336c114f4b0b16edd2a08",
  measurementId: "G-HG0X2T2PSJ"
});

const auth = app.auth();
const firestore = app.firestore();
const Timestamp = firebase.firestore.Timestamp;
const storage = app.storage();

export { auth, firebase, firestore, storage, Timestamp };
