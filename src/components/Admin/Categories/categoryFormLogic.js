/**
 * categoryFormLogic.js
 *
 * Pure logic helpers for CategoryFormModal:
 * form initialization, locale extraction, validation, save execution.
 */
import { getDepthForParent, MAX_DEPTH } from '../../../services/adminCategoriesTransforms';


function getLocaleValue(fieldObj, lang) {
  if (!fieldObj) return '';
  const localizedValue = fieldObj[lang];
  return localizedValue != null ? localizedValue : '';
}

const extractLocales = (fieldObj) => ({
  ru: getLocaleValue(fieldObj, 'ru'),
  uk: getLocaleValue(fieldObj, 'uk'),
  en: getLocaleValue(fieldObj, 'en'),
});

function resolveDefaultType(category, categories) {
  if (!category) return 'product_holder';
  if (category.type) return category.type;
  return categories.some((c) => c.parentId === category.id)
    ? 'category_holder'
    : 'product_holder';
}

const buildEmptyForm = (presetParentId, defaultType) => ({
  parentId: presetParentId || null,
  name: extractLocales(null),
  description: extractLocales(null),
  image: '',
  type: defaultType,
  productIds: [],
});

const buildExistingForm = (category, defaultType) => ({
  parentId: category.parentId || null,
  name: extractLocales(category.name),
  description: extractLocales(category.description),
  image: category.image || '',
  type: defaultType,
  productIds: (category.productIds || []).filter(Boolean),
});

export function buildInitialForm(category, presetParentId, categories) {
  const defaultType = resolveDefaultType(category, categories);
  if (!category) {
    return buildEmptyForm(presetParentId, defaultType);
  }
  return buildExistingForm(category, defaultType);
}

function validateParentDepth(parentId, categories, t) {
  if (!parentId) return null;
  const depth = getDepthForParent(parentId, categories);
  return depth > MAX_DEPTH
    ? t('adminCategoriesMaxDepthError').replace('{count}', MAX_DEPTH)
    : null;
}

const LOCALES = ['ru', 'uk', 'en'];

const matchesScalar = (pCat, nameObj) => {
  if (!nameObj) return false;
  return LOCALES.some((l) => pCat === nameObj[l]);
};

const matchesObject = (pCatObj, nameObj) => {
  if (!pCatObj || !nameObj) return false;
  return LOCALES.some((l) => pCatObj[l] && pCatObj[l] === nameObj[l]);
};

function productMatchesCategory(pCat, categoryName) {
  if (!pCat) return false;
  if (typeof pCat === 'object') {
    return matchesObject(pCat, categoryName);
  }
  return matchesScalar(pCat, categoryName);
}

function hasAssignedProducts(category, products) {
  if (!category || !products) return false;
  return (category.productIds || []).some((productId) => products.some((p) => p.id === productId));
}

const validateProductHolderChange = (category, categories) => {
  const hasChildren = categories.some((c) => c.parentId === category.id);
  if (hasChildren) {
    return 'Cannot change to Product Holder: category contains subcategories.';
  }
  return null;
};

const validateCategoryHolderChange = (category, products) => {
  const hasProducts = hasAssignedProducts(category, products);
  if (hasProducts) {
    return 'Cannot change to Category Holder: category has assigned products.';
  }
  return null;
};

function validateTypeChange(formType, category, categories, products) {
  if (!category) return null;
  if (formType === 'product_holder') {
    return validateProductHolderChange(category, categories);
  }
  if (formType === 'category_holder') {
    return validateCategoryHolderChange(category, products);
  }
  return null;
}

const hasText = (val) => {
  return typeof val === 'string' && val.trim() !== '';
};

const isNameEmpty = (name) => {
  if (!name) return true;
  const locales = ['uk', 'ru', 'en'];
  const hasAnyText = locales.some((l) => hasText(name[l]));
  return !hasAnyText;
};

export function validateForm(form, categories, t, category, products) {
  const errors = {};

  if (isNameEmpty(form.name)) {
    errors.name = t('adminProductsRequiredField');
  }

  const depthError = validateParentDepth(form.parentId, categories, t);
  if (depthError) {
    errors.parentId = depthError;
  }

  const typeError = validateTypeChange(form.type, category, categories, products);
  if (typeError) {
    errors.type = typeError;
  }

  return errors;
}



export function computeTypeConstraints(category, categories, products) {
  const hasChildren = category ? categories.some((c) => c.parentId === category.id) : false;
  const hasProducts = hasAssignedProducts(category, products);
  return { isTypeDisabled: hasChildren || hasProducts };
}

function checkCanAddChild(category, onAddChild) {
  if (!category || !onAddChild) return false;
  if (category.type !== 'category_holder') return false;
  const depth = category.depth || 1;
  return depth < MAX_DEPTH;
}

export function computeModalFlags(category, onAddChild, onDelete, t) {
  const title = category ? null : t('adminCategoriesNewTitle');
  const canAddChild = checkCanAddChild(category, onAddChild);
  const canDelete = Boolean(category && onDelete);
  return {
    title,
    canAddChild,
    canDelete,
    hasFirstRow: canAddChild || canDelete,
  };
}
