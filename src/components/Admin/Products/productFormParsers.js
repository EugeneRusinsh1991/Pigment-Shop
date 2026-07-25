const trimField = (val) => (val || '').trim();
const parsePrice = (price) => parseFloat(price) || 0;
const parsePct = (pct) => parseInt(pct, 10) || 0;
const parseStock = (stock) => parseInt(stock, 10) || 0;

export function parseFormToProduct(form) {
  const img1 = trimField(form.image1);
  const img2 = trimField(form.image2);
  const img3 = trimField(form.image3);
  const images = [img1, img2, img3].filter(Boolean);

  return {
    label: { uk: trimField(form.label.uk), ru: trimField(form.label.ru), en: trimField(form.label.en) },
    description: { uk: trimField(form.description.uk), ru: trimField(form.description.ru), en: trimField(form.description.en) },
    price: parsePrice(form.price),
    discountPercent: parsePct(form.discountPercent),
    isNew: form.isNew,
    brand: trimField(form.brand),
    sku: trimField(form.sku),
    stock: parseStock(form.stock),
    image: img1,
    images: images,
    active: form.active,
  };
}
