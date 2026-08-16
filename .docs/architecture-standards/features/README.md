# AI Agent Guide: Feature Architecture (`src/features/`)

> [!NOTE]
> All feature modules and user screens in `src/features/` must comply with [`_reference-feature-spec.md`](./_reference-feature-spec.md) and their respective domain specifications below.

---

## Core Feature Reference Architecture

- **Parent Reference Standard:** [`_reference-feature-spec.md`](./_reference-feature-spec.md) — Master guide for feature directory boundaries (`components/`, `hooks/`, `styles/`), `index.js` public contracts, and page structure.

---

## Feature Specifications Index

| Feature / Domain | File Link | AI Agent Purpose & Description |
| :--- | :--- | :--- |
| **Parent Reference Spec** | [`_reference-feature-spec.md`](./_reference-feature-spec.md) | Master specification for feature module rules, layer partitioning, and public API contracts. |
| **Admin** | [`admin-feature-spec.md`](./admin-feature-spec.md) | Back-office CRUD (products, categories, banners, media, orders, users) and analytics. |
| **Auth** | [`auth-feature-spec.md`](./auth-feature-spec.md) | Customer authentication, login/register forms, password recovery, auth modal. |
| **Cart** | [`cart-feature-spec.md`](./cart-feature-spec.md) | Shopping cart drawer, line items management, price summary, checkout handoff logic. |
| **Catalog** | [`catalog-feature-spec.md`](./catalog-feature-spec.md) | Product discovery grid, faceted category filters, sorting bar, pagination hooks. |
| **Contact** | [`contact-feature-spec.md`](./contact-feature-spec.md) | Customer inquiry form, physical store locations, contact info display. |
| **Favorites** | [`favorites-feature-spec.md`](./favorites-feature-spec.md) | Customer wishlist grid, favorite toggle button, persistence hooks. |
| **Home** | [`home-feature-spec.md`](./home-feature-spec.md) | Storefront landing page, hero promotional banner, category showcases, marketing blocks. |
| **Orders** | [`orders-feature-spec.md`](./orders-feature-spec.md) | Multi-step checkout, order history listing, order detail invoice views, status tracking. |
| **Product** | [`product-feature-spec.md`](./product-feature-spec.md) | Product Detail Page (PDP), media gallery, option swatches, pricing calculation, reviews. |
| **Profile** | [`profile-feature-spec.md`](./profile-feature-spec.md) | Customer account overview, profile editing, address book, security settings. |
| **Shell** | [`shell-feature-spec.md`](./shell-feature-spec.md) | Global app frame, header, footer, mobile navigation drawer, top notification bar. |
