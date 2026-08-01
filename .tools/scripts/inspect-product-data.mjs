import { db, auth } from '../../src/services/firebase/index.js';
import { collection, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

async function main() {
  console.log('--- Authenticating as Admin ---');
  await signInWithEmailAndPassword(auth, 'admin@pigment-shop.com', 'admin123456');
  console.log('--- Inspecting Firestore Products ---');
  const snap = await getDocs(collection(db, 'products'));
  console.log(`Total products in Firestore: ${snap.size}`);
  snap.forEach((docSnap) => {
    const data = docSnap.data();
    console.log(`Doc ID: ${docSnap.id}`);
    console.log('  image:', data.image);
    console.log('  images:', data.images);
  });
}

main().catch(console.error);
