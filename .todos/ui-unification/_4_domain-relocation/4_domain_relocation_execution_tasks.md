# Phase 4: Domain Relocation Implementation Tasks

> **Parent Execution Recommendation**: 🔴 Gemini 3.1 Pro (High) - 6 files

## Task 1: Relocate Marketing & Home Components
- 🟡 Gemini 3.6 Flash (Medium) - 3 files
- [x] Move `HeroCarousel`, `FeaturedSections`, `DiscountsSection` to `src/features/home/components/`.
- [x] Update imports in `src/features/home/HomeView.js`.

## Task 2: Relocate Shell & Layout Components
- 🟡 Gemini 3.6 Flash (Medium) - 2 files
- [x] Move `Footer` to `src/features/shell/components/`.
- [x] Move `NewArrivalsFooter` to `src/features/catalog/components/`.
- [x] Update imports in `app/(store)/_layout.js` and `src/features/catalog/CatalogView.js`.

## Task 3: Relocate Order Components
- 🟢 Gemini 3.6 Flash (Low) - 1 file
- [x] Move `OrderCard` to `src/features/orders/components/`.
- [x] Update imports in `app/(store)/orders/index.js`.

## Task 4: Verification & Audit
- 🟢 Gemini 3.6 Flash (Low) - 0 files
- [x] Verify clean directory structure with zero business components left in `src/components/`.
- [x] Run application build & smoke tests.

