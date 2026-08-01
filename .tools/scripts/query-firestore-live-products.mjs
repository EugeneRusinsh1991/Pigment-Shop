import { auth, db } from '../../src/services/firebase/index.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { VISITOR_EMAIL, VISITOR_PASSWORD } from '../../src/services/authPolicy.js';

async function queryLiveFirestore() {
  console.log('--- Authenticating with Firebase as Visitor ---');
  await signInWithEmailAndPassword(auth, VISITOR_EMAIL, VISITOR_PASSWORD);
  console.log('Authentication successful.');

  console.log('--- Fetching live documents from Firestore "products" collection ---');
  const snap = await getDocs(collection(db, 'products'));
  console.log(`Total live Firestore product documents: ${snap.size}`);

  snap.forEach((docSnap) => {
    const data = docSnap.data();
    console.log(`\nDoc ID: ${docSnap.id}`);
    console.log(`  label: ${JSON.stringify(data.label)}`);
    console.log(`  image: ${data.image}`);
    console.log(`  images: ${JSON.stringify(data.images)}`);
  });
}

queryLiveFirestore().catch(console.error);
