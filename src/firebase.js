import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDOM0dw4FTwgAfUNitp2VZKfgUnI21z6Jo",
  authDomain: "discussnow-f6505.firebaseapp.com",
  projectId: "discussnow-f6505",
  storageBucket: "discussnow-f6505.appspot.com",
  messagingSenderId: "966760224857",
  appId: "1:966760224857:web:7ee0f693a0af86140cb948",
  measurementId: "G-20474SC1HE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;