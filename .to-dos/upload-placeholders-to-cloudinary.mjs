/**
 * upload-placeholders-to-cloudinary.mjs
 *
 * Script to upload default product & category placeholder images to Cloudinary via storageService,
 * and update Firestore documents with returned public HTTPS URLs.
 */
import fs from 'fs';
import path from 'path';
import { storageService } from '../src/services/storageService.js';
import { db } from '../src/services/firebase/index.js';
import { collection, getDocs, doc, updateDoc, writeBatch } from 'firebase/firestore';

async function main() {
  console.log('--- Uploading Default Placeholders to Cloudinary ---');

  // Read local placeholder files and convert to base64 Data URIs
  const productCardPath = path.resolve('_default_product_card.jpg');
  const catalogCardPath = path.resolve('_default_catalog_card.jpg');

  if (!fs.existsSync(productCardPath) || !fs.existsSync(catalogCardPath)) {
    throw new Error('Default placeholder image files not found in root workspace');
  }

  const productBase64 = `data:image/jpeg;base64,${fs.readFileSync(productCardPath).toString('base64')}`;
  const categoryBase64 = `data:image/jpeg;base64,${fs.readFileSync(catalogCardPath).toString('base64')}`;

  // Upload Product Placeholder
  console.log('Uploading default product card placeholder...');
  const productUploadResult = await storageService.uploadImage(productBase64, {
    folder: 'products',
  });

  if (!productUploadResult.success || !productUploadResult.data?.url) {
    console.error('Product upload failure:', productUploadResult);
    throw new Error(`Failed to upload product placeholder: ${productUploadResult.error}`);
  }

  const productCloudinaryUrl = productUploadResult.data.url;
  console.log(`[SUCCESS] Product Placeholder Cloudinary URL: ${productCloudinaryUrl}`);

  // Upload Category Placeholder
  console.log('Uploading default category card placeholder...');
  const categoryUploadResult = await storageService.uploadImage(categoryBase64, {
    folder: 'categories',
  });

  if (!categoryUploadResult.success || !categoryUploadResult.data?.url) {
    console.error('Category upload failure:', categoryUploadResult);
    throw new Error(`Failed to upload category placeholder: ${categoryUploadResult.error}`);
  }

  const categoryCloudinaryUrl = categoryUploadResult.data.url;
  console.log(`[SUCCESS] Category Placeholder Cloudinary URL: ${categoryCloudinaryUrl}`);

  // Update Firestore Documents
  console.log('Updating Firestore products and categories collections...');

  // Update Products
  const productsSnap = await getDocs(collection(db, 'products'));
  let updatedProductsCount = 0;
  const batch = writeBatch(db);

  productsSnap.forEach((docSnap) => {
    const data = docSnap.data();
    // Replace broken base64 or empty/placeholder image URLs with productCloudinaryUrl
    if (!data.image || data.image.startsWith('data:') || data.image.includes('placeholder')) {
      batch.update(docSnap.ref, {
        image: productCloudinaryUrl,
        images: [productCloudinaryUrl],
        updatedAt: new Date().toISOString(),
      });
      updatedProductsCount++;
    }
  });

  // Update Categories
  const categoriesSnap = await getDocs(collection(db, 'categories'));
  let updatedCategoriesCount = 0;

  categoriesSnap.forEach((docSnap) => {
    const data = docSnap.data();
    if (!data.image || data.image.startsWith('data:') || data.image.includes('placeholder')) {
      batch.update(docSnap.ref, {
        image: categoryCloudinaryUrl,
        updatedAt: new Date().toISOString(),
      });
      updatedCategoriesCount++;
    }
  });

  if (updatedProductsCount > 0 || updatedCategoriesCount > 0) {
    await batch.commit();
    console.log(`[SUCCESS] Batch updated ${updatedProductsCount} product documents and ${updatedCategoriesCount} category documents in Firestore.`);
  } else {
    console.log('[INFO] No Firestore documents required placeholder updates.');
  }

  console.log('\n=== CLOUDINARY UPLOAD & FIRESTORE INTEGRATION COMPLETE ===');
  console.log(`Product Image URL:  ${productCloudinaryUrl}`);
  console.log(`Category Image URL: ${categoryCloudinaryUrl}`);
}

main().catch((err) => {
  console.error('[FATAL] Script error:', err);
  process.exit(1);
});
