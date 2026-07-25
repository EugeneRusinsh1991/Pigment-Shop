import { PRODUCT_IMAGES } from './catalogSeedData.js';

export function toSlug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateLocalizedName(baseName) {
  return {
    ru: `${baseName} RU`,
    uk: `${baseName} UK`,
    en: `${baseName} EN`,
  };
}

function buildCategory(id, parentId, depth, baseName) {
  const cat = {
    id,
    parentId,
    type: depth === 3 ? 'product_holder' : 'category_holder',
    name: generateLocalizedName(baseName),
    description: generateLocalizedName(`Описание для ${baseName}`),
    image: PRODUCT_IMAGES[Math.floor(Math.random() * PRODUCT_IMAGES.length)],
    depth,
    index: parseInt(id.split('-').pop(), 10) || 0,
  };

  if (depth < 3) {
    cat.childCategoryIds = [];
  }
  if (depth === 1 || depth === 3) {
    cat.productIds = [];
  }

  return cat;
}

function buildProduct(id, topCategoryName, holderCategoryName, productHolderCategoryName, baseName) {
  return {
    id,
    label: generateLocalizedName(baseName),
    brand: ['CHEYENNE', 'BARBARA', 'LOVELY'][getRandomInt(0, 2)],
    price: getRandomInt(50, 1000),
    sku: `SKU-${id.toUpperCase()}`,
    discountPercent: 0,
    isNew: false,
    description: generateLocalizedName(`Универсальный продукт для ${baseName}`),
    image: PRODUCT_IMAGES[Math.floor(Math.random() * PRODUCT_IMAGES.length)],
    category: topCategoryName,
    holderCategory: holderCategoryName,
    productHolderCategory: productHolderCategoryName,
    stock: getRandomInt(0, 100),
    sold: getRandomInt(0, 50),
    active: true,
  };
}

function buildSubSubCategories(rootCat, subCat, r, s, ssCount, products, categories, isLow = false) {
  for (let ss = 0; ss < ssCount; ss++) {
    const subSubId = `${subCat.id}-sub-${ss}`;
    const subSubCat = buildCategory(subSubId, subCat.id, 3, `Group ${r + 1}-${s + 1}-${ss + 1}`);
    subCat.childCategoryIds.push(subSubId);
    categories.push(subSubCat);

    const prodCount = isLow ? 1 : getRandomInt(2, 4);
    for (let p = 0; p < prodCount; p++) {
      const prodId = `prod-${r + 1}-${s + 1}-${ss + 1}-${p + 1}`;
      const product = buildProduct(prodId, rootCat.name, subCat.name, subSubCat.name, `Product ${r + 1}-${s + 1}-${ss + 1}-${p + 1}`);
      products.push(product);
      subSubCat.productIds.push(prodId);
    }
  }
}

export function createRandomCatalogDataset(options = {}) {
  const isLow = options.mode === 'low';
  const categories = [];
  const products = [];

  const rootCount = isLow ? 2 : getRandomInt(2, 4);
  for (let r = 0; r < rootCount; r++) {
    const rootId = `cat-root-${r}`;
    const rootCat = buildCategory(rootId, null, 1, `Category ${r + 1}`);
    categories.push(rootCat);

    const subCount = isLow ? 2 : getRandomInt(2, 4);
    for (let s = 0; s < subCount; s++) {
      const subId = `${rootId}-sub-${s}`;
      const subCat = buildCategory(subId, rootId, 2, `Subcategory ${r + 1}-${s + 1}`);
      rootCat.childCategoryIds.push(subId);
      categories.push(subCat);

      const subSubCount = isLow ? 2 : getRandomInt(2, 4);
      buildSubSubCategories(rootCat, subCat, r, s, subSubCount, products, categories, isLow);
    }
  }

  // Randomly select products to be marked as new
  const newCount = Math.min(isLow ? 2 : getRandomInt(3, 8), products.length);
  const shuffledForNew = [...products].sort(() => 0.5 - Math.random());
  for (let i = 0; i < newCount; i++) {
    shuffledForNew[i].isNew = true;
  }

  // Randomly select products to be marked as discounted (independent)
  const discountCount = Math.min(isLow ? 2 : getRandomInt(3, 8), products.length);
  const shuffledForDiscount = [...products].sort(() => 0.5 - Math.random());
  for (let i = 0; i < discountCount; i++) {
    shuffledForDiscount[i].discountPercent = getRandomInt(5, 50);
  }

  return { categories, products };
}

function buildRandomOrder(user, products, index, isLow = false) {
  const orderProducts = [];
  const productCount = isLow ? getRandomInt(1, 2) : getRandomInt(2, 3);
  
  const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
  const selectedProducts = shuffledProducts.slice(0, Math.min(productCount, products.length));
  
  let totalPrice = 0;
  let totalItems = 0;
  
  selectedProducts.forEach(prod => {
    const qty = isLow ? getRandomInt(1, 2) : (getRandomInt(1, 5) === 5 ? getRandomInt(5, 20) : getRandomInt(1, 4));
    orderProducts.push({
      id: prod.id,
      label: prod.label,
      price: prod.price,
      qty,
      image: prod.image,
    });
    totalPrice += prod.price * qty;
    totalItems += qty;
  });

  const randomMsAgo = getRandomInt(0, 14 * 24 * 60 * 60 * 1000);
  const createdAt = new Date(Date.now() - randomMsAgo);

  return {
    id: `order-${user.uid}-${Date.now()}-${index}`,
    userId: user.uid,
    status: ['Новый заказ', 'В обработке', 'Выполнен', 'Отменен'][getRandomInt(0, 3)],
    createdAt,
    items: orderProducts,
    totalPrice,
    totalItems,
    customerInfo: {
      email: user.email || `user${user.uid}@example.com`,
      firstName: user.firstName || 'Test',
      lastName: user.lastName || 'User',
      phone: user.phone || '+380990000000',
      city: user.city || 'Kyiv',
    }
  };
}

export function generateOrdersDataset(users, products, options = {}) {
  const isLow = options.mode === 'low';
  const orders = [];
  
  if (!products || products.length === 0) return orders;

  users.forEach((user) => {
    const orderCount = isLow ? getRandomInt(1, 2) : getRandomInt(10, 20);
    for (let i = 0; i < orderCount; i++) {
      orders.push(buildRandomOrder(user, products, i, isLow));
    }
  });

  return orders;
}
