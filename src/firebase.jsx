
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDkQi07YhHRKEd94xO82GVtGvy6GoEpZWo",
  authDomain: "chatapp-9bb05.firebaseapp.com",
  projectId: "chatapp-9bb05",
  storageBucket: "chatapp-9bb05.appspot.com",
  messagingSenderId: "1042553767542",
  appId: "1:1042553767542:web:6a6fbc01168ad048870157"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);