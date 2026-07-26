# Engineering Standard: Domain Relocation Architecture

> [!NOTE]
> Defines the migration strategy for moving business-domain sections out of root `src/components/` into proper feature domains under `src/features/`.

---

## 1. Domain Extraction Map

| Component / Section | Current Path | Target Feature Domain | Domain Responsibility |
| :--- | :--- | :--- | :--- |
| **`HeroCarousel`** | `src/components/HeroCarousel` | `src/features/home/components/HeroCarousel` | Storefront marketing & hero banners |
| **`FeaturedSections`** | `src/components/FeaturedSections.js` | `src/features/home/components/FeaturedSections` | Storefront curated collection grids |
| **`DiscountsSection`** | `src/components/DiscountsSection.js` | `src/features/home/components/DiscountsSection` | Storefront promotional campaign banners |
| **`Footer`** | `src/components/Footer.js` | `src/features/shell/components/Footer` | Global storefront shell footer |
| **`NewArrivalsFooter`** | `src/components/NewArrivalsFooter.js` | `src/features/catalog/components/NewArrivalsFooter` | Catalog-specific collection footer |
| **`OrderCard`** | `src/components/OrderCard.js` | `src/features/orders/components/OrderCard` | User order item summary card |
