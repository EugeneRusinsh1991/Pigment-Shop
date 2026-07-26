# Domain Relocation Architecture Specification

## Domain Target Mapping

```
src/features/
├── home/
│   └── components/
│       ├── HeroCarousel/        # Moved from src/components/HeroCarousel
│       ├── FeaturedSections.js  # Moved from src/components/FeaturedSections.js
│       └── DiscountsSection.js # Moved from src/components/DiscountsSection.js
├── catalog/
│   └── components/
│       └── NewArrivalsFooter.js # Moved from src/components/NewArrivalsFooter.js
├── shell/
│   └── components/
│       └── Footer.js            # Moved from src/components/Footer.js
└── orders/
    └── components/
        └── OrderCard.js         # Moved from src/components/OrderCard.js
```

## Migration Strategy
1. Move components to designated `src/features/[domain]/components/` folders.
2. Create re-export barrels in legacy locations temporarily if needed or update imports directly.
3. Update imports across screens and Expo Router pages.
