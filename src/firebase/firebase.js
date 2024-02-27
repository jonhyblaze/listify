import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD3KQ0286prpKYylstZXs4MRg7SKEL9SVs",
  authDomain: "listify-f4f0c.firebaseapp.com",
  projectId: "listify-f4f0c",
  storageBucket: "listify-f4f0c.appspot.com",
  messagingSenderId: "107613624345",
  appId: "1:107613624345:web:71d57886c5b345d12eb288",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
