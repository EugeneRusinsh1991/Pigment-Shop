import {
  CATEGORY_DICTIONARIES,
  CATEGORY_IMAGE_POOL,
  PRODUCT_IMAGE_POOL,
  PRODUCT_IMAGES,
  BRAND_NAMES,
  PRODUCT_TEMPLATES,
  REVIEW_TEMPLATES,
  QUESTION_TEMPLATES,
  CUSTOMER_NOTES,
  ORDER_ADMIN_NOTES,
  USER_ADMIN_NOTES,
  SUPPORT_MESSAGE_TEMPLATES,
} from './catalogSeedData.js';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Resolves a category image deterministically ensuring distinct and category-matched assignment.
 *
 * @param {Object} category
 * @param {number} index
 * @param {Array<string>} [pool=CATEGORY_IMAGE_POOL]
 * @returns {string}
 */
export function resolveCategoryImage(category, index = 0, pool = CATEGORY_IMAGE_POOL) {
  if (category?.image) return category.image;
  const imageList = Array.isArray(pool) && pool.length > 0 ? pool : CATEGORY_IMAGE_POOL;
  if (!imageList || imageList.length === 0) return '';
  const hash = String(category?.id || category?.tag || index).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return imageList[(hash + index) % imageList.length];
}

/**
 * Resolves distinct, category-aligned product images for a product item.
 *
 * @param {Object} template
 * @param {Object} holder
 * @param {number} index
 * @param {Array<string>} [productPool=PRODUCT_IMAGE_POOL]
 * @param {Array<string>} [categoryPool=CATEGORY_IMAGE_POOL]
 * @param {Object} [mediaPoolObj=null]
 * @returns {Array<string>}
 */
export function resolveProductImages(template, holder, index = 0, productPool = PRODUCT_IMAGE_POOL, categoryPool = CATEGORY_IMAGE_POOL, mediaPoolObj = null) {
  if (Array.isArray(template?.images) && template.images.length > 0) {
    return template.images.filter(Boolean);
  }

  const tag = template?.categoryTag || template?.templateKey || holder?.tag || '';
  let candidatePool = [];
  if (mediaPoolObj?.categories && tag) {
    for (const [catKey, urls] of Object.entries(mediaPoolObj.categories)) {
      if (tag.toLowerCase().includes(catKey.toLowerCase()) || catKey.toLowerCase().includes(tag.toLowerCase())) {
        candidatePool = urls;
        break;
      }
    }
  }

  const pool = candidatePool.length > 0
    ? candidatePool
    : (Array.isArray(productPool) && productPool.length > 0 ? productPool : categoryPool);

  if (!pool || pool.length === 0) {
    return [PRODUCT_IMAGE_POOL[0] || CATEGORY_IMAGE_POOL[0] || ''];
  }

  const seed = (String(holder?.id || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) + index * 3) % pool.length;
  const img1 = pool[seed % pool.length];
  const img2 = pool[(seed + 1) % pool.length];
  const img3 = pool[(seed + 2) % pool.length];

  const unique = [...new Set([img1, img2, img3].filter(Boolean))];
  return unique.length > 0 ? unique : [pool[0]];
}

