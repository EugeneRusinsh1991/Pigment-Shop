# Phase 4: Domain Relocation Migration & Audit Plan

## Audit Results: Current File Usage

- **`HeroCarousel`**:
  - `src/features/home/HomeView.js`
- **`FeaturedSections`**:
  - `src/features/home/HomeView.js`
- **`DiscountsSection`**:
  - `src/features/home/HomeView.js`
- **`Footer` / `NewArrivalsFooter`**:
  - `app/(store)/_layout.js`
  - `src/features/catalog/CatalogView.js`
- **`OrderCard`**:
  - `app/(store)/orders/index.js`

## Migration Plan Steps

1. Relocate domain files from `src/components/` to `src/features/[domain]/components/`.
2. Update imports in `HomeView.js`, `app/(store)/_layout.js`, `CatalogView.js`, and `app/(store)/orders/index.js`.
3. Verify zero orphan domain files left in `src/components/`.
