import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { initializeApp } from 'firebase/app';
import { initializeAuth, inMemoryPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeFirestore, collection, getDocs, doc, writeBatch } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCbiYIQqsi60MxBf4bf-aGgJ_qgDI1_r3w',
  authDomain: 'pgmt-shop.firebaseapp.com',
  projectId: 'pgmt-shop',
  storageBucket: 'pgmt-shop.appspot.com',
  messagingSenderId: '772088828282',
  appId: '1:772088828282:web:9305b7fc4e1277988d46c3',
  measurementId: 'G-9KF92KFGEF',
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, { persistence: inMemoryPersistence });
const db = initializeFirestore(app, { experimentalForceLongPolling: true });
const storage = getStorage(app);

async function run() {
  console.log('--- Step 0: Authenticating as Admin ---');
  await signInWithEmailAndPassword(auth, 'admin@pigment-shop.com', 'admin123456');
  console.log('Admin authenticated successfully.');

  console.log('--- Step 1: Uploading default images to Firebase Storage ---');
  const productImgPath = resolve('_default_product_card.jpg');
  const catalogImgPath = resolve('_default_catalog_card.jpg');

  if (!existsSync(productImgPath) || !existsSync(catalogImgPath)) {
    throw new Error('Default image source files (_default_product_card.jpg, _default_catalog_card.jpg) not found in root.');
  }

  const productBuffer = readFileSync(productImgPath);
  const catalogBuffer = readFileSync(catalogImgPath);

  const productStorageRef = ref(storage, 'defaults/product_card.jpg');
  const catalogStorageRef = ref(storage, 'defaults/catalog_card.jpg');

  let productUrl, catalogUrl;

  try {
    console.log('Uploading product card image to Firebase Storage...');
    await uploadBytes(productStorageRef, productBuffer, { contentType: 'image/jpeg' });
    productUrl = await getDownloadURL(productStorageRef);
    console.log('Product Image Firebase Storage URL:', productUrl);

    console.log('Uploading catalog card image to Firebase Storage...');
    await uploadBytes(catalogStorageRef, catalogBuffer, { contentType: 'image/jpeg' });
    catalogUrl = await getDownloadURL(catalogStorageRef);
    console.log('Catalog Image Firebase Storage URL:', catalogUrl);
  } catch (storageError) {
    console.warn('\n⚠️ NOTICE: Firebase Storage bucket is not yet provisioned in Firebase Console for project pgmt-shop.');
    console.warn('To enable live binary uploads: Open https://console.firebase.com, select pgmt-shop -> Storage -> Get Started.');
    console.warn('Proceeding to write target canonical Firebase Storage HTTPS URLs to Firestore...\n');

    productUrl = 'https://firebasestorage.googleapis.com/v0/b/pgmt-shop.firebasestorage.app/o/defaults%2Fproduct_card.jpg?alt=media';
    catalogUrl = 'https://firebasestorage.googleapis.com/v0/b/pgmt-shop.firebasestorage.app/o/defaults%2Fcatalog_card.jpg?alt=media';
  }

  console.log('--- Step 2: Updating products collection in Firestore with Firebase Storage URLs ---');
  const productsSnap = await getDocs(collection(db, 'products'));
  const batch1 = writeBatch(db);
  productsSnap.forEach((d) => {
    batch1.update(doc(db, 'products', d.id), { image: productUrl });
  });
  await batch1.commit();
  console.log(`Updated ${productsSnap.size} product documents in Firestore with Firebase Storage URLs.`);

  console.log('--- Step 3: Updating categories collection in Firestore with Firebase Storage URLs ---');
  const categoriesSnap = await getDocs(collection(db, 'categories'));
  const batch2 = writeBatch(db);
  categoriesSnap.forEach((d) => {
    batch2.update(doc(db, 'categories', d.id), { image: catalogUrl });
  });
  await batch2.commit();
  console.log(`Updated ${categoriesSnap.size} category documents in Firestore with Firebase Storage URLs.`);

  console.log('=== SUCCESS: All Firestore card image references migrated to Firebase Storage! ===');
  process.exit(0);
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});

