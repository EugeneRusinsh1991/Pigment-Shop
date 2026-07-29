import {
  CATEGORY_IMAGES,
  resolveLocalizedValue,
  resolveProductCategoryHierarchy,
  resolveCategoryDescription,
  productToLeaf,
  assembleCategoryTree,
  collectSubtreeIds,
} from './catalogViewModel.helpers';



export function buildProductCategoryMap(rawCategories = []) {
  const map = new Map();
  rawCategories.forEach((cat) => {
    if (cat.productIds && Array.isArray(cat.productIds)) {
      cat.productIds.forEach((pid) => {
        map.set(pid, cat.id);
      });
    }
  });
  return map;
}

export function buildNormalizedProducts(rawProducts = [], productCategoryMap) {
  return rawProducts.map((product) => ({
    ...product,
    categoryId: productCategoryMap ? (productCategoryMap.get(product.id) || null) : null,
  }));
}

export function buildNormalizedCategories(rawCategories = []) {
  return rawCategories.map((category) => {
    const { productIds, ...rest } = category;
    return rest;
  });
}

export function buildCategoryLookup(categories = []) {
  return new Map(categories.map((c) => [c.id, c]));
}

export function buildFlatList(products = [], categoryLookup, lang = 'en') {
  const localizedProducts = products.map((product) => {
    const { categoryId, categoryLabel, subcategoryLabel } = resolveProductCategoryHierarchy(product, categoryLookup, lang);
    return {
      id: product.id,
      label: resolveLocalizedValue(product.label, lang),
      description: resolveLocalizedValue(product.description, lang),
      category: categoryLabel,
      categoryId,
      subcategory: subcategoryLabel,
      isCategory: false,
      price: product.price,
      image: product.image,
      active: product.active,
      isNew: product.isNew,
      discountPercent: product.discountPercent,
      sku: product.sku,
      brand: product.brand,
    };
  });

  const activeProducts = localizedProducts.filter((product) => product.active !== false);
  return activeProducts.map(productToLeaf);
}

export function buildCategoryTree(categories = [], flatList = [], lang = 'en') {
  const productsByCategory = new Map();
  for (const p of flatList) {
    if (p.categoryId) {
      if (!productsByCategory.has(p.categoryId)) {
        productsByCategory.set(p.categoryId, []);
      }
      productsByCategory.get(p.categoryId).push(p);
    }
  }

  const categoryNodes = categories.map((category) => {
    const label = resolveLocalizedValue(category.name, lang);
    const nameRu = category.name?.ru || category.id;
    const image = category.image || CATEGORY_IMAGES[nameRu] || CATEGORY_IMAGES['Другое'];
    const description = resolveCategoryDescription(category, label, lang);
    const assignedProducts = (productsByCategory.get(category.id) || [])
      .map((p) => ({ ...p, name: p.label }));

    return {
      id: category.id,
      label,
      image,
      description,
      isCategory: true,
      parentId: category.parentId,
      children: assignedProducts,
    };
  });

  return assembleCategoryTree(categoryNodes);
}

export function buildCategorySubtreeMap(categoryTree) {
  const map = new Map();
  if (!categoryTree) return map;

  function walk(node) {
    if (!node.isCategory) return;
    map.set(node.id, collectSubtreeIds(node));
    if (node.children) {
      for (const child of node.children) {
        if (child.isCategory) walk(child);
      }
    }
  }

  for (const root of categoryTree) walk(root);
  return map;
}
