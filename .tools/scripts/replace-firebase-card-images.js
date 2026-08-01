import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';
import { initializeApp } from 'firebase/app';
import { initializeAuth, inMemoryPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeFirestore, collection, getDocs, doc, writeBatch } from 'firebase/firestore';

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
const auth = initializeAuth(app, { persistence: inMemoryPersistence });
const db = initializeFirestore(app, { experimentalForceLongPolling: true });

async function run() {
  console.log('--- Step 0: Authenticating as Admin ---');
  await signInWithEmailAndPassword(auth, 'admin@pigment-shop.com', 'admin123456');
  console.log('Admin authenticated successfully.');

  console.log('--- Step 1: Ensuring local media assets exist ---');
  const mediaImagesDir = resolve('media/images');
  if (!existsSync(mediaImagesDir)) {
    mkdirSync(mediaImagesDir, { recursive: true });
  }

  const productImgPath = resolve('_default_product_card.jpg');
  const catalogImgPath = resolve('_default_catalog_card.jpg');

  const destProductPath = join(mediaImagesDir, 'default_product_card.jpg');
  const destCatalogPath = join(mediaImagesDir, 'default_catalog_card.jpg');

  copyFileSync(productImgPath, destProductPath);
  copyFileSync(catalogImgPath, destCatalogPath);

  const productUrl = '/media/images/default_product_card.jpg';
  const catalogUrl = '/media/images/default_catalog_card.jpg';

  console.log('--- Step 2: Updating products collection in Firestore ---');
  const productsSnap = await getDocs(collection(db, 'products'));
  const batch1 = writeBatch(db);
  productsSnap.forEach((d) => {
    batch1.update(doc(db, 'products', d.id), { image: productUrl });
  });
  await batch1.commit();
  console.log(`Updated ${productsSnap.size} product documents in Firestore.`);

  console.log('--- Step 3: Updating categories collection in Firestore ---');
  const categoriesSnap = await getDocs(collection(db, 'categories'));
  const batch2 = writeBatch(db);
  categoriesSnap.forEach((d) => {
    batch2.update(doc(db, 'categories', d.id), { image: catalogUrl });
  });
  await batch2.commit();
  console.log(`Updated ${categoriesSnap.size} category documents in Firestore.`);

  console.log('=== SUCCESS: All Firestore card references updated! ===');
  process.exit(0);
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
