/**
 * fetchCloudinaryMediaPool.mjs
 *
 * Fetches all active media assets from Cloudinary Admin API and writes them into
 * src/constants/mediaPool.json with organized categories and product pools.
 *
 * Usage:
 *   node .tools/scripts/fetchCloudinaryMediaPool.mjs
 *   node .tools/scripts/fetchCloudinaryMediaPool.mjs --secret=<api_secret>
 */

import fs, { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../../.env');
const OUTPUT_PATH = path.resolve(__dirname, '../../src/constants/mediaPool.json');

// Load environment variables from .env
if (fs.existsSync(envPath)) {
  if (typeof process.loadEnvFile === 'function') {
    try {
      process.loadEnvFile(envPath);
    } catch {
      // Fallback to manual parsing below
    }
  }
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    });
  } catch (e) {
    console.warn('⚠️ Warning reading .env file:', e.message);
  }
}

// Support CLI flag --secret=<value>
const argSecret = process.argv.find((a) => a.startsWith('--secret='));
if (argSecret) {
  process.env.CLOUDINARY_API_SECRET = argSecret.slice('--secret='.length);
}

// Import centralized Cloudinary config
import { getCloudinaryConfig } from '../../src/services/storage/storageConfig.js';

const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();

if (!cloudName || !apiKey || !apiSecret) {
  console.error('❌ Cloudinary credentials missing in storageConfig / .env.');
  console.error('   Please ensure EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME, EXPO_PUBLIC_CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set.');
  process.exit(1);
}

const BASE_URL = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`;
const AUTH = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

/**
 * Fetches all image resources from Cloudinary Admin API with pagination support.
 *
 * @param {string} [prefix='']
 * @returns {Promise<Array<{ public_id: string, secure_url: string, format: string, folder?: string }>>}
 */
async function fetchAllResources(prefix = '') {
  const results = [];
  let nextCursor = null;

  do {
    const params = new URLSearchParams({ max_results: '500' });
    if (prefix) params.set('prefix', prefix);
    if (nextCursor) params.set('next_cursor', nextCursor);

    const url = `${BASE_URL}?${params}`;
    const res = await fetch(url, {
      headers: { Authorization: `Basic ${AUTH}` },
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Cloudinary API error ${res.status}: ${body}`);
    }

    const json = await res.json();
    results.push(...(json.resources || []));
    nextCursor = json.next_cursor || null;
  } while (nextCursor);

  return results;
}

function toSecureUrl(resource) {
  return resource.secure_url;
}

async function main() {
  console.log(`\n🌩️  Fetching Cloudinary media pool (Cloud: ${cloudName})...\n`);

  // Fetch all resources and folder-scoped subsets
  const [allResources, categoryFolderRes, productFolderRes] = await Promise.all([
    fetchAllResources(''),
    fetchAllResources('categories/'),
    fetchAllResources('products/'),
  ]);

  console.log(`   📡 Total Cloudinary Images Discovered: ${allResources.length}`);
  console.log(`   📂 categories/ folder: ${categoryFolderRes.length}`);
  console.log(`   📦 products/ folder  : ${productFolderRes.length}`);

  const allUrls = allResources.map(toSecureUrl);

  let categoryImages = categoryFolderRes.map(toSecureUrl);
  let productImages = productFolderRes.map(toSecureUrl);

  // If specific folders are empty or sparse, partition from the complete live media pool
  if (categoryImages.length < 5 || productImages.length < 10) {
    if (allUrls.length >= 15) {
      categoryImages = allUrls.slice(0, 5);
      productImages = allUrls.slice(5);
    } else if (allUrls.length > 0) {
      const splitIdx = Math.max(1, Math.min(5, Math.floor(allUrls.length / 3)));
      categoryImages = allUrls.slice(0, splitIdx);
      productImages = allUrls.slice(splitIdx);
      // Ensure pools meet standard minimums through repetition if media pool is small
      while (categoryImages.length < 5 && categoryImages.length > 0) {
        categoryImages.push(categoryImages[categoryImages.length % splitIdx]);
      }
      while (productImages.length < 10 && productImages.length > 0) {
        productImages.push(productImages[productImages.length % (allUrls.length - splitIdx)]);
      }
    }
  }

  // Organize fetched assets into distinct categories
  const categoryNames = ['acrylic', 'oil', 'watercolor', 'gouache', 'spray', 'other'];
  const categories = {};
  categoryNames.forEach((cat, idx) => {
    // Distribute images across categories
    const count = Math.max(2, Math.floor(allUrls.length / categoryNames.length));
    const start = (idx * count) % Math.max(1, allUrls.length);
    const slice = allUrls.slice(start, start + count);
    categories[cat] = slice.length > 0 ? slice : allUrls.slice(0, 2);
  });

  const mediaPool = {
    categoryImages,
    productImages,
    banners: categoryImages,
    categories,
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(mediaPool, null, 2), 'utf8');

  console.log(`\n✅ mediaPool.json successfully generated & centralized → ${OUTPUT_PATH}`);
  console.log(`   📸 categoryImages : ${categoryImages.length}`);
  console.log(`   📦 productImages  : ${productImages.length}`);
  console.log(`   🎨 categories     : ${Object.keys(categories).join(', ')}`);
  console.log(`   🚩 banners        : ${mediaPool.banners.length}\n`);
}

main().catch((err) => {
  console.error('\n❌ Error fetching Cloudinary media pool:', err.message || err);
  process.exit(1);
});
