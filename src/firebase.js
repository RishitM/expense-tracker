import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDokxY8BazvUzVrEGPnwtKpYBb0j4lm9-k",
  authDomain: "expense-a5fc5.firebaseapp.com",
  projectId: "expense-a5fc5",
  storageBucket: "expense-a5fc5.appspot.com",
  messagingSenderId: "980585341806",
  appId: "1:980585341806:web:b8cf83be7d231a7a70177f",
  measurementId: "G-75SP32K6BR"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();