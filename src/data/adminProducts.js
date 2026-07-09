/**
 * adminProducts.js
 *
 * Flat, mutable product list for the admin panel.
 * Seeded from the existing HIERARCHY data and enriched with
 * admin-specific fields: stock, sold, active, category.
 */

let _products = [
  {
    id: 'p-mat-01', label: 'Картридж 1RL 0.30мм', brand: 'CHEYENNE',
    price: 190, sku: 'CHN-1RL', discountPercent: 0, isNew: false,
    description: 'Стерильный картридж для тонких линий и прорисовки волосков.',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
    category: 'Иглы и картриджи', stock: 120, sold: 34, active: true,
  },
  {
    id: 'p-mat-02', label: 'Картридж 3RL 0.35мм', brand: 'CHEYENNE',
    price: 210, sku: 'CHN-3RL', discountPercent: 0, isNew: false,
    description: 'Стерильный картридж для четких контуров и тушевки.',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
    category: 'Иглы и картриджи', stock: 95, sold: 21, active: true,
  },
  {
    id: 'p-mat-07', label: 'Картридж 3RL 0.30мм', brand: 'CHEYENNE',
    price: 200, sku: 'CHN-3RL30', discountPercent: 15, isNew: true,
    description: 'Стерильный картридж для контура.',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
    category: 'Иглы и картриджи', stock: 60, sold: 8, active: true,
  },
  {
    id: 'p-mat-08', label: 'Картридж 5RL 0.35мм', brand: 'CHEYENNE',
    price: 220, sku: 'CHN-5RL', discountPercent: 10, isNew: false,
    description: 'Стерильный картридж для плотного закраса.',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
    category: 'Иглы и картриджи', stock: 80, sold: 17, active: true,
  },
  {
    id: 'p-mat-03', label: 'Клей для ресниц Ultra 0.5с', brand: 'BARBARA',
    price: 1450, sku: 'BBR-U5', discountPercent: 0, isNew: false,
    description: 'Моментальная сцепка 0.5 секунд, минимальные испарения.',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop',
    category: 'Клеи и ресницы', stock: 45, sold: 29, active: true,
  },
  {
    id: 'p-mat-04', label: 'Ресницы микс C 0.07', brand: 'LOVELY',
    price: 620, sku: 'LVL-C07', discountPercent: 0, isNew: false,
    description: 'Микс длин изгиба C толщиной 0.07 мм.',
    image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop',
    category: 'Клеи и ресницы', stock: 110, sold: 42, active: true,
  },
  {
    id: 'p-mat-09', label: 'Клей для ресниц Focus 1с', brand: 'BARBARA',
    price: 1380, sku: 'BBR-F1', discountPercent: 0, isNew: true,
    description: 'Сцепка 1 секунда, для мастеров со средним темпом работы.',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop',
    category: 'Клеи и ресницы', stock: 38, sold: 11, active: true,
  },
  {
    id: 'p-mat-10', label: 'Ресницы микс C 0.10', brand: 'LOVELY',
    price: 650, sku: 'LVL-C10', discountPercent: 20, isNew: false,
    description: 'Микс длин изгиба C толщиной 0.10 мм.',
    image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop',
    category: 'Клеи и ресницы', stock: 72, sold: 19, active: true,
  },
  {
    id: 'p-mat-05', label: 'База каучуковая 15мл', brand: 'KODI',
    price: 890, sku: 'KDI-RB15', discountPercent: 0, isNew: false,
    description: 'Эластичная каучуковая база для укрепления и выравнивания ногтей.',
    image: 'https://images.unsplash.com/photo-1632345031435-8797b2d58045?w=600&auto=format&fit=crop',
    category: 'Базы и топы', stock: 55, sold: 31, active: true,
  },
  {
    id: 'p-mat-06', label: 'Топ без липкого слоя 15мл', brand: 'KODI',
    price: 890, sku: 'KDI-TNL15', discountPercent: 0, isNew: false,
    description: 'Глянцевый финиш без липкого слоя.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
    category: 'Базы и топы', stock: 48, sold: 25, active: true,
  },
  {
    id: 'p-mat-11', label: 'Праймер бескислотный 10мл', brand: 'KODI',
    price: 540, sku: 'KDI-UB10', discountPercent: 25, isNew: true,
    description: 'Бескислотный праймер для лучшего сцепления базы с ногтем.',
    image: 'https://images.unsplash.com/photo-1632345031435-8797b2d58045?w=600&auto=format&fit=crop',
    category: 'Базы и топы', stock: 30, sold: 7, active: true,
  },
  {
    id: 'p-mat-12', label: 'Масло для кутикулы 15мл', brand: 'KODI',
    price: 350, sku: 'KDI-CO15', discountPercent: 0, isNew: true,
    description: 'Питательное масло для кутикулы с приятным ароматом.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
    category: 'Базы и топы', stock: 90, sold: 14, active: true,
  },
  {
    id: 'p-pig-01', label: 'Пигмент для бровей «Тёплый тауп»', brand: 'PERMA BLEND',
    price: 2900, sku: 'PMB-WT', discountPercent: 0, isNew: false,
    description: 'Стойкий гибридный пигмент теплого оттенка.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
    category: 'Пигменты для бровей', stock: 25, sold: 18, active: true,
  },
  {
    id: 'p-pig-02', label: 'Пигмент для бровей «Эспрессо»', brand: 'PERMA BLEND',
    price: 2900, sku: 'PMB-ESP', discountPercent: 0, isNew: false,
    description: 'Насыщенный темно-коричневый оттенок.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
    category: 'Пигменты для бровей', stock: 20, sold: 22, active: true,
  },
  {
    id: 'p-pig-04', label: 'Пигмент для бровей «Брюнет»', brand: 'PERMA BLEND',
    price: 2900, sku: 'PMB-BRN', discountPercent: 15, isNew: false,
    description: 'Темный холодный коричневый цвет для брюнеток.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
    category: 'Пигменты для бровей', stock: 15, sold: 9, active: true,
  },
  {
    id: 'p-pig-05', label: 'Пигмент для бровей «Блонд»', brand: 'PERMA BLEND',
    price: 2900, sku: 'PMB-BLD', discountPercent: 0, isNew: true,
    description: 'Светлый песочный оттенок для блондинок.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
    category: 'Пигменты для бровей', stock: 18, sold: 5, active: true,
  },
  {
    id: 'p-pig-03', label: 'Пигмент для губ «Розовый нюд»', brand: 'EVENTLO',
    price: 3200, sku: 'EVL-PN', discountPercent: 0, isNew: false,
    description: 'Естественный оттенок для нежного перманентного макияжа губ.',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop',
    category: 'Пигменты для губ', stock: 22, sold: 16, active: true,
  },
  {
    id: 'p-pig-06', label: 'Пигмент для губ «Малина»', brand: 'EVENTLO',
    price: 3200, sku: 'EVL-RASP', discountPercent: 30, isNew: false,
    description: 'Яркий сочный малиновый оттенок.',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop',
    category: 'Пигменты для губ', stock: 12, sold: 30, active: true,
  },
  {
    id: 'p-pig-07', label: 'Пигмент для губ «Пыльная роза»', brand: 'EVENTLO',
    price: 3200, sku: 'EVL-DR', discountPercent: 10, isNew: true,
    description: 'Классический припыленный розовый.',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop',
    category: 'Пигменты для губ', stock: 17, sold: 13, active: true,
  },
];

export function getAdminProducts() {
  return [..._products];
}

export function setAdminProducts(products) {
  _products = products;
}
