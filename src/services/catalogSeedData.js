export const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop',
];

export const SEED_BANNERS = PRODUCT_IMAGES.slice(0, 2);

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

export const topLevelConfigs = [
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
