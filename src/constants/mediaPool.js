import poolData from './mediaPool.json' with { type: 'json' };

const CLOUDINARY_PREFIX = 'https://res.cloudinary.com/';

function filterCloudinary(urls) {
  return (urls || []).filter(u => typeof u === 'string' && u.startsWith(CLOUDINARY_PREFIX));
}

export function validatePool(pool) {
  if (!pool || typeof pool !== 'object') {
    throw new Error("Media pool validation failed: invalid pool object. Run 'npm run fetch-media-pool' first.");
  }

  const rawCategories = filterCloudinary(pool.categoryImages);
  const rawProducts = filterCloudinary(pool.productImages);
  const rawBanners = filterCloudinary(pool.banners);

  const categoryImages = [...new Set(rawCategories)];
  const productImages = [...new Set(rawProducts)];
  const banners = rawBanners.length > 0 ? [...new Set(rawBanners)] : categoryImages;

  if (categoryImages.length < 3 || productImages.length < 5) {
    throw new Error(
      `Media pool validation failed: insufficient unique Cloudinary assets found (${categoryImages.length} categories, ${productImages.length} products; required >= 3 categories, >= 5 products). Run 'npm run fetch-media-pool' first.`
    );
  }

  return {
    categoryImages,
    productImages,
    banners,
    categories: pool.categories || {},
  };
}

const validatedPool = validatePool(poolData);

export function getDefaultProductImage() {
  return validatedPool.productImages[0] || '';
}

export function getDefaultCategoryImage() {
  return validatedPool.categoryImages[0] || '';
}

export const mediaPool = {
  ...validatedPool,
  getDefaultProductImage,
  getDefaultCategoryImage,
};

export default mediaPool;

