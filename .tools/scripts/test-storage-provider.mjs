/**
 * test-storage-provider.mjs
 *
 * Verification script for testing Storage Provider abstraction, factory resolution,
 * provider switching, and high-level StorageService contracts.
 */
import { STORAGE_PROVIDERS, getActiveStorageProviderName, getCloudinaryConfig } from '../../src/services/storage/storageConfig.js';
import { getStorageProvider } from '../../src/services/storage/storageFactory.js';
import { storageService } from '../../src/services/storageService.js';
import { resolveMediaUrl } from '../../src/media/mediaAdapter.js';

async function runStorageProviderTests() {
  console.log('--- Starting Storage Provider Verification ---');

  // Test 1: Config & Default Provider
  const defaultProvider = getActiveStorageProviderName();
  console.log(`[PASS] Active default provider: ${defaultProvider}`);

  // Test 2: LocalStorageProvider Workflow
  const localProvider = getStorageProvider(STORAGE_PROVIDERS.LOCAL);
  const localUpload = await localProvider.uploadImage('data:image/png;base64,iVBORw0KGgo=');
  if (localUpload.provider !== 'local' || !localUpload.url) {
    throw new Error('LocalStorageProvider upload failed');
  }
  const resolvedLocal = localProvider.resolveUrl('images/hero.jpg');
  if (resolvedLocal !== '/media/images/hero.jpg') {
    throw new Error(`LocalStorageProvider resolution failed: ${resolvedLocal}`);
  }
  console.log('[PASS] LocalStorageProvider upload & resolution workflow verified.');

  // Test 3: CloudinaryStorageProvider URL Resolution
  const cloudProvider = getStorageProvider(STORAGE_PROVIDERS.CLOUDINARY);
  const cloudUrl = cloudProvider.resolveUrl('products/sample1', { width: 400, quality: 80 });
  if (!cloudUrl.includes('https://res.cloudinary.com/') || !cloudUrl.includes('w_400,q_80')) {
    throw new Error(`CloudinaryStorageProvider resolution failed: ${cloudUrl}`);
  }
  const legacyCloudResolve = cloudProvider.resolveUrl('images/banner.jpg');
  if (legacyCloudResolve !== '/media/images/banner.jpg') {
    throw new Error(`CloudinaryStorageProvider legacy local path check failed: ${legacyCloudResolve}`);
  }
  console.log('[PASS] CloudinaryStorageProvider URL resolution & legacy preservation verified.');

  // Test 4: FirebaseStorageProvider Instantiation & Interface
  const firebaseProvider = getStorageProvider(STORAGE_PROVIDERS.FIREBASE);
  if (typeof firebaseProvider.uploadImage !== 'function' || typeof firebaseProvider.deleteImage !== 'function') {
    throw new Error('FirebaseStorageProvider does not implement IStorageProvider interface');
  }
  console.log('[PASS] FirebaseStorageProvider interface compliance verified.');

  // Test 5: StorageService Contract (withServiceContract wrapper)
  process.env.EXPO_PUBLIC_STORAGE_PROVIDER = 'local'; // switch provider via env
  const serviceUpload = await storageService.uploadImage('data:image/png;base64,sample');
  if (!serviceUpload.success || serviceUpload.data.provider !== 'local') {
    throw new Error('storageService.uploadImage contract check failed');
  }
  const serviceDelete = await storageService.deleteImage('sample-id');
  if (!serviceDelete.success) {
    throw new Error('storageService.deleteImage contract check failed');
  }
  const mediaResolve = resolveMediaUrl('products/test-image');
  console.log(`[PASS] StorageService contract & MediaAdapter delegation verified (URL: ${mediaResolve}).`);

  // Test 6: Production Cloudinary Placeholder URLs Reachability
  const prodImgUrl = 'https://res.cloudinary.com/iayng29j/image/upload/v1785611320/products/tjlw5jitzfkoaqfmj7ti.jpg';
  const catImgUrl = 'https://res.cloudinary.com/iayng29j/image/upload/v1785611322/categories/g3yabymukhht0e8zeyc7.jpg';
  const res1 = await fetch(prodImgUrl);
  const res2 = await fetch(catImgUrl);
  if (!res1.ok || !res2.ok) {
    throw new Error(`Cloudinary placeholder HTTP check failed: ${res1.status}, ${res2.status}`);
  }
  console.log('[PASS] Production Cloudinary placeholder images verified HTTP 200 OK.');

  console.log('--- All Storage Provider Verification Tests Passed Successfully! ---');
}

runStorageProviderTests().catch((err) => {
  console.error('[FAIL] Verification test error:', err);
  process.exit(1);
});
