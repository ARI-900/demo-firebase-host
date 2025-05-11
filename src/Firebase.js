import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyAwqPd8B8PpADNDPJXW-zPtrF2utzfBaFg",
  authDomain: "productcards-react.firebaseapp.com",
  projectId: "productcards-react",
  storageBucket: "productcards-react.firebasestorage.app",
  messagingSenderId: "19470331948",
  appId: "1:19470331948:web:e672c5660867af76f9a189",
  measurementId: "G-GW92GDSSP9"

    
};




// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
// import { getAnalytics } from "firebase/analytics";