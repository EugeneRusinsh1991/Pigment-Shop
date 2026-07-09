/**
 * catalogBuilder.js
 *
 * Derives storefront data structures from the flat admin product list.
 *
 * Products have a `category` string field. We group them into a two-level
 * hierarchy: Category → Products, which replaces the static HIERARCHY tree
 * for the product-level navigation.
 *
 * The top-level HIERARCHY (Материалы / Пигменты) is kept as static category
 * groupings so the existing navigation shell works unchanged. Products are
 * injected into the deepest subcategory nodes based on their `category` field.
 */

/** Category name → parent group mapping (mirrors static HIERARCHY grouping) */
const CATEGORY_GROUPS = {
  'Иглы и картриджи': 'Перманентный макияж',
  'Клеи и ресницы': 'Наращивание ресниц',
  'Базы и топы': 'Ногтевой сервис',
  'Пигменты для бровей': 'Пигменты для ПМ',
  'Пигменты для губ': 'Пигменты для ПМ',
  'Другое': 'Прочее',
};

const CATEGORY_IMAGES = {
  'Иглы и картриджи': 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
  'Клеи и ресницы': 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop',
  'Базы и топы': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
  'Пигменты для бровей': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
  'Пигменты для губ': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop',
  'Другое': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
};

/** Convert a flat admin product to a storefront-compatible leaf node */
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
    stock: p.stock,
    sold: p.sold,
    children: [],
    reviews: [],
  };
}

/** Group products by their category field */
function groupByCategory(products) {
  const map = new Map();
  for (const p of products) {
    const cat = p.category || 'Другое';
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat).push(productToLeaf(p));
  }
  return map;
}

/** Build a two-level tree: category nodes containing product leaves */
export function buildCatalogTree(products) {
  const grouped = groupByCategory(products);
  const nodes = [];

  for (const [catName, leaves] of grouped.entries()) {
    nodes.push({
      id: `cat-${catName}`,
      label: catName,
      image: CATEGORY_IMAGES[catName] || CATEGORY_IMAGES['Другое'],
      description: `Товары категории «${catName}»`,
      children: leaves,
    });
  }

  return nodes;
}

/** Return all active products as a flat list for search / discounts / new arrivals */
export function buildFlatProductList(products) {
  return products.map(productToLeaf);
}
