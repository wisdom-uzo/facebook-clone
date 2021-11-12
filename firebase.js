import { firebase } from '@firebase/app'
import '@firebase/firestore';
import '@firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBQnKdtp00vukOtrQctkagEGuWLbFQi1D0",
  authDomain: "facebook-clone-83985.firebaseapp.com",
  projectId: "facebook-clone-83985",
  storageBucket: "facebook-clone-83985.appspot.com",
  messagingSenderId: "965363995816",
  appId: "1:965363995816:web:52b7c61b4318d9fecb9e9d"
};

// Initialize Firebase

const app = !firebase.apps.length ?  firebase.initializeApp(firebaseConfig) : firebase.app()
const db = app.firestore()
const storage = firebase.storage()


export {db, storage}