export function generateCategoryHierarchy(rootCount = 4, customMediaPool = null) {
  const categories = [];
  const holders = [];
  const categoryMap = {};

  const totalRoots = Math.max(1, Number(rootCount) || 4);
  const catPool = customMediaPool?.categoryImages || CATEGORY_IMAGE_POOL;

  for (let r = 0; r < totalRoots; r++) {
    const dictRoot = CATEGORY_DICTIONARIES[r % CATEGORY_DICTIONARIES.length];
    const rootId = `cat-root-${r}`;

    const rootCat = {
      id: rootId,
      parentId: null,
      type: 'category_holder',
      depth: 1,
      index: r,
      tag: dictRoot.tag || 'general',
      name: { ...dictRoot.name },
      description: { ...dictRoot.description },
      image: dictRoot.image || resolveCategoryImage(dictRoot, r, catPool),
      childCategoryIds: [],
    };

    categories.push(rootCat);
    categoryMap[rootId] = rootCat;

    const availableSubs = dictRoot.subcategories || [];
    const subCount = Math.min(Math.max(availableSubs.length, 2), 4);

    for (let s = 0; s < subCount; s++) {
      const dictSub = availableSubs[s % availableSubs.length] || {
        name: { uk: `Підкатегорія ${r + 1}-${s + 1}`, ru: `Подкатегория ${r + 1}-${s + 1}`, en: `Subcategory ${r + 1}-${s + 1}` },
        description: { uk: `Опис ${r + 1}-${s + 1}`, ru: `Описание ${r + 1}-${s + 1}`, en: `Description ${r + 1}-${s + 1}` },
      };

      const subId = `${rootId}-sub-${s}`;
      const subCat = {
        id: subId,
        parentId: rootId,
        type: 'category_holder',
        depth: 2,
        index: s,
        tag: dictSub.tag || dictRoot.tag || 'general',
        name: { ...dictSub.name },
        description: { ...dictSub.description },
        image: dictSub.image || resolveCategoryImage(dictSub, r * 10 + s + 1, catPool),
        childCategoryIds: [],
      };

      rootCat.childCategoryIds.push(subId);
      categories.push(subCat);
      categoryMap[subId] = subCat;

      const availableHolders = dictSub.holders || [];
      const holderCount = Math.min(Math.max(availableHolders.length, 2), 4);

      for (let h = 0; h < holderCount; h++) {
        const dictHolder = availableHolders[h % availableHolders.length] || {
          name: { uk: `Група ${r + 1}-${s + 1}-${h + 1}`, ru: `Группа ${r + 1}-${s + 1}-${h + 1}`, en: `Group ${r + 1}-${s + 1}-${h + 1}` },
          description: { uk: `Опис групи ${r + 1}-${s + 1}-${h + 1}`, ru: `Описание группы ${r + 1}-${s + 1}-${h + 1}`, en: `Description ${r + 1}-${s + 1}-${h + 1}` },
        };

        const holderId = `${subId}-holder-${h}`;
        const holderCat = {
          id: holderId,
          parentId: subId,
          type: 'product_holder',
          depth: 3,
          index: h,
          tag: dictHolder.tag || dictSub.tag || dictRoot.tag || 'general',
          name: { ...dictHolder.name },
          description: { ...dictHolder.description },
          image: dictHolder.image || resolveCategoryImage(dictHolder, r * 100 + s * 10 + h + 2, catPool),
          productIds: [],
          _rootName: rootCat.name,
          _subName: subCat.name,
        };

        subCat.childCategoryIds.push(holderId);
        categories.push(holderCat);
        holders.push(holderCat);
        categoryMap[holderId] = holderCat;
      }
    }
  }

  return { categories, holders, categoryMap };
}

