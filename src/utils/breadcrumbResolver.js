import { getLocalizedValue } from './localization';

const LABEL_KEYS = ['label', 'name', 'title', 'id'];

function getRawLabel(item) {
  if (!item) return '';
  const key = LABEL_KEYS.find((k) => item[k]);
  return key ? item[key] : '';
}

function resolveLocalizedText(val, lang) {
  return getLocalizedValue(val, lang);
}

function createCategoryCrumb(node, lang) {
  return {
    label: resolveLocalizedText(getRawLabel(node), lang),
    href: { pathname: '/catalog/[categoryId]', params: { categoryId: node.id } },
  };
}

function getCategoryChain(categoryId, categoryLookup) {
  if (!categoryLookup || !categoryId) return [];
  const chain = [];
  let current = categoryLookup.get(categoryId) || categoryLookup.get(String(categoryId));
  while (current) {
    chain.unshift(current);
    if (!current.parentId) break;
    current = categoryLookup.get(current.parentId) || categoryLookup.get(String(current.parentId));
  }
  return chain;
}

function createCategoryCrumbs(categoryId, categoryLookup, lang) {
  const chain = getCategoryChain(categoryId, categoryLookup);
  return chain.map((node) => createCategoryCrumb(node, lang));
}

function handleCategorySegment(params, categoryLookup, lang) {
  if (!params.categoryId || !categoryLookup) return [];
  return createCategoryCrumbs(params.categoryId, categoryLookup, lang);
}

function handleProductSegment(params, flatList, categoryLookup, lang) {
  if (!params.id) return [];
  const product = flatList?.find((p) => String(p.id) === String(params.id));
  if (!product) return [];

  const crumbs = [];
  if (product.categoryId && categoryLookup) {
    crumbs.push(...createCategoryCrumbs(product.categoryId, categoryLookup, lang));
  }

  crumbs.push({
    label: resolveLocalizedText(getRawLabel(product), lang),
    href: { pathname: '/product/[id]', params: { id: product.id } },
  });

  return crumbs;
}

const SEGMENT_HANDLERS = {
  '(store)': () => [],
  'catalog': ({ t }) => [{ label: t('navRootCatalog'), href: '/catalog' }],
  'product': ({ t, hasCatalog }) => (hasCatalog ? [] : [{ label: t('navRootCatalog'), href: '/catalog' }]),
  'products': ({ t, hasCatalog }) => (hasCatalog ? [] : [{ label: t('navRootCatalog'), href: '/catalog' }]),
  '[categoryId]': ({ params, categoryLookup, lang }) => handleCategorySegment(params, categoryLookup, lang),
  '[id]': ({ params, flatList, categoryLookup, lang }) => handleProductSegment(params, flatList, categoryLookup, lang),
};

function resolveDefaultSegment(segment) {
  if (segment.startsWith('[')) return [];
  const label = segment.charAt(0).toUpperCase() + segment.slice(1);
  return [{ label, href: `/${segment}` }];
}

function resolveSegmentCrumbs(segment, context) {
  const handler = SEGMENT_HANDLERS[segment];
  if (handler) {
    return handler(context);
  }
  return resolveDefaultSegment(segment);
}

export function buildBreadcrumbStack({ segments, params, flatList, categoryLookup, t, lang }) {
  const stack = [];
  for (const segment of segments) {
    const hasCatalog = stack.some((c) => c.href === '/catalog');
    const crumbs = resolveSegmentCrumbs(segment, { params, flatList, categoryLookup, t, lang, hasCatalog });
    stack.push(...crumbs);
  }
  return stack;
}
