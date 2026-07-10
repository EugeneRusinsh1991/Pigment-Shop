/**
 * productFormLogic.js
 *
 * Pure logic helpers for the product create/edit form:
 * form initialization, validation, field resolution, and serialization.
 */
import { getCategories } from '../../../data/catalogState';
import { CATEGORY_TRANSLATIONS, EMPTY_FORM } from './productFormConstants';

function resolveLocalizedValue(val, lang) {
  if (!val) return '';
  if (typeof val !== 'object') return val;
  const match = [lang, 'ru', 'en', 'uk'].find((l) => val[l]);
  return match ? val[match] : '';
}

const LOCALES = ['ru', 'uk', 'en'];

function localizedFromScalar(scalar) {
  const v = scalar ?? '';
  return { ru: v, uk: v, en: v };
}

function localizedFromObject(obj) {
  return LOCALES.reduce((acc, l) => { acc[l] = obj[l] ?? ''; return acc; }, {});
}

function extractLocalizedField(val) {
  if (!val || typeof val !== 'object') return localizedFromScalar(val);
  return localizedFromObject(val);
}

function extractNumericFields(product) {
  return {
    price: String(product.price ?? ''),
    discountPercent: String(product.discountPercent ?? ''),
    stock: String(product.stock ?? ''),
  };
}

function extractTextField(val) {
  return val ?? '';
}

function extractProductScalars(product, lang) {
  return {
    ...extractNumericFields(product),
    isNew: !!product.isNew,
    brand: extractTextField(product.brand),
    sku: extractTextField(product.sku),
    category: resolveLocalizedValue(product.category, lang) || 'Другое',
    image: extractTextField(product.image),
    active: product.active !== false,
  };
}

export function buildInitialForm(product, lang) {
  if (!product) return { ...EMPTY_FORM };

  const label = extractLocalizedField(product.label);
  const desc = extractLocalizedField(product.description);

  return {
    label_uk: label.uk, label_ru: label.ru, label_en: label.en,
    description_uk: desc.uk, description_ru: desc.ru, description_en: desc.en,
    ...extractProductScalars(product, lang),
  };
}

const isLabelEmpty = (form) => {
  const uk = (form.label_uk || '').trim();
  const ru = (form.label_ru || '').trim();
  const en = (form.label_en || '').trim();
  return !uk && !ru && !en;
};

const isPriceInvalid = (priceStr) => {
  const price = parseFloat(priceStr);
  return isNaN(price) || price <= 0;
};

export function validateForm(form, t) {
  const errors = {};
  if (isLabelEmpty(form)) {
    errors.label = t('adminProductsRequiredField');
  }
  if (isPriceInvalid(form.price)) {
    errors.price = t('adminProductsInvalidPrice');
  }
  return errors;
}

function resolveCategoryObject(formCategory) {
  const foundCat = getCategories().find((cat) => (cat.name.ru || cat.id) === formCategory);
  if (foundCat) return foundCat.name;
  return CATEGORY_TRANSLATIONS[formCategory] || { ru: formCategory, uk: formCategory, en: formCategory };
}

function getProductSubcategory(originalProduct) {
  return originalProduct?.subcategory || { ru: 'Все товары', uk: 'Всі товари', en: 'All Products' };
}

export function parseFormToProduct(form, originalProduct) {
  return {
    label: { uk: form.label_uk.trim(), ru: form.label_ru.trim(), en: form.label_en.trim() },
    description: { uk: form.description_uk.trim(), ru: form.description_ru.trim(), en: form.description_en.trim() },
    price: parseFloat(form.price) || 0,
    discountPercent: parseInt(form.discountPercent, 10) || 0,
    isNew: form.isNew,
    brand: form.brand.trim(),
    sku: form.sku.trim(),
    category: resolveCategoryObject(form.category),
    subcategory: getProductSubcategory(originalProduct),
    stock: parseInt(form.stock, 10) || 0,
    image: form.image.trim(),
    active: form.active,
  };
}
