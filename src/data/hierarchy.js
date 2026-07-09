export const LEVEL_NAMES = [
  'Catalog',        // 0
  'Category',       // 1
  'Product',        // 2
];

export const HIERARCHY = [
  {
    id: 'cat-materials',
    label: 'Материалы',
    labelEn: 'Materials',
    icon: '💄',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop',
    description: 'Расходники и инструменты для бьюти-мастеров',
    children: [
      {
        id: 'subcat-pm',
        label: 'Перманентный макияж',
        labelEn: 'Permanent Makeup',
        image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
        description: 'Все для перманентного макияжа',
        children: [
          {
            id: 'subsubcat-needles',
            label: 'Иглы и картриджи',
            labelEn: 'Needles & Cartridges',
            image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
            description: 'Стерильные иглы и картриджи премиум-класса',
            children: [
              {
                id: 'p-mat-01',
                label: 'Картридж 1RL 0.30мм',
                labelEn: 'Cartridge 1RL 0.30mm',
                brand: 'CHEYENNE',
                price: 190,
                sku: 'CHN-1RL',
                inStock: true,
                description: 'Стерильный картридж для тонких линий и прорисовки волосков.',
                descriptionEn: 'Sterile cartridge for fine lines and hair strokes.',
                image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
                reviews: [
                  { id: 'r1', author: '123123', rating: 4, comment: 'sadsadsad', date: '08.07.2026' },
                  { id: 'r2', author: 'asdsad', rating: 3, comment: '213123', date: '08.07.2026' },
                ]
              },
              {
                id: 'p-mat-02',
                label: 'Картридж 3RL 0.35мм',
                labelEn: 'Cartridge 3RL 0.35mm',
                brand: 'CHEYENNE',
                price: 210,
                sku: 'CHN-3RL',
                inStock: true,
                description: 'Стерильный картридж для четких контуров и тушевки.',
                descriptionEn: 'Sterile cartridge for sharp outlines and shading.',
                image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
                reviews: [
                  { id: 'r1', author: 'Анна', rating: 5, comment: 'Отличные картриджи для работы.', date: '07.07.2026' }
                ]
              },
              {
                id: 'p-mat-07',
                label: 'Картридж 3RL 0.30мм',
                labelEn: 'Cartridge 3RL 0.30mm',
                brand: 'CHEYENNE',
                price: 200,
                sku: 'CHN-3RL30',
                inStock: true,
                isNew: true,
                discountPercent: 15,
                description: 'Стерильный картридж для контура.',
                descriptionEn: 'Sterile cartridge for contour.',
                image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
                reviews: []
              },
              {
                id: 'p-mat-08',
                label: 'Картридж 5RL 0.35мм',
                labelEn: 'Cartridge 5RL 0.35mm',
                brand: 'CHEYENNE',
                price: 220,
                sku: 'CHN-5RL',
                inStock: true,
                discountPercent: 10,
                description: 'Стерильный картридж для плотного закраса.',
                descriptionEn: 'Sterile cartridge for solid coloring.',
                image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&auto=format&fit=crop',
                reviews: []
              }
            ]
          }
        ]
      },
      {
        id: 'subcat-lashes',
        label: 'Наращивание ресниц',
        labelEn: 'Lash Extensions',
        image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop',
        description: 'Материалы для наращивания ресниц',
        children: [
          {
            id: 'subsubcat-lashes-supplies',
            label: 'Клеи и ресницы',
            labelEn: 'Glues & Lashes',
            image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop',
            description: 'Профессиональные клеи и ресницы для объемов',
            children: [
              {
                id: 'p-mat-03',
                label: 'Клей для ресниц Ultra 0.5с',
                labelEn: 'Eyelash Glue Ultra 0.5s',
                brand: 'BARBARA',
                price: 1450,
                sku: 'BBR-U5',
                inStock: true,
                description: 'Моментальная сцепка 0.5 секунд, минимальные испарения.',
                descriptionEn: 'Instant 0.5-second bonding, minimal fumes.',
                image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop',
                reviews: []
              },
              {
                id: 'p-mat-04',
                label: 'Ресницы микс C 0.07',
                labelEn: 'Lashes Mix C 0.07',
                brand: 'LOVELY',
                price: 620,
                sku: 'LVL-C07',
                inStock: true,
                description: 'Микс длин изгиба C толщиной 0.07 мм для объемного наращивания.',
                descriptionEn: 'Mix of C curl lengths, 0.07 mm thickness for volume extension.',
                image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop',
                reviews: []
              },
              {
                id: 'p-mat-09',
                label: 'Клей для ресниц Focus 1с',
                labelEn: 'Eyelash Glue Focus 1s',
                brand: 'BARBARA',
                price: 1380,
                sku: 'BBR-F1',
                inStock: true,
                isNew: true,
                description: 'Сцепка 1 секунда, для мастеров со средним темпом работы.',
                descriptionEn: '1-second bonding, for average speed lash artists.',
                image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop',
                reviews: []
              },
              {
                id: 'p-mat-10',
                label: 'Ресницы микс C 0.10',
                labelEn: 'Lashes Mix C 0.10',
                brand: 'LOVELY',
                price: 650,
                sku: 'LVL-C10',
                inStock: true,
                discountPercent: 20,
                description: 'Микс длин изгиба C толщиной 0.10 мм для классического наращивания.',
                descriptionEn: 'Mix of C curl lengths, 0.10 mm thickness for classic extension.',
                image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&auto=format&fit=crop',
                reviews: []
              }
            ]
          }
        ]
      },
      {
        id: 'subcat-nails',
        label: 'Ногтевой сервис',
        labelEn: 'Nail Service',
        image: 'https://images.unsplash.com/photo-1632345031435-8797b2d58045?w=600&auto=format&fit=crop',
        description: 'Материалы для ногтевого сервиса',
        children: [
          {
            id: 'subsubcat-nails-base-top',
            label: 'Базы и топы',
            labelEn: 'Bases & Tops',
            image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
            description: 'Качественные базы, топы и финиши для ногтей',
            children: [
              {
                id: 'p-mat-05',
                label: 'База каучуковая 15мл',
                labelEn: 'Rubber Base 15ml',
                brand: 'KODI',
                price: 890,
                sku: 'KDI-RB15',
                inStock: true,
                description: 'Эластичная каучуковая база для укрепления и выравнивания ногтей.',
                descriptionEn: 'Elastic rubber base for nail strengthening and leveling.',
                image: 'https://images.unsplash.com/photo-1632345031435-8797b2d58045?w=600&auto=format&fit=crop',
                reviews: []
              },
              {
                id: 'p-mat-06',
                label: 'Топ без липкого слоя 15мл',
                labelEn: 'Top No Sticky 15ml',
                brand: 'KODI',
                price: 890,
                sku: 'KDI-TNL15',
                inStock: true,
                description: 'Глянцевый финиш без липкого слоя для стойкого маникюра.',
                descriptionEn: 'Glossy finish without sticky layer for long-lasting manicure.',
                image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
                reviews: []
              },
              {
                id: 'p-mat-11',
                label: 'Праймер бескислотный 10мл',
                labelEn: 'Ultrabond Acid-Free Primer 10ml',
                brand: 'KODI',
                price: 540,
                sku: 'KDI-UB10',
                inStock: true,
                isNew: true,
                discountPercent: 25,
                description: 'Бескислотный праймер для лучшего сцепления базы с ногтем.',
                descriptionEn: 'Acid-free primer for superior base adhesion.',
                image: 'https://images.unsplash.com/photo-1632345031435-8797b2d58045?w=600&auto=format&fit=crop',
                reviews: []
              },
              {
                id: 'p-mat-12',
                label: 'Масло для кутикулы 15мл',
                labelEn: 'Cuticle Oil 15ml',
                brand: 'KODI',
                price: 350,
                sku: 'KDI-CO15',
                inStock: true,
                isNew: true,
                description: 'Питательное масло для кутикулы с приятным ароматом.',
                descriptionEn: 'Nourishing cuticle oil with a pleasant scent.',
                image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
                reviews: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cat-pigments',
    label: 'Пигменты',
    labelEn: 'Pigments',
    icon: '🎨',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop',
    description: 'Пигменты премиум-качества для перманентного макияжа',
    children: [
      {
        id: 'subcat-pigments-pm',
        label: 'Пигменты для ПМ',
        labelEn: 'Permanent Pigments',
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
        description: 'Пигменты для перманентного макияжа лица',
        children: [
          {
            id: 'subsubcat-eyebrows',
            label: 'Пигменты для бровей',
            labelEn: 'Eyebrow Pigments',
            image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
            description: 'Пигменты для татуажа бровей',
            children: [
              {
                id: 'p-pig-01',
                label: 'Пигмент для бровей «Тёплый тауп»',
                labelEn: 'Brow Pigment Warm Taupe',
                brand: 'PERMA BLEND',
                price: 2900,
                sku: 'PMB-WT',
                inStock: true,
                description: 'Стойкий гибридный пигмент теплого оттенка.',
                descriptionEn: 'Long-lasting hybrid pigment with a warm undertone.',
                image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
                reviews: []
              },
              {
                id: 'p-pig-02',
                label: 'Пигмент для бровей «Эспрессо»',
                labelEn: 'Brow Pigment Espresso',
                brand: 'PERMA BLEND',
                price: 2900,
                sku: 'PMB-ESP',
                inStock: true,
                description: 'Насыщенный темно-коричневый оттенок для выразительных бровей.',
                descriptionEn: 'Rich dark brown shade for expressive eyebrows.',
                image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
                reviews: []
              },
              {
                id: 'p-pig-04',
                label: 'Пигмент для бровей «Брюнет»',
                labelEn: 'Brow Pigment Brunette',
                brand: 'PERMA BLEND',
                price: 2900,
                sku: 'PMB-BRN',
                inStock: true,
                discountPercent: 15,
                description: 'Темный холодный коричневый цвет для брюнеток.',
                descriptionEn: 'Dark cool brown color for brunettes.',
                image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
                reviews: []
              },
              {
                id: 'p-pig-05',
                label: 'Пигмент для бровей «Блонд»',
                labelEn: 'Brow Pigment Blonde',
                brand: 'PERMA BLEND',
                price: 2900,
                sku: 'PMB-BLD',
                inStock: true,
                isNew: true,
                description: 'Светлый песочный оттенок для блондинок.',
                descriptionEn: 'Light sandy shade for blondes.',
                image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop',
                reviews: []
              }
            ]
          },
          {
            id: 'subsubcat-lips',
            label: 'Пигменты для губ',
            labelEn: 'Lip Pigments',
            image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop',
            description: 'Пигменты для татуажа губ',
            children: [
              {
                id: 'p-pig-03',
                label: 'Пигмент для губ «Розовый нюд»',
                labelEn: 'Lip Pigment Pink Nude',
                brand: 'EVENTLO',
                price: 3200,
                sku: 'EVL-PN',
                inStock: true,
                description: 'Естественный оттенок для нежного перманентного макияжа губ.',
                descriptionEn: 'Natural shade for soft permanent lip makeup.',
                image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop',
                reviews: []
              },
              {
                id: 'p-pig-06',
                label: 'Пигмент для губ «Малина»',
                labelEn: 'Lip Pigment Raspberry',
                brand: 'EVENTLO',
                price: 3200,
                sku: 'EVL-RASP',
                inStock: true,
                discountPercent: 30,
                description: 'Яркий сочный малиновый оттенок для эффектных губ.',
                descriptionEn: 'Bright juicy raspberry shade for show-stopping lips.',
                image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop',
                reviews: []
              },
              {
                id: 'p-pig-07',
                label: 'Пигмент для губ «Пыльная роза»',
                labelEn: 'Lip Pigment Dusty Rose',
                brand: 'EVENTLO',
                price: 3200,
                sku: 'EVL-DR',
                inStock: true,
                isNew: true,
                discountPercent: 10,
                description: 'Классический припыленный розовый для повседневного образа.',
                descriptionEn: 'Classic dusty pink for an everyday look.',
                image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop',
                reviews: []
              }
            ]
          }
        ]
      }
    ]
  }
];