export function generateProductsForHolders(holders, options = {}) {
  const products = [];
  const isLow = options.mode === 'low';
  const mediaPoolObj = options.mediaPool || null;
  const productPool = mediaPoolObj?.productImages || PRODUCT_IMAGE_POOL;
  const categoryPool = mediaPoolObj?.categoryImages || CATEGORY_IMAGE_POOL;
  let globalProdIdx = 0;

  for (const holder of holders) {
    const prodCount = isLow ? 1 : getRandomInt(2, 4);

    for (let p = 0; p < prodCount; p++) {
      const template = PRODUCT_TEMPLATES[globalProdIdx % PRODUCT_TEMPLATES.length];
      globalProdIdx++;

      const prodId = `prod-${holder.id}-${p + 1}`;
      const [minPrice, maxPrice] = template.priceRange || [300, 1500];
      const price = getRandomInt(minPrice, maxPrice);
      const stock = Math.random() < 0.1 ? 0 : getRandomInt(1, 100);
      const sold = getRandomInt(0, 50);
      const isDiscounted = Math.random() < 0.3;
      const discountPercent = isDiscounted ? getRandomInt(5, 40) : 0;
      const isNew = Math.random() < 0.3;

      const finalImages = resolveProductImages(template, holder, globalProdIdx, productPool, categoryPool, mediaPoolObj);

      const product = {
        id: prodId,
        label: { ...template.label },
        description: { ...template.description },
        brand: template.brand || BRAND_NAMES[getRandomInt(0, BRAND_NAMES.length - 1)],
        price,
        stock,
        sold,
        discountPercent,
        isNew,
        sku: `SKU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        image: finalImages[0],
        images: [...finalImages],
        categoryId: holder.id,
        category: holder._rootName || holder.name,
        holderCategory: holder._subName || holder.name,
        productHolderCategory: holder.name,
        active: true,
        categoryTag: template.categoryTag || template.templateKey || '',
      };

      if (!holder.productIds) {
        holder.productIds = [];
      }
      holder.productIds.push(prodId);
      products.push(product);
    }

    delete holder._rootName;
    delete holder._subName;
  }

  return products;
}

export function generateProductActivity(products, existingUsers = []) {
  const fallbackUsers = [
    { uid: 'u-1', firstName: 'Олена', lastName: 'Коваль' },
    { uid: 'u-2', firstName: 'Марина', lastName: 'Ткаченко' },
    { uid: 'u-3', firstName: 'Анна', lastName: 'Шевченко' },
  ];

  const usersPool = Array.isArray(existingUsers) && existingUsers.length > 0
    ? existingUsers
    : fallbackUsers;

  const productActivity = {};
  let reviewIdx = 0;
  let questionIdx = 0;

  for (const prod of products) {
    const reviews = [];
    const questions = [];

    const reviewCount = getRandomInt(1, 3);
    for (let r = 0; r < reviewCount; r++) {
      const template = REVIEW_TEMPLATES[reviewIdx % REVIEW_TEMPLATES.length];
      reviewIdx++;

      const user = usersPool[getRandomInt(0, usersPool.length - 1)];
      const authorName = [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Покупець';
      const daysAgo = getRandomInt(0, 30);
      const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

      reviews.push({
        id: `rev-${prod.id}-${r + 1}`,
        author: authorName,
        userId: user.uid || user.id || `user-${r}`,
        rating: template.rating,
        comment: template.comment,
        createdAt,
        date: createdAt.toISOString().split('T')[0],
      });
    }

    const hasQuestion = Math.random() < 0.6;
    if (hasQuestion) {
      const qTemplate = QUESTION_TEMPLATES[questionIdx % QUESTION_TEMPLATES.length];
      questionIdx++;

      const user = usersPool[getRandomInt(0, usersPool.length - 1)];
      const authorName = [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Майстер';
      const daysAgo = getRandomInt(0, 30);
      const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

      questions.push({
        id: `q-${prod.id}-1`,
        author: authorName,
        userId: user.uid || user.id || 'user-guest',
        comment: qTemplate.comment,
        createdAt,
        date: createdAt.toISOString().split('T')[0],
      });
    }

    productActivity[prod.id] = { reviews, questions };
  }

  return productActivity;
}

function generateLocalizedName(baseName) {
  return {
    ru: `${baseName} RU`,
    uk: `${baseName} UK`,
    en: `${baseName} EN`,
  };
}

function buildCategory(id, parentId, depth, baseName) {
  const idx = parseInt(id.split('-').pop(), 10) || 0;
  const cat = {
    id,
    parentId,
    type: depth === 3 ? 'product_holder' : 'category_holder',
    name: generateLocalizedName(baseName),
    description: generateLocalizedName(`Описание для ${baseName}`),
    image: resolveCategoryImage({ id }, idx),
    depth,
    index: idx,
  };

  if (depth < 3) {
    cat.childCategoryIds = [];
  }
  if (depth === 1 || depth === 3) {
    cat.productIds = [];
  }

  return cat;
}

function buildProduct(id, topCategoryName, holderCategoryName, productHolderCategoryName, baseName, categoryId = null) {
  const prodIdx = parseInt(id.split('-').pop(), 10) || 0;
  const resolvedImages = resolveProductImages({}, { id: categoryId }, prodIdx);
  return {
    id,
    label: generateLocalizedName(baseName),
    brand: ['CHEYENNE', 'BARBARA', 'LOVELY'][getRandomInt(0, 2)],
    price: getRandomInt(50, 1000),
    sku: `SKU-${id.toUpperCase()}`,
    discountPercent: 0,
    isNew: false,
    description: generateLocalizedName(`Универсальный продукт для ${baseName}`),
    image: resolvedImages[0],
    images: [...resolvedImages],
    categoryId,
    category: topCategoryName,
    holderCategory: holderCategoryName,
    productHolderCategory: productHolderCategoryName,
    stock: getRandomInt(0, 100),
    sold: getRandomInt(0, 50),
    active: true,
  };
}

function buildProductsForSubSub(subSubCat, r, s, ss, products, isLow) {
  const prodCount = isLow ? 1 : getRandomInt(2, 4);
  if (!subSubCat.productIds) {
    subSubCat.productIds = [];
  }
  for (let p = 0; p < prodCount; p++) {
    const prodId = `prod-${r + 1}-${s + 1}-${ss + 1}-${p + 1}`;
    const product = buildProduct(
      prodId,
      subSubCat._rootName,
      subSubCat._subName,
      subSubCat.name,
      `Product ${r + 1}-${s + 1}-${ss + 1}-${p + 1}`,
      subSubCat.id,
    );
    products.push(product);
    subSubCat.productIds.push(prodId);
  }
}

function buildSubSubCategories(rootCat, subCat, r, s, ssCount, products, categories, isLow = false) {
  for (let ss = 0; ss < ssCount; ss++) {
    const subSubId = `${subCat.id}-sub-${ss}`;
    const subSubCat = buildCategory(subSubId, subCat.id, 3, `Group ${r + 1}-${s + 1}-${ss + 1}`);
    subSubCat._rootName = rootCat.name;
    subSubCat._subName = subCat.name;
    subCat.childCategoryIds.push(subSubId);
    categories.push(subSubCat);
    buildProductsForSubSub(subSubCat, r, s, ss, products, isLow);
    delete subSubCat._rootName;
    delete subSubCat._subName;
  }
}

function markRandomProducts(products, count, applyMark) {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    applyMark(shuffled[i]);
  }
}

function _buildRootCategory(r, isLow, categories, products) {
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

export function createRandomCatalogDataset(options = {}) {
  const isLow = options.mode === 'low';
  const categories = [];
  const products = [];

  const rootCount = isLow ? 2 : getRandomInt(2, 4);
  for (let r = 0; r < rootCount; r++) {
    _buildRootCategory(r, isLow, categories, products);
  }

  const newCount = isLow ? 2 : getRandomInt(3, 8);
  markRandomProducts(products, newCount, (p) => { p.isNew = true; });

  const discountCount = isLow ? 2 : getRandomInt(3, 8);
  markRandomProducts(products, discountCount, (p) => { p.discountPercent = getRandomInt(5, 50); });

  return { categories, products };
}

function getRandomQty(isLow) {
  if (isLow) return getRandomInt(1, 2);
  return getRandomInt(1, 5) === 5 ? getRandomInt(5, 20) : getRandomInt(1, 4);
}

function buildOrderItems(products, productCount, isLow) {
  const selected = [...products].sort(() => 0.5 - Math.random()).slice(0, Math.min(productCount, products.length));
  let totalPrice = 0;
  let totalItems = 0;
  const items = selected.map((prod) => {
    const qty = getRandomQty(isLow);
    totalPrice += prod.price * qty;
    totalItems += qty;
    return { id: prod.id, label: prod.label, price: prod.price, qty, image: prod.image };
  });
  return { items, totalPrice, totalItems };
}

const GUEST_CUSTOMERS = [
  { firstName: 'Ірина', lastName: 'Шевченко', email: 'guest.iryna@gmail.com', phone: '+380501112233', city: 'Київ' },
  { firstName: 'Катерина', lastName: 'Бондар', email: 'guest.kate@gmail.com', phone: '+380672223344', city: 'Львів' },
  { firstName: 'Марія', lastName: 'Лисенко', email: 'guest.maria@gmail.com', phone: '+380933334455', city: 'Одеса' },
  { firstName: 'Світлана', lastName: 'Кравчук', email: 'guest.sveta@gmail.com', phone: '+380994445566', city: 'Дніпро' },
  { firstName: 'Анастасія', lastName: 'Поліщук', email: 'guest.nastya@gmail.com', phone: '+380685556677', city: 'Харків' },
];

function buildCustomerInfo(user) {
  const profile = user?.profile || {};
  return {
    email: user?.email || profile.email || `user${user?.uid || 'guest'}@example.com`,
    firstName: user?.firstName || profile.firstName || 'Тест',
    lastName: user?.lastName || profile.lastName || 'Користувач',
    phone: user?.phone || profile.phone || '+380990000000',
    city: user?.city || profile.city || 'Київ',
  };
}

function buildRandomOrder(userOrGuest, products, index, isGuest = false, isLow = false) {
  const productCount = isLow ? 1 : getRandomInt(1, 4);
  const { items, totalPrice, totalItems } = buildOrderItems(products, productCount, isLow);
  const daysAgo = getRandomInt(0, 30);
  const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

  const statuses = ['Выполнен', 'В обработке', 'Новый заказ', 'Отменен'];
  const status = statuses[getRandomInt(0, statuses.length - 1)];

  const hasNote = Math.random() < 0.25;
  const note = hasNote
    ? CUSTOMER_NOTES[getRandomInt(0, CUSTOMER_NOTES.length - 1)].uk
    : '';

  const hasAdminNote = Math.random() < 0.2;
  const adminNote = hasAdminNote
    ? ORDER_ADMIN_NOTES[getRandomInt(0, ORDER_ADMIN_NOTES.length - 1)].uk
    : '';

  const customerInfo = isGuest ? userOrGuest : buildCustomerInfo(userOrGuest);
  const userId = isGuest ? null : (userOrGuest.uid || userOrGuest.id || null);

  return {
    id: `order-${userId || 'guest'}-${Date.now().toString(36)}-${index}`,
    userId,
    isGuestOrder: isGuest,
    status,
    createdAt,
    items,
    totalPrice,
    totalItems,
    customerInfo,
    note,
    adminNote,
  };
}

export function generateOrdersDataset(arg1, arg2, options = {}) {
  const isLow = options.mode === 'low';
  let users = [];
  let products = [];

  if (Array.isArray(arg1) && arg1.length > 0 && (arg1[0].stock !== undefined || arg1[0].sku !== undefined || arg1[0].brand !== undefined)) {
    products = arg1;
    users = Array.isArray(arg2) ? arg2 : [];
  } else {
    users = Array.isArray(arg1) ? arg1 : [];
    products = Array.isArray(arg2) ? arg2 : [];
  }

  if (!products || products.length === 0) return [];

  const orders = [];
  let orderSeq = 0;

  users.forEach((user) => {
    const orderCount = isLow ? getRandomInt(1, 2) : getRandomInt(20, 30);
    for (let i = 0; i < orderCount; i++) {
      orderSeq++;
      orders.push(buildRandomOrder(user, products, orderSeq, false, isLow));
    }
  });

  const guestCount = isLow ? getRandomInt(1, 2) : getRandomInt(10, 20);
  for (let g = 0; g < guestCount; g++) {
    orderSeq++;
    const guestCustomer = GUEST_CUSTOMERS[g % GUEST_CUSTOMERS.length];
    orders.push(buildRandomOrder(guestCustomer, products, orderSeq, true, isLow));
  }

  return orders;
}

export function generateSupportAndNotes(existingUsers = [], options = {}) {
  const isLow = options.mode === 'low';
  const fallbackUsers = [
    { uid: 'u-1', email: 'elena@gmail.com', firstName: 'Олена', lastName: 'Коваль' },
    { uid: 'u-2', email: 'marina@gmail.com', firstName: 'Марина', lastName: 'Ткаченко' },
  ];

  const usersPool = Array.isArray(existingUsers) && existingUsers.length > 0
    ? existingUsers
    : fallbackUsers;

  const supportMessages = [];
  const msgCount = isLow ? 2 : getRandomInt(5, 15);

  for (let i = 0; i < msgCount; i++) {
    const template = SUPPORT_MESSAGE_TEMPLATES[i % SUPPORT_MESSAGE_TEMPLATES.length];
    const isGuest = Math.random() < 0.4;
    const user = isGuest ? null : usersPool[getRandomInt(0, usersPool.length - 1)];
    const guestCustomer = GUEST_CUSTOMERS[i % GUEST_CUSTOMERS.length];

    const email = isGuest ? guestCustomer.email : (user.email || 'user@example.com');
    const userId = isGuest ? null : (user.uid || user.id || null);
    const daysAgo = getRandomInt(0, 30);
    const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    supportMessages.push({
      id: `msg-${Date.now().toString(36)}-${i + 1}`,
      userId,
      email,
      subject: template.subject.uk,
      text: template.text.uk,
      createdAt,
    });
  }

  const adminNotes = [];
  usersPool.forEach((user, idx) => {
    const template = USER_ADMIN_NOTES[idx % USER_ADMIN_NOTES.length];
    const userId = user.uid || user.id || `user-${idx}`;
    adminNotes.push({
      id: userId,
      userId,
      note: template.uk,
      updatedAt: new Date(),
    });
  });

  return { supportMessages, adminNotes };
}
