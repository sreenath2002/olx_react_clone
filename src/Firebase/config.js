// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCBUB6YlZarcj-TwjmEt1Q6Ms8H1R04A88",
    authDomain: "olx-clone-c3089.firebaseapp.com",
    projectId: "olx-clone-c3089",
    storageBucket: "olx-clone-c3089.appspot.com",
    messagingSenderId: "180766415037",
    appId: "1:180766415037:web:2d6b9912c3426003aebfd4",
    measurementId: "G-JE3GCLPXJY"
  };

  
  const firebaseApp = initializeApp(firebaseConfig);

//  const storage = getStorage(firebaseApp);
export default  firebaseApp;