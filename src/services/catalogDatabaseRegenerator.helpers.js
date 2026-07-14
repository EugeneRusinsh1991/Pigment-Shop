const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop',
];

const LOCALE_NAMES = {
  ru: {
    essentials: 'Базы и топы',
    lashes: 'Клеи и ресницы',
    pigments: 'Пигменты для бровей',
    essentialsSub: 'Базовые наборы',
    lashesSub: 'Клеевые наборы',
    pigmentsSub: 'Палитры',
  },
  uk: {
    essentials: 'Бази та топи',
    lashes: 'Клеї та вії',
    pigments: 'Пігменти для брів',
    essentialsSub: 'Базові набори',
    lashesSub: 'Клейові набори',
    pigmentsSub: 'Палітри',
  },
  en: {
    essentials: 'Bases & Tops',
    lashes: 'Glues & Lashes',
    pigments: 'Brow Pigments',
    essentialsSub: 'Base Kits',
    lashesSub: 'Glue Kits',
    pigmentsSub: 'Palettes',
  },
};

export function toSlug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function buildLocalizedText(base, suffix) {
  return {
    ru: `${base.ru} ${suffix}`,
    uk: `${base.uk} ${suffix}`,
    en: `${base.en} ${suffix}`,
  };
}

export function buildProductTemplate({ topCategory, holderCategory, productHolderCategory, productIndex, productId, productOrdinal }) {
  const baseName = {
    ru: `${productHolderCategory.name.ru} ${productIndex}`,
    uk: `${productHolderCategory.name.uk} ${productIndex}`,
    en: `${productHolderCategory.name.en} ${productIndex}`,
  };

  const newProductOrdinals = new Set([2, 12, 22, 32, 42, 52, 62, 72]);
  const onSaleProductOrdinals = new Set([6, 12, 26, 36, 46, 56, 66, 76]);
  const isNew = newProductOrdinals.has(productOrdinal);
  const isOnSale = onSaleProductOrdinals.has(productOrdinal);
  const discountPercent = isOnSale ? 10 : 0;

  return {
    id: productId,
    label: {
      ru: baseName.ru,
      uk: baseName.uk,
      en: baseName.en,
    },
    brand: ['CHEYENNE', 'BARBARA', 'LOVELY'][productIndex % 3],
    price: 100 + productIndex * 45 + (topCategory.index + 1) * 15,
    sku: `${toSlug(topCategory.name.en).toUpperCase()}-${holderCategory.index + 1}${productHolderCategory.index + 1}${productIndex}`,
    discountPercent,
    isNew,
    description: {
      ru: `Плоский универсальный продукт для ${productHolderCategory.name.ru.toLowerCase()}.`,
      uk: `Плоский універсальний продукт для ${productHolderCategory.name.uk.toLowerCase()}.`,
      en: `A versatile staple for ${productHolderCategory.name.en.toLowerCase()}.`,
    },
    image: PRODUCT_IMAGES[productIndex % PRODUCT_IMAGES.length],
    category: topCategory.name,
    holderCategory: holderCategory.name,
    productHolderCategory: productHolderCategory.name,
    stock: 40 + topCategory.index * 10 + productIndex * 7,
    sold: 8 + productIndex * 3 + productHolderCategory.index,
    active: true,
  };
}

