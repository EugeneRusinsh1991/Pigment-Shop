/**
 * catalogBuilder.js
 *
 * Pure functions that derive storefront data structures from the flat catalog
 * source arrays. No side effects, no imports from admin or state modules.
 *
 * Used by catalogAssemblyService to build the CatalogContext view model.
 */

export const CATEGORY_IMAGES = {
  'Иглы и картриджи': 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
  'Клеи и ресницы': 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop',
  'Базы и топы': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
  'Пигменты для бровей': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
  'Пигменты для губ': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop',
  'Другое': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
};

function productToLeaf(p) {
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
    category: p.category,
    subcategory: p.subcategory,
    stock: p.stock,
    sold: p.sold,
    children: [],
    reviews: [],
  };
}

function getOrCreateSubMap(map, cat) {
  if (!map.has(cat)) map.set(cat, new Map());
  return map.get(cat);
}

function getOrCreateList(subMap, subcat) {
  if (!subMap.has(subcat)) subMap.set(subcat, []);
  return subMap.get(subcat);
}

function groupByCategory(products) {
  const map = new Map();
  products.forEach((p) => {
    const cat = p.category || 'Другое';
    const subcat = p.subcategory || 'Все товары';
    const subMap = getOrCreateSubMap(map, cat);
    const list = getOrCreateList(subMap, subcat);
    list.push(productToLeaf(p));
  });
  return map;
}

function buildSubcategoryNode(catName, subcatName, leaves) {
  return {
    id: `subcat-${catName}-${subcatName}`,
    label: subcatName,
    image: CATEGORY_IMAGES[catName] || CATEGORY_IMAGES['Другое'],
    description: `Товары подкатегории «${subcatName}»`,
    children: leaves,
    isCategory: true,
  };
}

function buildCategoryNode(catName, subMap) {
  const children = Array.from(subMap.entries()).map(([subcatName, leaves]) =>
    buildSubcategoryNode(catName, subcatName, leaves)
  );

  return {
    id: `cat-${catName}`,
    label: catName,
    image: CATEGORY_IMAGES[catName] || CATEGORY_IMAGES['Другое'],
    description: `Товары категории «${catName}»`,
    children,
    isCategory: true,
  };
}

export function buildCatalogTree(products) {
  const grouped = groupByCategory(products);
  return Array.from(grouped.entries()).map(([catName, subMap]) =>
    buildCategoryNode(catName, subMap)
  );
}

export function buildFlatProductList(products) {
  return products.map(productToLeaf);
}

/**
 * Build a category tree from the flat categories array.
 * This is a pure transform with no side effects — safe to use in the
 * storefront assembly path without importing any admin-domain module.
 *
 * @param {Array} categories - Flat array of category objects with id/parentId.
 * @returns {Array} Roots of the category tree, each node has a `children` array.
 */
export function buildCategoryTreeFromFlat(categories = []) {
  const map = {};
  categories.forEach((c) => { map[c.id] = { ...c, children: [] }; });
  const roots = [];
  categories.forEach((c) => {
    if (c.parentId && map[c.parentId]) map[c.parentId].children.push(map[c.id]);
    else roots.push(map[c.id]);
  });
  return roots;
}
