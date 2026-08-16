import { getLocalizedValue } from '../utils/localization.js';
import { getDefaultProductImage, getDefaultCategoryImage, mediaPool } from '../constants/mediaPool.js';

export function resolveProductImageFallback(product) {
  if (product && typeof product.image === 'string' && product.image.trim()) {
    return product.image.trim();
  }
  if (product && Array.isArray(product.images) && product.images.length > 0 && product.images[0]) {
    return product.images[0];
  }
  return typeof mediaPool.getDefaultProductImage === 'function'
    ? mediaPool.getDefaultProductImage()
    : getDefaultProductImage();
}

export function resolveCategoryImageFallback(category) {
  if (category && typeof category.image === 'string' && category.image.trim()) {
    return category.image.trim();
  }
  return typeof mediaPool.getDefaultCategoryImage === 'function'
    ? mediaPool.getDefaultCategoryImage()
    : getDefaultCategoryImage();
}

export const CATEGORY_IMAGES = new Proxy({}, {
  get: () => (typeof mediaPool.getDefaultCategoryImage === 'function'
    ? mediaPool.getDefaultCategoryImage()
    : getDefaultCategoryImage()),
});


export function resolveLocalizedValue(value, lang) {
  return getLocalizedValue(value, lang);
}

function getCategoryChain(categoryMatch, categoryLookup) {
  const chain = [categoryMatch];
  let current = categoryMatch;
  while (current.parentId) {
    const parent = categoryLookup.get(current.parentId);
    if (!parent) break;
    chain.unshift(parent);
    current = parent;
  }
  return chain;
}

export function resolveProductCategoryHierarchy(product, categoryLookup, lang) {
  const categoryId = product.categoryId;
  if (!categoryId) {
    return { categoryId: null, categoryLabel: '', subcategoryLabel: '' };
  }

  const categoryMatch = categoryLookup.get(categoryId);
  if (!categoryMatch) {
    return { categoryId: null, categoryLabel: '', subcategoryLabel: '' };
  }

  const chain = getCategoryChain(categoryMatch, categoryLookup);
  const rootCategory = chain[0];
  const subCategory = chain[1];

  return {
    categoryId,
    categoryLabel: rootCategory ? resolveLocalizedValue(rootCategory.name, lang) : '',
    subcategoryLabel: subCategory ? resolveLocalizedValue(subCategory.name, lang) : '',
  };
}

export function resolveCategoryDescription(category, label, lang) {
  const desc = resolveLocalizedValue(category.description, lang);
  if (desc) return desc;

  const templates = {
    en: `Products of category "${label}"`,
    uk: `Товари категорії «${label}»`,
  };
  return templates[lang] || `Товары категории «${label}»`;
}

export function productToLeaf(p) {
  const fallbackImage = resolveProductImageFallback(p);
  const images = Array.isArray(p.images) && p.images.length > 0
    ? p.images.filter(Boolean)
    : (fallbackImage ? [fallbackImage] : []);

  return {
    id: p.id,
    label: p.label,
    brand: p.brand,
    price: p.price,
    sku: p.sku,
    discountPercent: p.discountPercent || 0,
    isNew: !!p.isNew,
    description: p.description,
    image: fallbackImage,
    images,
    stock: p.stock,
    sold: p.sold,
    category: p.category || '',
    categoryId: p.categoryId,
    subcategory: p.subcategory || '',
    isCategory: false,
    children: [],
    reviews: [],
  };
}

export function assembleCategoryTree(categoryNodes) {
  const nodeMap = new Map(categoryNodes.map((node) => [node.id, node]));
  const categoryTree = [];

  categoryNodes.forEach((node) => {
    const parent = node.parentId ? nodeMap.get(node.parentId) : null;
    if (parent) {
      if (!Array.isArray(parent.children)) {
        parent.children = [];
      }
      const firstProductIdx = parent.children.findIndex((child) => !child.isCategory);
      if (firstProductIdx === -1) {
        parent.children.push(node);
      } else {
        parent.children.splice(firstProductIdx, 0, node);
      }
    } else {
      categoryTree.push(node);
    }
  });

  return categoryTree;
}

export function collectSubtreeIds(node, result = new Set()) {
  if (!node.isCategory) return result;
  result.add(node.id);
  if (node.children) {
    for (const child of node.children) {
      if (child.isCategory) collectSubtreeIds(child, result);
    }
  }
  return result;
}
