import { getLocalizedValue } from '../utils/localization.js';

export const CATEGORY_IMAGES = {
  'Иглы и картриджи': 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
  'Клеи и ресницы': 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop',
  'Базы и топы': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
  'Пигменты для бровей': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
  'Пигменты для губ': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop',
  'Другое': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
};

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
  return {
    id: p.id,
    label: p.label,
    brand: p.brand,
    price: p.price,
    sku: p.sku,
    discountPercent: p.discountPercent || 0,
    isNew: !!p.isNew,
    description: p.description,
    image: p.image,
    images: Array.isArray(p.images) && p.images.length > 0
      ? p.images
      : (p.image ? [p.image] : []),
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

  categoryNodes.forEach((node) => {
    delete node.parentId;
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
