import { productToLeaf } from '../../src/services/catalogViewModel.helpers.js';
import { resolveMediaUrl } from '../../src/media/mediaAdapter.js';
import { PRODUCT_PLACEHOLDER } from '../../src/constants/index.js';

console.log('--- Testing Product Detail Fallback & DTO Pipeline ---');

// Test 1: productToLeaf preserves images array
const sampleRaw = {
  id: 'prod-1',
  label: { en: 'Test Product' },
  image: 'images/products/prod-1.jpg',
  images: ['https://res.cloudinary.com/test1.jpg', 'https://res.cloudinary.com/test2.jpg'],
};

const leaf = productToLeaf(sampleRaw);
console.log('[Test 1] productToLeaf images:', leaf.images);
if (!Array.isArray(leaf.images) || leaf.images.length !== 2) {
  throw new Error('Test 1 failed: images array was not preserved in productToLeaf');
}

// Test 2: productToLeaf fallback when images array is missing
const sampleLegacy = {
  id: 'prod-2',
  label: { en: 'Legacy Product' },
  image: 'images/products/prod-2.jpg',
};
const leafLegacy = productToLeaf(sampleLegacy);
console.log('[Test 2] productToLeaf fallback images:', leafLegacy.images);
if (!Array.isArray(leafLegacy.images) || leafLegacy.images[0] !== 'images/products/prod-2.jpg') {
  throw new Error('Test 2 failed: legacy image fallback in productToLeaf failed');
}

// Test 3: getRawProductImages resolution logic with legacy image
const rawList = Array.isArray(leafLegacy.images) && leafLegacy.images.length > 0
  ? leafLegacy.images
  : (typeof leafLegacy.image === 'string' && leafLegacy.image.trim().length > 0 ? [leafLegacy.image] : []);

const resolvedValid = rawList
  .map((img) => (typeof img === 'string' ? resolveMediaUrl(img) : ''))
  .filter((resolved) => typeof resolved === 'string' && (resolved.startsWith('http://') || resolved.startsWith('https://') || resolved.startsWith('data:')));

const finalImages = resolvedValid.length > 0
  ? resolvedValid.slice(0, 3)
  : [PRODUCT_PLACEHOLDER, PRODUCT_PLACEHOLDER, PRODUCT_PLACEHOLDER];

console.log('[Test 3] Resolved images for legacy product:', finalImages);
if (finalImages.length !== 3 || finalImages[0] !== PRODUCT_PLACEHOLDER) {
  throw new Error('Test 3 failed: legacy unresolvable image did not trigger 3x Cloudinary placeholder fallback');
}

console.log('--- All Product Fallback Pipeline Tests Passed Successfully! ---');
