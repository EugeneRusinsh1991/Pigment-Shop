import mediaPool from '../constants/mediaPool.js';

export const CATEGORY_IMAGE_POOL = mediaPool.categoryImages;
export const PRODUCT_IMAGE_POOL = mediaPool.productImages;
export const PRODUCT_IMAGES = PRODUCT_IMAGE_POOL;
const SEED_BANNERS = mediaPool.banners;

export const CATEGORY_DICTIONARIES = [
  {
    id: 'dir-pigments',
    tag: 'pigments',
    name: {
      uk: 'Пігменти для перманентного макіяжу',
      ru: 'Пигменты для перманентного макияжа',
      en: 'PMU Pigments',
    },
    description: {
      uk: 'Преміальні пігменти для брів, губ та повік від світових виробників.',
      ru: 'Премиальные пигменты для бровей, губ и век от мировых производителей.',
      en: 'Premium pigments for brows, lips, and eyeliners from top global brands.',
    },
    subcategories: [
      {
        id: 'sub-pigments-brows',
        name: {
          uk: 'Пігменти для брів',
          ru: 'Пигменты для бровей',
          en: 'Eyebrow Pigments',
        },
        description: {
          uk: 'Стійкі мінеральні та гібридні відтінки для перманенту брів.',
          ru: 'Стойкие минеральные и гибридные оттенки для перманента бровей.',
          en: 'Long-lasting mineral and hybrid brow shades for PMU.',
        },
        holders: [
          {
            id: 'holder-brows-mineral',
            name: {
              uk: 'Мінеральні пігменти',
              ru: 'Минеральные пигменты',
              en: 'Mineral Pigments',
            },
            description: {
              uk: 'М’які натуральні відтінки для пудрового напилення.',
              ru: 'Мягкие натуральные оттенки для пудрового напыления.',
              en: 'Soft natural shades for powder brow shading.',
            },
          },
          {
            id: 'holder-brows-hybrid',
            name: {
              uk: 'Гібридні пігменти',
              ru: 'Гибридные пигменты',
              en: 'Hybrid Pigments',
            },
            description: {
              uk: 'Насичені формули з високим залишком пігменту.',
              ru: 'Насыщенные формулы с высоким остатком пигмента.',
              en: 'Vibrant formulations with high healed retention.',
            },
          },
          {
            id: 'holder-brows-correctors',
            name: {
              uk: 'Коректори та модифікатори',
              ru: 'Корректоры и модификаторы',
              en: 'Correctors & Modifiers',
            },
            description: {
              uk: 'Теплі та холодні нейтралізатори небажаних відтінків.',
              ru: 'Теплые и холодные нейтрализаторы нежелательных оттенков.',
              en: 'Warm and cool neutralizers for unwanted undertones.',
            },
          },
        ],
      },
      {
        id: 'sub-pigments-lips',
        name: {
          uk: 'Пігменти для губ',
          ru: 'Пигменты для губ',
          en: 'Lip Pigments',
        },
        description: {
          uk: 'Широка палітра від нюдових до соковитих ягідних тонів.',
          ru: 'Широкая палитра от нюдовых до сочных ягодных тонов.',
          en: 'Broad palette from delicate nudes to vibrant berry tones.',
        },
        holders: [
          {
            id: 'holder-lips-nude',
            name: {
              uk: 'Нюдові відтінки',
              ru: 'Нюдовые оттенки',
              en: 'Nude Shades',
            },
            description: {
              uk: 'Природні пастельні та пудрові кольори для акварельної техніки.',
              ru: 'Естественные пастельные и пудровые цвета для акварельной техники.',
              en: 'Natural pastel and powdery shades for watercolor lips.',
            },
          },
          {
            id: 'holder-lips-vibrant',
            name: {
              uk: 'Яскраві та ягідні тона',
              ru: 'Яркие и ягодные тона',
              en: 'Vibrant & Berry Tones',
            },
            description: {
              uk: 'Ефект помади з виразними насиченими кольорами.',
              ru: 'Помадный эффект с выразительными насыщенными цветами.',
              en: 'Lipstick effect shades with intense saturation.',
            },
          },
        ],
      },
      {
        id: 'sub-pigments-eyes',
        name: {
          uk: 'Пігменти для повік',
          ru: 'Пигменты для век',
          en: 'Eyeliner Pigments',
        },
        description: {
          uk: 'Ультрачорні та тіньові пігменти для стрілок та розтушовки.',
          ru: 'Ультрачерные и теневые пигменты для стрелок и растушевки.',
          en: 'Carbon black and soft shadow pigments for permanent eyeliners.',
        },
        holders: [
          {
            id: 'holder-eyes-carbon',
            name: {
              uk: 'Карбонові чорні пігменти',
              ru: 'Карбоновые черные пигменты',
              en: 'Carbon Black Pigments',
            },
            description: {
              uk: 'Глибокий чорний колір для чітких класичних стрілок.',
              ru: 'Глубокий черный цвет для четких классических стрелок.',
              en: 'Deep black for crisp classic eyeliners.',
            },
          },
          {
            id: 'holder-eyes-shading',
            name: {
              uk: 'Тіньові пігменти',
              ru: 'Теневые пигменты',
              en: 'Soft Shadow Pigments',
            },
            description: {
              uk: 'Пігменти для м’якої розтушовки повік та теневих ефектів.',
              ru: 'Пигменты для мягкой растушевки век и теневых эффектов.',
              en: 'Pigments for soft eyelid shading and gradient effects.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'dir-lashes',
    tag: 'lashes',
    name: {
      uk: 'Матеріали для вій',
      ru: 'Материалы для ресниц',
      en: 'Lash Extension Supplies',
    },
    description: {
      uk: 'Професійні вії, клеї, препарати та інструменти для лешмейкерів.',
      ru: 'Профессиональные ресницы, клеи, препараты и инструменты для лэшмейкеров.',
      en: 'Professional eyelash trays, adhesives, solutions, and lash tools.',
    },
    subcategories: [
      {
        id: 'sub-lashes-extensions',
        name: {
          uk: 'Вії в палетках',
          ru: 'Ресницы в палетках',
          en: 'Eyelash Trays',
        },
        description: {
          uk: 'Ультралегкі моноволокна різноманітних вигинів та товщин.',
          ru: 'Ультралегкие моноволокна разнообразных изгибов и толщин.',
          en: 'Ultra-lightweight fibers in various curls and diameters.',
        },
        holders: [
          {
            id: 'holder-lashes-single',
            name: {
              uk: 'Окремі довжини (C, D, L)',
              ru: 'Отдельные длины (C, D, L)',
              en: 'Individual Lengths (C, D, L)',
            },
            description: {
              uk: 'Палетки одного розміру для базового моделювання погляду.',
              ru: 'Палетки одного размера для базового моделирования взгляда.',
              en: 'Single-size trays for consistent mapping and volume work.',
            },
          },
          {
            id: 'holder-lashes-mix',
            name: {
              uk: 'Мікси довжин (7-14 мм)',
              ru: 'Миксы длин (7-14 мм)',
              en: 'Mixed Length Trays (7-14 mm)',
            },
            description: {
              uk: 'Зручні набори всіх необхідних довжин в одній палетці.',
              ru: 'Удобные наборы всех необходимых длин в одной палетке.',
              en: 'Convenient assorted sizes in a single compact tray.',
            },
          },
        ],
      },
      {
        id: 'sub-lashes-adhesives',
        name: {
          uk: 'Клеї та препарати',
          ru: 'Клеи и препараты',
          en: 'Adhesives & Solutions',
        },
        description: {
          uk: 'Клеї миттєвої фіксації, знежирювачі, праймери та ремувери.',
          ru: 'Клеи мгновенной сцепки, обезжириватели, праймеры и ремуверы.',
          en: 'Fast-bonding glues, degreasers, primers, and gentle removers.',
        },
        holders: [
          {
            id: 'holder-lashes-glues',
            name: {
              uk: 'Швидковисихаючі клеї',
              ru: 'Быстросохнущие клеи',
              en: 'Fast Drying Adhesives',
            },
            description: {
              uk: 'Зчіпка 0.5–1 сек та тривалість носіння до 8 тижнів.',
              ru: 'Сцепка 0.5–1 сек и носка до 8 недель.',
              en: '0.5–1 sec bond time with retention up to 8 weeks.',
            },
          },
          {
            id: 'holder-lashes-prep',
            name: {
              uk: 'Праймери та знежирювачі',
              ru: 'Праймеры и обезжириватели',
              en: 'Primers & Degreasers',
            },
            description: {
              uk: 'Ідеальне очищення та підготовка натуральних вій до нарощування.',
              ru: 'Идеальное очищение и подготовка натуральных ресниц к наращиванию.',
              en: 'Surface prep and degreasing for maximum adhesive grip.',
            },
          },
        ],
      },
      {
        id: 'sub-lashes-tools',
        name: {
          uk: 'Пінцети та аксесуари',
          ru: 'Пинцеты и аксессуары',
          en: 'Tweezers & Accessories',
        },
        description: {
          uk: 'Високоточні пінцети ручного заточування з японської сталі.',
          ru: 'Высокоточные пинцеты ручной заточки из японской стали.',
          en: 'Precision hand-ground tweezers made from Japanese steel.',
        },
        holders: [
          {
            id: 'holder-lashes-tweezers',
            name: {
              uk: 'Пінцети для об’ємів та розділення',
              ru: 'Пинцеты для объемов и разделения',
              en: 'Volume & Isolation Tweezers',
            },
            description: {
              uk: 'Легкий хід та бездоганне змикання кінчиків.',
              ru: 'Легкий ход и идеальное смыкание кончиков.',
              en: 'Lightweight tension with immaculate tip closure.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'dir-equipment',
    tag: 'equipment',
    name: {
      uk: 'Обладнання та апарати',
      ru: 'Оборудование и аппараты',
      en: 'PMU Machines & Equipment',
    },
    description: {
      uk: 'Роторні машинки-ручки, блоки живлення, педалі та модульні картриджі.',
      ru: 'Роторные машинки-ручки, блоки питания, педали и модульные картриджи.',
      en: 'Rotary PMU pens, power supplies, wireless batteries, and needle cartridges.',
    },
    subcategories: [
      {
        id: 'sub-equipment-machines',
        name: {
          uk: 'Апарати для перманенту',
          ru: 'Аппараты для перманента',
          en: 'Rotary Pen Machines',
        },
        description: {
          uk: 'Безвібраційні короткохідні та гібридні ручки для делікатних робіт.',
          ru: 'Безвибрационные короткоходные и гибридные ручки для деликатных работ.',
          en: 'Low-vibration pens for ultra-precise hairline and lip strokes.',
        },
        holders: [
          {
            id: 'holder-machines-wireless',
            name: {
              uk: 'Бездротові машинки',
              ru: 'Беспроводные машинки',
              en: 'Wireless PMU Pens',
            },
            description: {
              uk: 'Автономні апарати з двома змінними акумуляторами.',
              ru: 'Автономные аппараты с двумя сменными аккумуляторами.',
              en: 'Cordless pens with dual interchangeable battery packs.',
            },
          },
          {
            id: 'holder-machines-shortstroke',
            name: {
              uk: 'Короткохідні апарати (2.0–2.5 мм)',
              ru: 'Короткоходные аппараты (2.0–2.5 мм)',
              en: 'Short Stroke Pens (2.0–2.5 mm)',
            },
            description: {
              uk: 'Спеціально розроблені для атравматичного пудрового напилення.',
              ru: 'Специально разработаны для атравматичного пудрового напыления.',
              en: 'Designed for gentle and non-traumatic shading techniques.',
            },
          },
        ],
      },
      {
        id: 'sub-equipment-cartridges',
        name: {
          uk: 'Модульні картриджі',
          ru: 'Модульные картриджи',
          en: 'Needle Cartridges',
        },
        description: {
          uk: 'Стерильні захищені мембраною модулі гострих конфігурацій.',
          ru: 'Стерильные модули с защитной мембраной острых конфигураций.',
          en: 'Sterilized safety-membrane needle cartridges in all tapers.',
        },
        holders: [
          {
            id: 'holder-cartridges-rl',
            name: {
              uk: 'Контурні картриджі Round Liner (1RL, 3RL)',
              ru: 'Контурные картриджи Round Liner (1RL, 3RL)',
              en: 'Round Liner Cartridges (1RL, 3RL)',
            },
            description: {
              uk: 'Мікроголки для створення ідеальних волосків та тонких контурів.',
              ru: 'Микроиглы для создания идеальных волосков и тонких контуров.',
              en: 'Ultra-fine needles for crisp hair strokes and fine contours.',
            },
          },
          {
            id: 'holder-cartridges-rs',
            name: {
              uk: 'Тіньові картриджі Round Shader / Magnum',
              ru: 'Теневые картриджи Round Shader / Magnum',
              en: 'Shader & Magnum Cartridges',
            },
            description: {
              uk: 'Рівномірне та швидке заповнення кольором без плям.',
              ru: 'Равномерное и быстрое заполнение цветом без пятен.',
              en: 'Uniform coverage and soft gradient pixel deposition.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'dir-sterilization',
    tag: 'sterilization',
    name: {
      uk: 'Стерилізація та догляд',
      ru: 'Стерилизация и уход',
      en: 'Sterilization & Aftercare',
    },
    description: {
      uk: 'Крафт-пакети, бар’єрний захист, антисептики та постпроцедурний догляд.',
      ru: 'Крафт-пакеты, барьерная защита, антисептики и постпроцедурный уход.',
      en: 'Kraft pouches, barrier film, skin antiseptics, and healing care.',
    },
    subcategories: [
      {
        id: 'sub-sterilization-hygiene',
        name: {
          uk: 'Бар’єрний захист та витратники',
          ru: 'Барьерная защита и расходники',
          en: 'Barrier Protection & Disposables',
        },
        description: {
          uk: 'Одноразові чохли, нітрилові рукавички, мікробраші та серветки.',
          ru: 'Одноразовые чехлы, нитриловые перчатки, микробраши и салфетки.',
          en: 'Single-use cord sleeves, nitrile gloves, microbrushes, and wipes.',
        },
        holders: [
          {
            id: 'holder-hygiene-barrier',
            name: {
              uk: 'Чохли та плівки бар’єрного захисту',
              ru: 'Чехлы и пленки барьерной защиты',
              en: 'Covers & Barrier Film',
            },
            description: {
              uk: 'Повний санітарний захист робочого місця та апаратів.',
              ru: 'Полная санитарная защита рабочего места и аппаратов.',
              en: 'Full sanitary barrier protection for clip cords and machines.',
            },
          },
          {
            id: 'holder-hygiene-disposables',
            name: {
              uk: 'Мікробраші та витратні аксесуари',
              ru: 'Микробраши и расходные аксессуары',
              en: 'Microbrushes & Consumables',
            },
            description: {
              uk: 'Безворсові аплікатори для точного нанесення препаратів.',
              ru: 'Безворсовые аппликаторы для точного нанесения составов.',
              en: 'Lint-free applicators for precision solution placement.',
            },
          },
        ],
      },
      {
        id: 'sub-sterilization-care',
        name: {
          uk: 'Загоєння та пост-догляд',
          ru: 'Заживление и пост-уход',
          en: 'Aftercare & Healing',
        },
        description: {
          uk: 'Спеціальні вітамінні бальзами та відновлювальні креми.',
          ru: 'Специальные витаминные бальзамы и восстанавливающие кремы.',
          en: 'Specialized vitamin balms and soothing restorative creams.',
        },
        holders: [
          {
            id: 'holder-care-balms',
            name: {
              uk: 'Загоювальні бальзами та креми',
              ru: 'Заживляющие бальзамы и кремы',
              en: 'Healing Balms & Creams',
            },
            description: {
              uk: 'Прискорюють регенерацію шкіри та зберігають пігмент.',
              ru: 'Ускоряют регенерацию кожи и сохраняют пигмент.',
              en: 'Accelerate epidermal recovery while retaining pigment saturation.',
            },
          },
        ],
      },
    ],
  },
];

export const BRAND_NAMES = [
  'PERMA BLEND',
  'DEFENDERR',
  'CHEYENNE',
  'BARBARA',
  'LOVELY',
  'DRAIFF MIX',
  'KWADRON',
  'MAST PRO',
  'TINEL',
  'HANAFI',
  'ENIGMA',
  'LE MAITRE',
];

export const PRODUCT_TEMPLATES = [
  {
    templateKey: 'pmu-pigment-brow',
    categoryTag: 'brows',
    label: {
      uk: 'Пігмент для брів Dark Brunette 15мл',
      ru: 'Пигмент для бровей Dark Brunette 15мл',
      en: 'Dark Brunette Eyebrow Pigment 15ml',
    },
    description: {
      uk: 'Глибокий шоколадний відтінок на нейтральній основі для брів. Залишок до 90%.',
      ru: 'Глубокий шоколадный оттенок на нейтральной основе для бровей. Остаток до 90%.',
      en: 'Deep chocolate tone with neutral undertone for brows. Retention up to 90%.',
    },
    brand: 'PERMA BLEND',
    priceRange: [720, 1150],
  },
  {
    templateKey: 'pmu-pigment-blond',
    categoryTag: 'brows',
    label: {
      uk: 'Мінеральний пігмент Golden Blond 15мл',
      ru: 'Минеральный пигмент Golden Blond 15мл',
      en: 'Golden Blond Mineral Pigment 15ml',
    },
    description: {
      uk: 'Світло-русявий теплий пігмент для натуральних блондинок.',
      ru: 'Светло-русый теплый пигмент для натуральных блондинок.',
      en: 'Light warm blonde pigment for natural blonde shading.',
    },
    brand: 'DRAIFF MIX',
    priceRange: [680, 990],
  },
  {
    templateKey: 'pmu-pigment-lip-nude',
    categoryTag: 'lips',
    label: {
      uk: 'Пігмент для губ Nude Velvet 15мл',
      ru: 'Пигмент для губ Nude Velvet 15мл',
      en: 'Nude Velvet Lip Pigment 15ml',
    },
    description: {
      uk: 'Ніжний пудрово-рожевий відтінок для акварельної техніки збільшення об’єму губ.',
      ru: 'Нежный пудрово-розовый оттенок для акварельной техники увеличения объема губ.',
      en: 'Soft powdery pink shade for watercolor volume lip enhancement.',
    },
    brand: 'TINEL',
    priceRange: [750, 1200],
  },
  {
    templateKey: 'pmu-pigment-lip-berry',
    categoryTag: 'lips',
    label: {
      uk: 'Пігмент для губ Wild Berry 15мл',
      ru: 'Пигмент для губ Wild Berry 15мл',
      en: 'Wild Berry Lip Pigment 15ml',
    },
    description: {
      uk: 'Соковитий ягідний колір з помадним ефектом та виразним насиченням.',
      ru: 'Сочный ягодный цвет с помадным эффектом и выразительным насыщением.',
      en: 'Juicy berry color with intense lipstick density and saturation.',
    },
    brand: 'PERMA BLEND',
    priceRange: [790, 1250],
  },
  {
    templateKey: 'pmu-pigment-eyeliner',
    categoryTag: 'eyes',
    label: {
      uk: 'Концентрат Carbon Black Eyeliner 15мл',
      ru: 'Концентрат Carbon Black Eyeliner 15мл',
      en: 'Carbon Black Eyeliner Concentrate 15ml',
    },
    description: {
      uk: 'Ультрастійкий чорний пігмент без ризику міграції в сині відтінки.',
      ru: 'Ультрастойкий черный пигмент без риска миграции в синие оттенки.',
      en: 'Ultra-stable deep carbon black formula with zero blue migration.',
    },
    brand: 'HANAFI',
    priceRange: [850, 1300],
  },
  {
    templateKey: 'pmu-machine-rotary',
    categoryTag: 'machines',
    label: {
      uk: 'Бездротовий апарат для ПМ Onyx Pen',
      ru: 'Беспроводной аппарат для ПМ Onyx Pen',
      en: 'Onyx Wireless PMU Rotary Pen',
    },
    description: {
      uk: 'Ергономічна машинка з ходом 2.3 мм та двома змінними акумуляторами на 1800 mAh.',
      ru: 'Эргономичная машинка с ходом 2.3 мм и двумя сменными аккумуляторами на 1800 mAh.',
      en: 'Ergonomic pen machine with 2.3 mm stroke and dual 1800 mAh swappable batteries.',
    },
    brand: 'DEFENDERR',
    priceRange: [8500, 14500],
  },
  {
    templateKey: 'pmu-machine-precision',
    categoryTag: 'machines',
    label: {
      uk: 'Роторна машинка Hawk Pen Pro',
      ru: 'Роторная машинка Hawk Pen Pro',
      en: 'Hawk Pen Pro Rotary Machine',
    },
    description: {
      uk: 'Швейцарський мотор для ювелірної точності волоскової техніки та розтушовки.',
      ru: 'Швейцарский мотор для ювелирной точности волосковой техники и растушевки.',
      en: 'Precision Swiss motor engineered for micro-pigmentation and shading.',
    },
    brand: 'CHEYENNE',
    priceRange: [12000, 18500],
  },
  {
    templateKey: 'pmu-cartridges-1rl',
    categoryTag: 'cartridges',
    label: {
      uk: 'Картриджі голки 1RL 0.25мм Long Taper (20 шт)',
      ru: 'Картриджи иглы 1RL 0.25мм Long Taper (20 шт)',
      en: 'Needle Cartridges 1RL 0.25mm Long Taper (20 pcs)',
    },
    description: {
      uk: 'Медична сталь, захисна силіконова мембрана та лазерне заточування.',
      ru: 'Медицинская сталь, защитная силиконовая мембрана и лазерная заточка.',
      en: 'Medical grade surgical steel with protective membrane and laser sharpening.',
    },
    brand: 'KWADRON',
    priceRange: [950, 1600],
  },
  {
    templateKey: 'pmu-cartridges-3rs',
    categoryTag: 'cartridges',
    label: {
      uk: 'Картриджі для розтушовки 3RS 0.30мм (20 шт)',
      ru: 'Картриджи для растушевки 3RS 0.30мм (20 шт)',
      en: 'Shading Cartridges 3RS 0.30mm (20 pcs)',
    },
    description: {
      uk: 'Ідеальна конфігурація для м’якої тіньової вуалі та швидкого заповнення губ.',
      ru: 'Идеальная конфигурация для мягкой теневой вуали и быстрого заполнения губ.',
      en: 'Ideal round shader configuration for soft gradient lip and brow shading.',
    },
    brand: 'MAST PRO',
    priceRange: [820, 1400],
  },
  {
    templateKey: 'lash-tray-single',
    categoryTag: 'lashes',
    label: {
      uk: 'Вії Barbara Elegant Mix D 0.07 (16 ліній)',
      ru: 'Ресницы Barbara Elegant Mix D 0.07 (16 линий)',
      en: 'Barbara Elegant Lashes Mix D 0.07 (16 lines)',
    },
    description: {
      uk: 'Оксамитово-чорне волокно без заломів, легке формування пучка на стрічці.',
      ru: 'Бархатисто-черное волокно без заломов, легкое формирование пучка на ленте.',
      en: 'Velvety black synthetic fiber with resilient curl and effortless fan creation.',
    },
    brand: 'BARBARA',
    priceRange: [380, 560],
  },
  {
    templateKey: 'lash-tray-cc',
    categoryTag: 'lashes',
    label: {
      uk: 'Вії Lovely Silicone CC 0.10 окремі довжини',
      ru: 'Ресницы Lovely Silicone CC 0.10 отдельные длины',
      en: 'Lovely Silicone Lashes CC 0.10 Individual Trays',
    },
    description: {
      uk: 'Еластичні глянцеві вії для класичного та об’ємного нарощування.',
      ru: 'Эластичные глянцевые ресницы для классического и объемного наращивания.',
      en: 'Glossy resilient lash extensions for classic and volume sets.',
    },
    brand: 'LOVELY',
    priceRange: [340, 520],
  },
  {
    templateKey: 'lash-glue-fast',
    categoryTag: 'adhesives',
    label: {
      uk: 'Клей для нарощування Speed Expert 5мл',
      ru: 'Клей для наращивания Speed Expert 5мл',
      en: 'Speed Expert Eyelash Adhesive 5ml',
    },
    description: {
      uk: 'Миттєва фіксація за 0.5 секунди. Мінімальні випари та стійкість до 8 тижнів.',
      ru: 'Мгновенная сцепка за 0.5 секунды. Минимальные испарения и носка до 8 недель.',
      en: 'Instant 0.5s bonding speed with minimal fumes and up to 8-week hold.',
    },
    brand: 'ENIGMA',
    priceRange: [540, 780],
  },
  {
    templateKey: 'lash-tweezers-volume',
    categoryTag: 'tools',
    label: {
      uk: 'Пінцет для об’ємного нарощування Expert L-Type',
      ru: 'Пинцет для объемного наращивания Expert L-Type',
      en: 'Expert L-Type Volume Eyelash Tweezers',
    },
    description: {
      uk: 'Ручне заточування під мікроскопом з легким та м’яким змиканням стулок.',
      ru: 'Ручная заточка под микроскопом с легким и мягким смыканием створок.',
      en: 'Hand-ground tips with light squeeze tension for Russian & Mega volume.',
    },
    brand: 'LE MAITRE',
    priceRange: [650, 1100],
  },
  {
    templateKey: 'hygiene-barrier-covers',
    categoryTag: 'hygiene',
    label: {
      uk: 'Захисні чохли для машинок в рулоні (200 шт)',
      ru: 'Защитные чехлы для машинок в рулоне (200 шт)',
      en: 'Machine Protective Barrier Sleeves (200 pcs)',
    },
    description: {
      uk: 'Надійний захист корпусу апарату та кліп-корду від забруднень.',
      ru: 'Надежная защита корпуса аппарата и клип-корда от загрязнений.',
      en: 'Reliable cross-contamination barrier covers for pens and clip cords.',
    },
    brand: 'DEFENDERR',
    priceRange: [290, 480],
  },
  {
    templateKey: 'hygiene-microbrushes',
    categoryTag: 'hygiene',
    label: {
      uk: 'Мікробраші безворсові Ultra Fine (100 шт)',
      ru: 'Микробраши безворсовые Ultra Fine (100 шт)',
      en: 'Ultra Fine Lint-Free Microbrushes (100 pcs)',
    },
    description: {
      uk: 'Аплікатори з гнучкою голівкою для економного нанесення праймерів та ремуверів.',
      ru: 'Аппликаторы с гибкой головкой для экономного нанесения праймеров и ремуверов.',
      en: 'Flexible micro-applicators for precise solution dosing and primer placement.',
    },
    brand: 'BARBARA',
    priceRange: [120, 220],
  },
  {
    templateKey: 'care-healing-balm',
    categoryTag: 'aftercare',
    label: {
      uk: 'Загоювальний крем-бальзам Heal Pro 30мл',
      ru: 'Заживляющий крем-бальзам Heal Pro 30мл',
      en: 'Heal Pro PMU Aftercare Cream 30ml',
    },
    description: {
      uk: 'Вітамінний комплекс з пантенолом та олією ши для швидкого відновлення після ПМ.',
      ru: 'Витаминный комплекс с пантенолом и маслом ши для быстрого восстановления после ПМ.',
      en: 'Vitamin complex with provitamin B5 and shea butter for rapid post-procedure recovery.',
    },
    brand: 'DRAIFF MIX',
    priceRange: [250, 420],
  },
];

export const REVIEW_TEMPLATES = [
  {
    rating: 5,
    comment: {
      uk: 'Чудова якість! Пігмент укладається рівномірно і загоюється без втрати кольору.',
      ru: 'Отличное качество! Пигмент укладывается равномерно и заживает без потери цвета.',
      en: 'Excellent quality! The pigment implants smoothly and heals with high color retention.',
    },
  },
  {
    rating: 5,
    comment: {
      uk: 'Замовляю вже втретє. Клей тримає надійно, вії носяться чудово без склеювань.',
      ru: 'Заказываю уже в третий раз. Клей держит надежно, ресницы носятся отлично без склеек.',
      en: 'Ordering for the third time. The glue bonds reliably, lashes wear beautifully.',
    },
  },
  {
    rating: 5,
    comment: {
      uk: 'Машинка працює дуже м’яко, мінімальна вібрація в руці. Клієнти задоволені комфортом.',
      ru: 'Машинка работает очень мягко, минимальная вибрация в руке. Клиенты довольны комфортом.',
      en: 'The machine runs super smooth with minimal hand vibration. Clients love the comfort.',
    },
  },
  {
    rating: 4,
    comment: {
      uk: 'Гарний продукт, швидка доставка. Єдине — хотілося б трохи більший об’єм флакона.',
      ru: 'Хороший продукт, быстрая доставка. Единственное — хотелось бы чуть больший объем флакона.',
      en: 'Good product, fast delivery. Only wish the bottle volume was slightly larger.',
    },
  },
  {
    rating: 4,
    comment: {
      uk: 'Картриджі гострі, мембрана пружна. Трохи жорсткуватий хід на початку, але в роботі супер.',
      ru: 'Картриджи острые, мембрана упругая. Чуть жестковатый ход в начале, но в работе супер.',
      en: 'Sharp cartridges with good membrane tension. Slightly stiff initially, but great in use.',
    },
  },
  {
    rating: 3,
    comment: {
      uk: 'Якість непогана, але відтінок виявився трохи світлішим, ніж очікувалося за палітрою.',
      ru: 'Качество неплохое, но оттенок оказался чуть светлее, чем ожидалось по палитре.',
      en: 'Decent quality, though the shade turned out slightly lighter than swatch palette.',
    },
  },
  {
    rating: 2,
    comment: {
      uk: 'Клей занадто швидко сохне при нашій вологості в кабінеті, підійде тільки для швидких майстрів.',
      ru: 'Клей слишком быстро сохнет при нашей влажности в кабинете, подойдет только для быстрых мастеров.',
      en: 'The adhesive dries too fast under our studio humidity; suitable only for fast techs.',
    },
  },
  {
    rating: 1,
    comment: {
      uk: 'Пошкоджена упаковка при транспортуванні. Служба підтримки швидко вирішила питання.',
      ru: 'Повреждена упаковка при транспортировке. Служба поддержки быстро решила вопрос.',
      en: 'Packaging was damaged during transport. Support resolved the issue quickly.',
    },
  },
];

export const QUESTION_TEMPLATES = [
  {
    comment: {
      uk: 'Чи підходить цей пігмент для перекриття старого сірого татуажу брів?',
      ru: 'Подходит ли этот пигмент для перекрытия старого серого татуажа бровей?',
      en: 'Is this pigment suitable for covering old grayish brow permanent makeup?',
    },
  },
  {
    comment: {
      uk: 'Який рекомендований термін придатності клею після першого відкриття?',
      ru: 'Какой рекомендуемый срок годности клея после первого вскрытия?',
      en: 'What is the recommended shelf life of the adhesive after first opening?',
    },
  },
  {
    comment: {
      uk: 'Чи сумісні ці картриджі з класичними апаратами Cheyenne та Mast?',
      ru: 'Совместимы ли эти картриджи с классическими аппаратами Cheyenne и Mast?',
      en: 'Are these needle cartridges compatible with standard Cheyenne and Mast pens?',
    },
  },
  {
    comment: {
      uk: 'Підкажіть, який виліт голки та вольтаж найкраще підходять для пудрового напилення?',
      ru: 'Подскажите, какой вылет иглы и вольтаж лучше всего подходят для пудрового напыления?',
      en: 'What needle hang and voltage are recommended for soft powder shading?',
    },
  },
  {
    comment: {
      uk: 'Чи є в комплекті сертифікат відповідності та безпеки для салонів краси?',
      ru: 'Есть ли в комплекте сертификат соответствия и безопасности для салонов красоты?',
      en: 'Does this product come with safety compliance certificates for beauty salons?',
    },
  },
];

export const CUSTOMER_NOTES = [
  {
    uk: 'Будь ласка, зателефонуйте за 30 хвилин до доставки кур’єром.',
    ru: 'Пожалуйста, позвоните за 30 минут до доставки курьером.',
    en: 'Please call 30 minutes before courier delivery.',
  },
  {
    uk: 'Покладіть, будь ласка, пробник нового відтінку пігменту для губ.',
    ru: 'Положите, пожалуйста, пробник нового оттенка пигмента для губ.',
    en: 'Please include a sample of the new lip pigment shade if available.',
  },
  {
    uk: 'Доставка потрібна після 18:00 або на вихідних.',
    ru: 'Доставка нужна после 18:00 или на выходных.',
    en: 'Delivery needed after 6:00 PM or during the weekend.',
  },
  {
    uk: 'Прошу упакувати флакони з пігментами максимально надійно.',
    ru: 'Прошу упаковать флаконы с пигментами максимально надежно.',
    en: 'Please pack the pigment bottles with extra protective wrap.',
  },
  {
    uk: 'Залишити замовлення у консьєржа, код домофону 42.',
    ru: 'Оставить заказ у консьержа, код домофона 42.',
    en: 'Leave the order with the concierge, door code 42.',
  },
];

export const ORDER_ADMIN_NOTES = [
  {
    uk: 'Оплата підтверджена через розрахунковий рахунок ФОП.',
    ru: 'Оплата подтверждена через расчетный счет ФОП.',
    en: 'Payment verified via commercial bank transfer.',
  },
  {
    uk: 'Клієнт попросив додати додатковий набір мікробрашів за телефоном.',
    ru: 'Клиент попросил добавить дополнительный набор микробрашей по телефону.',
    en: 'Customer requested adding an extra pack of microbrushes by phone.',
  },
  {
    uk: 'Постійний покупець. Вкладено бонусний подарунок до замовлення.',
    ru: 'Постоянный покупатель. Вложен бонусный подарок к заказу.',
    en: 'Loyal customer. Bonus gift sample added to parcel.',
  },
  {
    uk: 'Експрес-відправка узгоджена на вечірній рейс Нової Пошти.',
    ru: 'Экспресс-отправка согласована на вечерний рейс Новой Почты.',
    en: 'Express dispatch scheduled for the evening courier batch.',
  },
  {
    uk: 'Уточнені деталі відтінку пігменту — узгоджено заміну на тон Dark Brunette.',
    ru: 'Уточнены детали оттенка пигмента — согласована замена на тон Dark Brunette.',
    en: 'Pigment shade clarified — customer confirmed swap to Dark Brunette.',
  },
];

export const USER_ADMIN_NOTES = [
  {
    uk: 'Топ-майстер та викладач курсів ПМ. Замовляє картриджі та пігменти оптом.',
    ru: 'Топ-мастер и преподаватель курсов ПМ. Заказывает картриджи и пигменты оптом.',
    en: 'Senior PMU artist and academy instructor. Bulk purchaser of needles and pigments.',
  },
  {
    uk: 'Пріоритетне обслуговування. Надано індивідуальну знижку майстра 10%.',
    ru: 'Приоритетное обслуживание. Предоставлена индивидуальная скидка мастера 10%.',
    en: 'Priority client account with 10% professional discount tier.',
  },
  {
    uk: 'Працює переважно на мінеральних пігментах. Цікавиться презентаціями новинок.',
    ru: 'Работает преимущественно на минеральных пигментах. Интересуется новинками.',
    en: 'Specializes in mineral pigment shading. Interested in new product releases.',
  },
  {
    uk: 'Студія нарощування вій. Постійні регулярні замовлення клею та палеток.',
    ru: 'Студия наращивания ресниц. Постоянные регулярные заказы клея и палеток.',
    en: 'Lash extension studio. Recurring monthly orders for glues and trays.',
  },
];

export const SUPPORT_MESSAGE_TEMPLATES = [
  {
    subject: {
      uk: 'Консультація щодо підбору гібридного пігменту',
      ru: 'Консультация по подбору гибридного пигмента',
      en: 'Inquiry about hybrid pigment selection',
    },
    text: {
      uk: 'Добрий день! Підкажіть, який відтінок краще обрати для клієнтки з теплою світлою шкірою?',
      ru: 'Добрый день! Подскажите, какой оттенок лучше выбрать для клиентки с теплой светлой кожей?',
      en: 'Hello! Could you advise which shade works best for a client with warm fair skin tone?',
    },
  },
  {
    subject: {
      uk: 'Запит на оптовий прайс для навчальної студії',
      ru: 'Запрос на оптовый прайс для обучающей студии',
      en: 'Wholesale price request for training academy',
    },
    text: {
      uk: 'Вітаю! Плануємо закупівлю стартових наборів для студентів. Чи діють спеціальні умови від 10 шт?',
      ru: 'Здравствуйте! Планируем закупку стартовых наборов для студентов. Действуют ли скидки от 10 шт?',
      en: 'Hello! We are planning to buy starter student kits. Are there bulk discounts for 10+ kits?',
    },
  },
  {
    subject: {
      uk: 'Питання щодо гарантії на машинку Defenderr',
      ru: 'Вопрос по гарантии на машинку Defenderr',
      en: 'Warranty terms question for Defenderr pen',
    },
    text: {
      uk: 'Добрий день! Які умови офіційного сервісного обслуговування та гарантії на апарат?',
      ru: 'Добрый день! Каковы условия официального сервисного обслуживания и гарантии на аппарат?',
      en: 'Good day! What are the official warranty service terms for the PMU machine?',
    },
  },
  {
    subject: {
      uk: 'Уточнення термінів відправки замовлення',
      ru: 'Уточнение сроков отправки заказа',
      en: 'Order dispatch time clarification',
    },
    text: {
      uk: 'Підкажіть, чи буде замовлення відправлено сьогодні, якщо оплата пройшла до 14:00?',
      ru: 'Подскажите, будет ли заказ отправлен сегодня, если оплата прошла до 14:00?',
      en: 'Could you confirm if the package will be dispatched today if paid before 2:00 PM?',
    },
  },
];