export function createDefaultCatalogDataset() {
  const topLevelConfigs = [
    {
      id: 'cat-essentials',
      name: LOCALE_NAMES.en.essentials,
      names: {
        ru: LOCALE_NAMES.ru.essentials,
        uk: LOCALE_NAMES.uk.essentials,
        en: LOCALE_NAMES.en.essentials,
      },
      description: {
        ru: 'Базовые товары для подготовки и завершения работы.',
        uk: 'Базові товари для підготовки та завершення роботи.',
        en: 'Core items for prep and finishing work.',
      },
      subcategories: [
        { id: 'cat-essentials-base', name: { ru: 'Базовые наборы', uk: 'Базові набори', en: 'Base kits' } },
        { id: 'cat-essentials-finish', name: { ru: 'Финишные решения', uk: 'Фінішні рішення', en: 'Finish solutions' } },
        { id: 'cat-essentials-essentials', name: { ru: 'Премиум наборы', uk: 'Преміум набори', en: 'Premium kits' } },
      ],
    },
    {
      id: 'cat-lashes',
      name: LOCALE_NAMES.en.lashes,
      names: {
        ru: LOCALE_NAMES.ru.lashes,
        uk: LOCALE_NAMES.uk.lashes,
        en: LOCALE_NAMES.en.lashes,
      },
      description: {
        ru: 'Клеи, ресницы и сопутствующие аксессуары.',
        uk: 'Клеї, вії та супутні аксесуари.',
        en: 'Glues, lashes, and supporting accessories.',
      },
      subcategories: [
        { id: 'cat-lashes-glue', name: { ru: 'Клеевые наборы', uk: 'Клейові набори', en: 'Glue kits' } },
        { id: 'cat-lashes-lashes', name: { ru: 'Ресничные наборы', uk: 'Вієві набори', en: 'Lash kits' } },
        { id: 'cat-lashes-kit', name: { ru: 'Профессиональные комплекты', uk: 'Професійні комплекти', en: 'Professional kits' } },
      ],
    },
    {
      id: 'cat-pigments',
      name: LOCALE_NAMES.en.pigments,
      names: {
        ru: LOCALE_NAMES.ru.pigments,
        uk: LOCALE_NAMES.uk.pigments,
        en: LOCALE_NAMES.en.pigments,
      },
      description: {
        ru: 'Пигменты для плотного и точного результата.',
        uk: 'Пігменти для щільного та точного результату.',
        en: 'Pigments for dense and precise results.',
      },
      subcategories: [
        { id: 'cat-pigments-palette', name: { ru: 'Палитры', uk: 'Палітри', en: 'Palettes' } },
        { id: 'cat-pigments-blend', name: { ru: 'Смеси', uk: 'Суміші', en: 'Blends' } },
        { id: 'cat-pigments-pro', name: { ru: 'Профессиональные серии', uk: 'Професійні серії', en: 'Professional series' } },
      ],
    },
  ];

  const categories = [];
  const products = [];

  topLevelConfigs.forEach((config, categoryIndex) => {
    const category = {
      id: config.id,
      parentId: null,
      type: 'category_holder',
      name: config.names,
      description: config.description,
      image: PRODUCT_IMAGES[categoryIndex % PRODUCT_IMAGES.length],
      depth: 1,
      productIds: [],
    };

    config.subcategories.forEach((holderConfig, holderIndex) => {
      const holder = {
        id: `${config.id}-holder-${holderIndex + 1}`,
        parentId: category.id,
        type: 'category_holder',
        name: holderConfig.name,
        description: {
          ru: `Холдер категории ${holderConfig.name.ru.toLowerCase()}.`,
          uk: `Холдер категорії ${holderConfig.name.uk.toLowerCase()}.`,
          en: `Holder category for ${holderConfig.name.en.toLowerCase()}.`,
        },
        image: PRODUCT_IMAGES[(categoryIndex + holderIndex) % PRODUCT_IMAGES.length],
        depth: 2,
        childCategoryIds: [],
      };

      for (let productHolderIndex = 0; productHolderIndex < 3; productHolderIndex += 1) {
        const productHolder = {
          id: `${holder.id}-ph-${productHolderIndex + 1}`,
          parentId: holder.id,
          type: 'product_holder',
          name: {
            ru: `${holderConfig.name.ru} ${productHolderIndex + 1}`,
            uk: `${holderConfig.name.uk} ${productHolderIndex + 1}`,
            en: `${holderConfig.name.en} ${productHolderIndex + 1}`,
          },
          description: {
            ru: `Подкатегория для продуктов ${holderConfig.name.ru.toLowerCase()}.`,
            uk: `Підкатегорія для продуктів ${holderConfig.name.uk.toLowerCase()}.`,
            en: `Product-holder for ${holderConfig.name.en.toLowerCase()}.`,
          },
          image: PRODUCT_IMAGES[(categoryIndex + holderIndex + productHolderIndex) % PRODUCT_IMAGES.length],
          depth: 3,
          productIds: [],
          index: productHolderIndex,
        };

        for (let productIndex = 1; productIndex <= 3; productIndex += 1) {
          const productId = `p-${toSlug(config.id)}-${holderIndex + 1}-${productHolderIndex + 1}-${productIndex}`;
          const productOrdinal = categoryIndex * 27 + holderIndex * 9 + productHolderIndex * 3 + productIndex;
          const product = buildProductTemplate({
            topCategory: { index: categoryIndex, name: config.names },
            holderCategory: { name: holder.name, index: holderIndex },
            productHolderCategory: { name: productHolder.name, index: productHolderIndex },
            productIndex,
            productId,
            productOrdinal,
          });
          products.push(product);
          productHolder.productIds.push(product.id);
        }

        holder.childCategoryIds.push(productHolder.id);
        categories.push(productHolder);
      }

      categories.push(holder);
    });

    categories.unshift(category);
  });

  return { categories, products };
}
