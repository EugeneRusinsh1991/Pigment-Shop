/**
 * Hierarchy levels (top → bottom):
 *   0  Catalog
 *   1  Category
 *   2  Subcategory
 *   3  Collection
 *   4  Type
 *   5  Product Group
 *   6  Product
 *
 * Each node:
 *   id       – unique string
 *   label    – display name
 *   icon     – emoji icon
 *   children – array of child nodes (empty array = leaf / Product)
 */

export const LEVEL_NAMES = [
  'Catalog',
  'Category',
  'Subcategory',
  'Collection',
  'Type',
  'Product Group',
  'Product',
];

export const HIERARCHY = [
  // ── Catalog ────────────────────────────────────────────────────────────────
  {
    id: 'cat-makeup',
    label: 'Makeup',
    icon: '💄',
    children: [
      // Category
      {
        id: 'cat-makeup-face',
        label: 'Face',
        icon: '✨',
        children: [
          // Subcategory
          {
            id: 'cat-makeup-face-foundation',
            label: 'Foundation',
            icon: '🪮',
            children: [
              // Collection
              {
                id: 'col-matte',
                label: 'Matte',
                icon: '🎨',
                children: [
                  // Type
                  {
                    id: 'type-liquid',
                    label: 'Liquid',
                    icon: '💧',
                    children: [
                      // Product Group
                      {
                        id: 'pg-full-coverage',
                        label: 'Full Coverage',
                        icon: '🔲',
                        children: [
                          // Products
                          { id: 'p-fc-01', label: 'Product Placeholder 1', icon: '📦', children: [] },
                          { id: 'p-fc-02', label: 'Product Placeholder 2', icon: '📦', children: [] },
                          { id: 'p-fc-03', label: 'Product Placeholder 3', icon: '📦', children: [] },
                        ],
                      },
                      {
                        id: 'pg-light-coverage',
                        label: 'Light Coverage',
                        icon: '🔳',
                        children: [
                          { id: 'p-lc-01', label: 'Product Placeholder 1', icon: '📦', children: [] },
                          { id: 'p-lc-02', label: 'Product Placeholder 2', icon: '📦', children: [] },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'type-powder',
                    label: 'Powder',
                    icon: '🌸',
                    children: [
                      {
                        id: 'pg-pressed',
                        label: 'Pressed',
                        icon: '🔲',
                        children: [
                          { id: 'p-pr-01', label: 'Product Placeholder 1', icon: '📦', children: [] },
                          { id: 'p-pr-02', label: 'Product Placeholder 2', icon: '📦', children: [] },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: 'col-dewy',
                label: 'Dewy',
                icon: '💦',
                children: [
                  {
                    id: 'type-serum',
                    label: 'Serum',
                    icon: '🧴',
                    children: [
                      {
                        id: 'pg-brightening',
                        label: 'Brightening',
                        icon: '🔆',
                        children: [
                          { id: 'p-br-01', label: 'Product Placeholder 1', icon: '📦', children: [] },
                          { id: 'p-br-02', label: 'Product Placeholder 2', icon: '📦', children: [] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'cat-makeup-face-blush',
            label: 'Blush',
            icon: '🌺',
            children: [
              {
                id: 'col-blush-natural',
                label: 'Natural',
                icon: '🌿',
                children: [
                  {
                    id: 'type-blush-cream',
                    label: 'Cream',
                    icon: '🎀',
                    children: [
                      {
                        id: 'pg-blush-rosy',
                        label: 'Rosy Tones',
                        icon: '🔲',
                        children: [
                          { id: 'p-ro-01', label: 'Product Placeholder 1', icon: '📦', children: [] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'cat-makeup-eyes',
        label: 'Eyes',
        icon: '👁️',
        children: [
          {
            id: 'cat-makeup-eyes-eyeshadow',
            label: 'Eyeshadow',
            icon: '🎭',
            children: [
              {
                id: 'col-eyes-bold',
                label: 'Bold',
                icon: '⚡',
                children: [
                  {
                    id: 'type-eyes-palette',
                    label: 'Palette',
                    icon: '🗂️',
                    children: [
                      {
                        id: 'pg-eyes-smoky',
                        label: 'Smoky',
                        icon: '🔲',
                        children: [
                          { id: 'p-sm-01', label: 'Product Placeholder 1', icon: '📦', children: [] },
                          { id: 'p-sm-02', label: 'Product Placeholder 2', icon: '📦', children: [] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'cat-makeup-eyes-mascara',
            label: 'Mascara',
            icon: '🖊️',
            children: [
              {
                id: 'col-mascara-volume',
                label: 'Volume',
                icon: '📈',
                children: [
                  {
                    id: 'type-mascara-fiber',
                    label: 'Fiber',
                    icon: '🔗',
                    children: [
                      {
                        id: 'pg-mascara-lengthening',
                        label: 'Lengthening',
                        icon: '🔲',
                        children: [
                          { id: 'p-len-01', label: 'Product Placeholder 1', icon: '📦', children: [] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'cat-makeup-lips',
        label: 'Lips',
        icon: '👄',
        children: [
          {
            id: 'cat-makeup-lips-lipstick',
            label: 'Lipstick',
            icon: '💋',
            children: [
              {
                id: 'col-lips-classic',
                label: 'Classic',
                icon: '🏛️',
                children: [
                  {
                    id: 'type-lips-bullet',
                    label: 'Bullet',
                    icon: '🔴',
                    children: [
                      {
                        id: 'pg-lips-satin',
                        label: 'Satin Finish',
                        icon: '🔲',
                        children: [
                          { id: 'p-sat-01', label: 'Product Placeholder 1', icon: '📦', children: [] },
                          { id: 'p-sat-02', label: 'Product Placeholder 2', icon: '📦', children: [] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  // ── Catalog ────────────────────────────────────────────────────────────────
  {
    id: 'cat-skincare',
    label: 'Skincare',
    icon: '🧴',
    children: [
      {
        id: 'cat-skincare-cleansers',
        label: 'Cleansers',
        icon: '🫧',
        children: [
          {
            id: 'sub-skincare-foam',
            label: 'Foam',
            icon: '💭',
            children: [
              {
                id: 'col-skincare-gentle',
                label: 'Gentle',
                icon: '🌸',
                children: [
                  {
                    id: 'type-skincare-daily',
                    label: 'Daily',
                    icon: '📅',
                    children: [
                      {
                        id: 'pg-skincare-normal',
                        label: 'Normal Skin',
                        icon: '🔲',
                        children: [
                          { id: 'p-ns-01', label: 'Product Placeholder 1', icon: '📦', children: [] },
                          { id: 'p-ns-02', label: 'Product Placeholder 2', icon: '📦', children: [] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'cat-skincare-moisturizers',
        label: 'Moisturizers',
        icon: '💧',
        children: [
          {
            id: 'sub-skincare-cream',
            label: 'Cream',
            icon: '🫙',
            children: [
              {
                id: 'col-skincare-hydrating',
                label: 'Hydrating',
                icon: '🌊',
                children: [
                  {
                    id: 'type-skincare-night',
                    label: 'Night Cream',
                    icon: '🌙',
                    children: [
                      {
                        id: 'pg-skincare-anti-age',
                        label: 'Anti-Aging',
                        icon: '🔲',
                        children: [
                          { id: 'p-aa-01', label: 'Product Placeholder 1', icon: '📦', children: [] },
                          { id: 'p-aa-02', label: 'Product Placeholder 2', icon: '📦', children: [] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  // ── Catalog ────────────────────────────────────────────────────────────────
  {
    id: 'cat-fragrance',
    label: 'Fragrance',
    icon: '🌹',
    children: [
      {
        id: 'cat-fragrance-women',
        label: "Women's",
        icon: '👩',
        children: [
          {
            id: 'sub-frag-floral',
            label: 'Floral',
            icon: '🌷',
            children: [
              {
                id: 'col-frag-summer',
                label: 'Summer',
                icon: '☀️',
                children: [
                  {
                    id: 'type-frag-edp',
                    label: 'Eau de Parfum',
                    icon: '🫗',
                    children: [
                      {
                        id: 'pg-frag-light',
                        label: 'Light Scents',
                        icon: '🔲',
                        children: [
                          { id: 'p-ls-01', label: 'Product Placeholder 1', icon: '📦', children: [] },
                          { id: 'p-ls-02', label: 'Product Placeholder 2', icon: '📦', children: [] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'cat-fragrance-men',
        label: "Men's",
        icon: '👨',
        children: [
          {
            id: 'sub-frag-woody',
            label: 'Woody',
            icon: '🌲',
            children: [
              {
                id: 'col-frag-winter',
                label: 'Winter',
                icon: '❄️',
                children: [
                  {
                    id: 'type-frag-edt',
                    label: 'Eau de Toilette',
                    icon: '🫗',
                    children: [
                      {
                        id: 'pg-frag-bold',
                        label: 'Bold Scents',
                        icon: '🔲',
                        children: [
                          { id: 'p-bs-01', label: 'Product Placeholder 1', icon: '📦', children: [] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
