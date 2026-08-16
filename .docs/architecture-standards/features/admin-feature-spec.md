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
├── Analytics/               # Sub-feature: Sales & Performance Analytics
└── index.js                 # Public API exports (`AdminPanel`)
```

---

## 3. RBAC Role Tiers and Security (`adminDomain.js`, `authPolicy.js`)

Access to the Admin Feature is strictly governed by the **RBAC Policy**:
- **Authentication**: Evaluated by `checkIsAdmin(user)` in `adminDomain.js`.
- **Role Detection**: Admin privileges are granted through one of three mechanisms:
  1. `user.role === 'admin'` or `user.isAdmin === true`
  2. Custom claims: `user.customClaims?.admin === true` or `user.claims?.role === 'admin'`
  3. Pre-authorized email domain/address (`admin@pigment-shop.com` or starts with `admin@`).
- **Hook Integration**: The UI layers utilize `useAdminAuth()` to enforce boundaries and expose `isAdmin` flag and `logoutAdmin` action.

---

## 4. Admin Catalog State (`adminCatalogState.js`)

Admin edits (e.g., adding/updating products and categories) are managed through a dedicated reactive state manager: **`AdminCatalogState`**.
- **Draft Mutations**: Mutations are made in-memory and decoupled from the main persistence layer (`catalogStore`).
- **Hooks Bound to Drafts**: `useAdminDrafts()` from `adminDomain.js` allows admin components to subscribe to draft categories/products and trigger mutations without causing full app-wide re-renders.
- **Dirty Tracking**: `adminCatalogState` tracks dirty state (`isDirty`) enabling UI feedback when unsaved changes exist.

---

## 5. Persistence Workflow and Sticky Footer (`AdminSaveFooter.js`)

The admin experience employs a "bulk apply" workflow for catalog changes rather than auto-saving each keystroke.
- **Sticky Footer Action Bar**: When `isDirty` is true, the `AdminSaveFooter` appears, offering "Save Changes" or "Discard" actions.
- **Admin Actions Hook**: Form actions bind to `useAdminActions()`, which manages the transition of drafts into persistent state via `saveDrafts`, `resetBannersToSeed`, `updateBanners`, and `regenerateDatabase` operations.

---

## 6. Public API Contract (`index.js`)

```javascript
export { default as AdminPanel } from './AdminPanel';
```
