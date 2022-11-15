import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyA09Nrnn32C1UIYLD4GF7qp2adqfmbeJrk",
  authDomain: "moneysafe-bfcf1.firebaseapp.com",
  databaseURL: "https://moneysafe-bfcf1-default-rtdb.firebaseio.com",
  projectId: "moneysafe-bfcf1",
  storageBucket: "moneysafe-bfcf1.appspot.com",
  messagingSenderId: "95279557809",
  appId: "1:95279557809:web:dc9a263055a6a25eb70690",
  measurementId: "G-F8ZXEY9HWV"
});


export const db = getFirestore(firebaseConfig);