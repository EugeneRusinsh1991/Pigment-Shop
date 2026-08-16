import { db, auth } from '../../src/services/firebase/index.js';
import { collection, getDocs, doc, writeBatch } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getCloudinaryConfig } from '../../src/services/storage/storageConfig.js';
import { validatePool, mediaPool, getDefaultProductImage, getDefaultCategoryImage } from '../../src/constants/mediaPool.js';

async function main() {
  console.log('--- Step 0: Validating Media Pool & Cloudinary Configuration ---');
  validatePool(mediaPool);
  const cloudConfig = getCloudinaryConfig();
  console.log(`Cloudinary Cloud Target: ${cloudConfig.cloudName}`);

  console.log('--- Step 1: Authenticating as Admin ---');
  await signInWithEmailAndPassword(auth, 'admin@pigment-shop.com', 'admin123456');
  console.log('Admin authenticated successfully.');

  const defaultProductImg = getDefaultProductImage();
  const defaultCategoryImg = getDefaultCategoryImage();
  const productImagesPool = mediaPool.productImages || [defaultProductImg];

  console.log('--- Step 2: Updating products collection in Firestore with Cloudinary URLs ---');
  const productsSnap = await getDocs(collection(db, 'products'));
  const batch1 = writeBatch(db);
  let pIdx = 0;
  productsSnap.forEach((d) => {
    const pImg = productImagesPool[pIdx % productImagesPool.length] || defaultProductImg;
    const pImg2 = productImagesPool[(pIdx + 1) % productImagesPool.length] || defaultProductImg;
    const pImg3 = productImagesPool[(pIdx + 2) % productImagesPool.length] || defaultProductImg;
    pIdx++;

    batch1.update(doc(db, 'products', d.id), { 
      image: pImg,
      images: [pImg, pImg2, pImg3]
    });
  });
  await batch1.commit();
  console.log(`Updated ${productsSnap.size} product documents in Firestore with Cloudinary URLs.`);

  console.log('--- Step 3: Updating categories collection in Firestore with Cloudinary URLs ---');
  const categoriesSnap = await getDocs(collection(db, 'categories'));
  const batch2 = writeBatch(db);
  let cIdx = 0;
  const categoryImagesPool = mediaPool.categoryImages || [defaultCategoryImg];
  categoriesSnap.forEach((d) => {
    const cImg = categoryImagesPool[cIdx % categoryImagesPool.length] || defaultCategoryImg;
    cIdx++;
    batch2.update(doc(db, 'categories', d.id), { image: cImg });
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
