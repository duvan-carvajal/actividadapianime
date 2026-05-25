import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDatBxGBh_ORo3eIBc-JFp5vHuAQELd0VM",
  authDomain: "animeapi-ac947.firebaseapp.com",
  projectId: "animeapi-ac947",
  storageBucket: "animeapi-ac947.firebasestorage.app",
  messagingSenderId: "740470727027",
  appId: "1:740470727027:web:3c50df94c3706d08a46506",
  measurementId: "G-JBJ92ZV0KB"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
