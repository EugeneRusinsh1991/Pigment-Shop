# Feature Specification: Admin Module (`src/features/admin/`)

> [!NOTE]
> Specification for the administrative dashboard, management tab bars, CRUD interfaces (Products, Categories, Banners, Media, Orders, Users), and analytics.

---

## 1. Domain Responsibility

The **Admin Feature** manages back-office operations for store administrators:
- **Product Management (`Products/`)**: Product listing, creation/editing form modals, inventory & price updates.
- **Category Management (`Categories/`)**: Category hierarchy, order sorting, icon assignment.
- **Banner & Content (`Banners/`, `Media/`)**: Marketing banners, image upload, media library management.
- **Order Processing (`Orders/`)**: Admin order status updates, fulfillment details, customer notes.
- **User Administration (`Users/`)**: User roles, customer management, status toggles.
- **Analytics (`Analytics/`)**: Revenue charts, popular products metrics, sales summary.

---

## 2. Directory Layout & Sub-features

```text
src/features/admin/
├── AdminPanel.js            # Main dashboard container & sub-tab router
├── AdminPanelStyles.js      # Dashboard layout styling
├── AdminTabBar.js           # Admin navigation tab bar
├── AdminSaveFooter.js       # Sticky bulk save/cancel action bar
├── FormModalLayout.js       # Reusable layout for CRUD modal forms
├── SharedFormComponents.js  # Form inputs specific to admin workflows
├── LanguageTabs.js          # Multi-language editing switcher
├── Products/                # Sub-feature: Product CRUD
├── Categories/              # Sub-feature: Category CRUD
├── Banners/                 # Sub-feature: Banner & Promo CRUD
├── Media/                   # Sub-feature: Media Library & Asset Upload
├── Orders/                  # Sub-feature: Admin Order Management
├── Users/                   # Sub-feature: User Management
├── Analytics/              # Sub-feature: Sales & Performance Analytics
└── index.js                 # Public API exports (`AdminPanel`)
```

---

## 3. Public API Contract (`index.js`)

```javascript
export { default as AdminPanel } from './AdminPanel';
```
