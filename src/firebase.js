import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCbiYIQqsi60MxBf4bf-aGgJ_qgDI1_r3w',
  authDomain: 'pgmt-shop.firebaseapp.com',
  projectId: 'pgmt-shop',
  storageBucket: 'pgmt-shop.firebasestorage.app',
  messagingSenderId: '772088828282',
  appId: '1:772088828282:web:9305b7fc4e1277988d46c3',
  measurementId: 'G-9KF92KFGEF',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

