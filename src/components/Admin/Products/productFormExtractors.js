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

export function extractLocalizedField(val) {
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

function extractImageFields(product) {
  const images = product?.images || [];
  const primary = product?.image || '';
  return {
    image1: extractTextField(images[0] || primary),
    image2: extractTextField(images[1]),
    image3: extractTextField(images[2]),
  };
}

export function extractProductScalars(product) {
  return {
    ...extractNumericFields(product),
    isNew: !!product.isNew,
    brand: extractTextField(product.brand),
    sku: extractTextField(product.sku),
    ...extractImageFields(product),
    active: product.active !== false,
  };
}
