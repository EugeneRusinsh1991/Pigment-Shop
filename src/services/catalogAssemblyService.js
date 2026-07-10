/**
 * catalogAssemblyService.js
 *
 * Assembles the CatalogContext storefront view model from raw catalog arrays.
 *
 * All imports are from pure builder modules (catalogBuilder, adminCategoryMerger).
 * This service has no dependency on admin mutation services or admin command layers,
 * keeping the storefront read path clearly separated from the admin write path.
 */
import { mergeWithAdminCategories } from './adminCategoryMerger';
import { buildCatalogTree, buildFlatProductList, buildCategoryTreeFromFlat } from './catalogBuilder';

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
  const adminCategoryTree = buildCategoryTreeFromFlat(categories);
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
