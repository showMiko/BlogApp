import { initializeApp } from 'firebase/app';
import 'firebase/firestore'; // Import other Firebase services if needed
// import 'firebase/auth'; // if you're using Authentication

const firebaseConfig = {
      apiKey: "AIzaSyBpNAxlepA_7pKfoNgR4BG9fmDaI-YiUbo",
      authDomain: "blogapp-6efec.firebaseapp.com",
      projectId: "blogapp-6efec",
      storageBucket: "blogapp-6efec.appspot.com",
      messagingSenderId: "109103262872",
      appId: "1:109103262872:web:b1571eccc2960af581b4ed"
    };

// Initialize Firebase
const app=initializeApp(firebaseConfig);

export default app;