# UI Architecture Refactoring & Primitive Extraction Roadmap

## Overview
While core primitives (Typography, Card, Badge, Button, TextField, Modal, Drawer, Toggle, Media) have been extracted into modular component structures, several legacy and orphan UI elements still exist at the root level of `src/components/` or embedded within specific domain views.

This document outlines candidate elements for extraction into dedicated UI architecture primitives.

---

## 1. Feedback & Status System (`src/components/Feedback/` or `src/components/Toast/`)

### Candidate Components
- [ToastView.js](file:///d:/Magazine/_PigmentShop/src/components/ToastView.js)
- [EmptyState.js](file:///d:/Magazine/_PigmentShop/src/components/EmptyState.js)
- [FieldError.js](file:///d:/Magazine/_PigmentShop/src/components/FieldError.js)
- [SkeletonLoader.js](file:///d:/Magazine/_PigmentShop/src/components/SkeletonLoader.js)

### Recommended Architecture
Extract a unified feedback layer under `src/components/Feedback/`:
- **`Toast/`**: Global notifications, auto-dismiss banners, action toasts.
- **`Skeleton/`**: Skeleton loader shapes (text block, card skeleton, avatar placeholder).
- **`EmptyState/`**: Reusable empty state views with icons, headers, and call-to-action buttons.
- **`InlineError/`**: Standardized field-level and form-level error message display.

---

## 2. Navigation Primitives (`src/components/Navigation/`)

### Candidate Components
- [Breadcrumb.js](file:///d:/Magazine/_PigmentShop/src/components/Breadcrumb.js)
- [PageNavigation.js](file:///d:/Magazine/_PigmentShop/src/components/PageNavigation.js)

### Recommended Architecture
Create a dedicated `src/components/Navigation/` package:
- **`Breadcrumbs/`**: Dynamic path hierarchy navigation with semantic links and separators.
- **`Pagination/`**: Page selector, item-per-page controls, and step navigation.

---

## 3. Motion & Animation Wrappers (`src/components/Animation/` or `src/components/Motion/`)

### Candidate Components
- [PageTransition.js](file:///d:/Magazine/_PigmentShop/src/components/PageTransition.js)
- [ScrollFadeUp.js](file:///d:/Magazine/_PigmentShop/src/components/ScrollFadeUp.js)

### Recommended Architecture
Consolidate motion primitives under `src/components/Motion/`:
- **`FadeUp/`**: Scroll-triggered or mount-triggered reveal animations.
- **`PageTransition/`**: Route transition wrapper for smooth view mounting.

---

## 5. User-Facing Location Mapping (Where to find them in the app)

| UI Element / Primitive | App Screen / Context | User Visual Experience |
| :--- | :--- | :--- |
| **`ToastView`** | Storefront & Admin (Global) | Pop-up notifications (e.g., "Added to Cart", "Changes saved"). |
| **`SkeletonLoader`** | Catalog, Product Details, Admin Tables | Shimmering placeholder boxes while data is fetching. |
| **`EmptyState`** | Cart, Catalog search, Admin tables | "No items found" or "Your cart is empty" screens with icons & actions. |
| **`FieldError`** | Checkout, Login, Admin forms | Red error text directly under invalid input fields. |
| **`Breadcrumb`** | Product detail pages, Sub-categories | Top navigation path (e.g., `Home / Catalog / Acrylics`). |
| **`PageNavigation`** | Catalog bottom, Admin table footers | Pagination controls (Previous, 1, 2, 3, Next). |
| **`PageTransition`** | Full app | Smooth view/screen mount fade animations. |
| **`ScrollFadeUp`** | Home page & landing content | Content blocks fading in gracefully as the user scrolls down. |
| **`HeroCarousel`** | Storefront Home Page | Top hero slider banner showcasing featured campaigns. |
| **`FeaturedSections` / `DiscountsSection`** | Storefront Home Page | Promotional product carousels and discount banners. |
| **`Footer`** | Bottom of all pages | Global site footer containing links, copyright, and social icons. |

