/**
 * productFormConstants.js
 *
 * Static constants for the product create/edit form.
 */

export const CATEGORY_TRANSLATIONS = {
  'Иглы и картриджи': {
    ru: 'Иглы и картриджи',
    uk: 'Голки та картриджі',
    en: 'Needles & Cartridges',
  },
  'Клеи и ресницы': {
    ru: 'Клеи и ресницы',
    uk: 'Клеї та вії',
    en: 'Glues & Lashes',
  },
  'Базы и топы': {
    ru: 'Базы и топы',
    uk: 'Бази та топи',
    en: 'Bases & Tops',
  },
  'Пигменты для бровей': {
    ru: 'Пигменты для бровей',
    uk: 'Пігменти для брів',
    en: 'Eyebrow Pigments',
  },
  'Пигменты для губ': {
    ru: 'Пигменты для губ',
    uk: 'Пігменти для губ',
    en: 'Lip Pigments',
  },
  'Другое': {
    ru: 'Другое',
    uk: 'Інше',
    en: 'Other',
  },
};

export const EMPTY_FORM = {
  label_uk: '',
  label_ru: '',
  label_en: '',
  description_uk: '',
  description_ru: '',
  description_en: '',
  price: '',
  discountPercent: '',
  isNew: false,
  brand: '',
  sku: '',
  category: 'Другое',
  stock: '',
  image1: '',
  image2: '',
  image3: '',
  active: true,
};
