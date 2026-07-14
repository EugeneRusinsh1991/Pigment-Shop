/**
 * productFormLogic.js
 *
 * Re-exports form initialization, validation, and serialization.
 */
import { EMPTY_FORM } from './productFormConstants';
import { extractLocalizedField, extractProductScalars } from './productFormExtractors';

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
const isLabelEmpty = ({ label_uk, label_ru, label_en }) => 
  ![label_uk, label_ru, label_en].some(label => label?.trim());

const isPriceInvalid = (priceStr) => {
  const price = parseFloat(priceStr);
  return isNaN(price) || price <= 0;
};

const RULES = [
  { field: 'label', isInvalid: isLabelEmpty, errorKey: 'adminProductsRequiredField' },
  { field: 'price', isInvalid: form => isPriceInvalid(form.price), errorKey: 'adminProductsInvalidPrice' },
  { field: 'image1', isInvalid: form => !form.image1?.trim(), errorKey: 'adminProductsRequiredField' }
];

export function validateForm(form, t) {
  return RULES.reduce((errors, rule) => {
    if (rule.isInvalid(form)) {
      errors[rule.field] = t(rule.errorKey);
    }
    return errors;
  }, {});
}
import { parseFormToProduct } from './productFormParsers';

export { parseFormToProduct };
