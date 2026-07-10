import { getCategoryTree } from './adminCategoriesService';
import { mergeWithAdminCategories } from './adminCategoryMerger';
import { buildCatalogTree, buildFlatProductList } from './catalogBuilder';

function resolveLocalizedValue(value, lang) {
  if (!value) return '';
  if (typeof value === 'object') {
    return value[lang] || value.en || value.ru || '';
  }
  return value;
}

export function buildCatalogViewModel({ products = [], categories = [], lang = 'en' } = {}) {
  const localizedProducts = products.map((product) => ({
    ...product,
    label: resolveLocalizedValue(product.label, lang),
    description: resolveLocalizedValue(product.description, lang),
    category: resolveLocalizedValue(product.category, lang),
    subcategory: resolveLocalizedValue(product.subcategory, lang),
  }));

  const activeProducts = localizedProducts.filter((product) => product.active !== false);
  const flatList = buildFlatProductList(activeProducts);
  const productTree = buildCatalogTree(activeProducts);
  const adminCategoryTree = getCategoryTree(categories);
  const categoryTree = mergeWithAdminCategories(productTree, adminCategoryTree);

  return {
    localizedProducts,
    activeProducts,
    flatList,
    productTree,
    adminCategoryTree,
    categoryTree,
  };
}
