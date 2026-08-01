import { db, auth } from '../../src/services/firebase/index.js';
import { collection, getDocs, doc, writeBatch } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { PRODUCT_PLACEHOLDER, CATEGORY_PLACEHOLDER } from '../../src/constants/index.js';

async function main() {
  console.log('--- Step 0: Authenticating as Admin ---');
  await signInWithEmailAndPassword(auth, 'admin@pigment-shop.com', 'admin123456');
  console.log('Admin authenticated successfully.');

  console.log('--- Step 1: Updating products collection in Firestore with Cloudinary URLs ---');
  const productsSnap = await getDocs(collection(db, 'products'));
  const batch1 = writeBatch(db);
  productsSnap.forEach((d) => {
    batch1.update(doc(db, 'products', d.id), { 
      image: PRODUCT_PLACEHOLDER,
      images: [PRODUCT_PLACEHOLDER, PRODUCT_PLACEHOLDER, PRODUCT_PLACEHOLDER]
    });
  });
  await batch1.commit();
  console.log(`Updated ${productsSnap.size} product documents in Firestore with Cloudinary URLs.`);

  console.log('--- Step 2: Updating categories collection in Firestore with Cloudinary URLs ---');
  const categoriesSnap = await getDocs(collection(db, 'categories'));
  const batch2 = writeBatch(db);
  categoriesSnap.forEach((d) => {
    batch2.update(doc(db, 'categories', d.id), { image: CATEGORY_PLACEHOLDER });
  });
  await batch2.commit();
  console.log(`Updated ${categoriesSnap.size} category documents in Firestore with Cloudinary URLs.`);

  console.log('=== SUCCESS: All Firestore card image references migrated to Cloudinary! ===');
  process.exit(0);
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
