import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAczqd3phZt_euFxfMLOKNg1zxYfh22yFc",
    authDomain: "react-native-firebase-e3591.firebaseapp.com",
    projectId: "react-native-firebase-e3591",
    storageBucket: "react-native-firebase-e3591.appspot.com",
    messagingSenderId: "673068243449",
    appId: "1:673068243449:web:d6e7efc3e1e8579b244528",
    measurementId: "G-H9QJ6RZW5Q"
}

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //const firebase = initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();

  export default{
      firebase,
      db,
      auth,
  };
