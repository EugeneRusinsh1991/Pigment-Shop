# Admin Panel Typography and Text Standardization Audit & System Proposal

## 1. Executive Summary & Objective

The objective of this document is to perform a comprehensive audit of all typography and visual text elements used across the entire Admin Panel (`src/features/admin/`) and standardize them by adopting the project's existing core design system tokens.

### Architectural Constraint: Unified Visual Language
The Admin Panel is an integral module of the application, not an independent product. Therefore:
* **No Parallel Typography System:** We will **not** create a separate or parallel `adminTypography` scale (e.g., `adminPageTitle`, `adminBodyMain`). 
* **Direct Token Consumption:** The Admin Panel will strictly consume the existing core typography scale (`display`, `h1`, `h2`, `h3`, `h4`, `subtitle1`, `subtitle2`, `body1`, `body2`, `caption`, `label`, `overline`) defined in [src/theme/typography.js](file:///d:/Magazine/_PigmentShop/src/theme/typography.js) and [src/components/ui/Text/TextStyles.js](file:///d:/Magazine/_PigmentShop/src/components/ui/Text/TextStyles.js).
* **Minimalist Additions:** New tokens are introduced **only** if a genuine gap exists that cannot be satisfied by the current core system, with clear justification.

Currently, admin modules (`Orders`, `Products`, `Categories`, `Users`, `Banners`, `Analytics`, `Media`) frequently bypass core variants by passing arbitrary inline `size` props (`size={11}`, `size={13}`, `size={15}`) or applying raw inline CSS styles. This triggers dynamic typography warnings (`warnFontOverrides`), produces visual inconsistencies, and fragments the user experience.

This document presents:
1. **A Complete Audit** of all font sizes, font weights, line heights, text colors, hierarchy, and component text usages across all admin pages.
2. **Identification of Inconsistencies** between modules serving identical UI purposes.
3. **A Direct Mapping Proposal** connecting every Admin UI role to an existing core typography variant.
4. **Visual Consistency Standards** for Buttons, Badges, Chips/Filters, DataTables, Modals, Empty States, Status Labels, and Controls.
5. **Exhaustive File & Component Mapping** covering 100% of affected files.
6. **A Prioritized Implementation Plan** for systematic refactoring without breaking existing features.

> [!IMPORTANT]
> **Directive:** Do **not** implement any code changes yet. This document serves as the authoritative blueprint for future development.

---

## 2. Comprehensive Admin Panel Typography Audit

### 2.1 Existing Core Infrastructure Analysis

* **Core Token System:** [src/theme/typography.js](file:///d:/Magazine/_PigmentShop/src/theme/typography.js) defines the foundational scale:
  * Sizes: `xxs: 10`, `xs: 12`, `sm: 14`, `md: 16`, `lg: 20`, `xl: 24`, `xxl: 28`, `display: 36`.
  * Weights: `regular: '400'`, `medium: '500'`, `semibold: '600'`, `bold: '700'`.
  * Core Variants:
    * `display` (36px / 42px LH / Bold)
    * `h1` (28px / 34px LH / Bold)
    * `h2` (24px / 30px LH / Bold)
    * `h3` (20px / 28px LH / Semibold)
    * `h4` (16px / 24px LH / Semibold)
    * `subtitle1` (16px / 24px LH / Medium)
    * `subtitle2` (14px / 20px LH / Medium)
    * `body1` (16px / 24px LH / Regular)
    * `body2` (14px / 20px LH / Regular)
    * `caption` (12px / 16px LH / Regular)
    * `label` (12px / 16px LH / Medium)
    * `overline` (10px / 14px LH / Bold / Uppercase)
* **Text Primitive:** [src/components/ui/Text/Text.js](file:///d:/Magazine/_PigmentShop/src/components/ui/Text/Text.js) wraps React Native `Text` and applies `TextStyles.js`. However, `Text.js` includes a runtime check (`warnFontOverrides`) that flags custom font overrides (`fontSize`, `lineHeight`, `fontWeight`, `fontFamily`) when passed via `style` or individual props.
* **Current Issue:** Nearly every admin screen generates console warnings due to ad-hoc props like `size={13}`, `size={15}`, `weight="700"`, `weight="bold"`, or raw `fontSize: 14` inline style overrides instead of consuming core variants.

---

### 2.2 Section-by-Section Typography & Hierarchy Audit

#### A. Global Admin Shell & Navigation
* **Files Responsible:** [AdminPanel.js](file:///d:/Magazine/_PigmentShop/src/features/admin/AdminPanel.js), [AdminTabBar.js](file:///d:/Magazine/_PigmentShop/src/features/admin/AdminTabBar.js), [AdminSaveFooter.js](file:///d:/Magazine/_PigmentShop/src/features/admin/AdminSaveFooter.js), [LanguageTabs.js](file:///d:/Magazine/_PigmentShop/src/features/admin/LanguageTabs.js).
* **Observed Typography:**
  * Admin Title / Header: `h2` variant (`fontSize: 24`, `fontWeight: 700`, `lineHeight: 30`).
  * Admin Tab Bar Items: Raw `Text` with `fontSize: 14`, `fontWeight: '600'` / `'500'`.
  * Language Tabs: Small inline pills with `fontSize: 12`, `fontWeight: '600'`.
  * Save Footer: Action button text uses `size={14}` weight `600`, message uses `size={13}`.
* **Inconsistencies:** Tab bar labels use explicit numeric font sizes instead of core `label` (`12px`) or `subtitle2` (`14px medium`).

#### B. Orders Module
* **Files Responsible:** [OrdersManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrdersManager.js), [OrdersStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrdersStyles.js), [OrdersTable.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrdersTable.js), [OrderRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderRow.js), [OrdersTableControls.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrdersTableControls.js), [OrderDetails.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderDetails.js), [OrderCustomerCard.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderCustomerCard.js), [OrderItemsList.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderItemsList.js), [AdminNoteSection.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/AdminNoteSection.js), [OrderStatusDropdownMenu.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderStatusDropdownMenu.js).
* **Observed Typography:**
  * Order Number (ID): Uses `size={14}`, `weight="bold"` (`#A1B2C`) in desktop and mobile rows.
  * Customer Name: Uses `size={14}`, `weight="bold"`, `numberOfLines={1}`.
  * Total Price: Desktop row uses `variant="body2"` with `weight="bold"` (`fontSize: 14`), whereas mobile row uses `size={15}` with `weight="700"`.
  * Order Date: Uses `size={12}` in desktop row and `size={12}` in mobile row.
  * Notes Indicators & Badges: Customer note pill uses non-standard `size={11}` with `weight="600"` / `"400"`. Meta labels use `variant="overline"` (`fontSize: 10`), while meta values override with `size={13}` weight `"600"`.
* **Inconsistencies:**
  * Price text uses `size={14}` in desktop vs `size={15}` in mobile.
  * `size={11}` is used for note indicators, which is an un-tokenized size (tokens only define `10` [xxs] and `12` [xs]).

#### C. Products Module
* **Files Responsible:** [ProductsManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductsManager.js), [ProductsStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductsStyles.js), [ProductsTable.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductsTable.js), [ProductRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductRow.js), [ProductRowComponents.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductRowComponents.js), [ProductRowVariants.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductRowVariants.js), [MobileProductRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/MobileProductRow.js), [ProductsFilterBar.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductsFilterBar.js), [ProductFormModal.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductFormModal.js), [ProductFormFields.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductFormFields.js), [ProductFormStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductFormStyles.js).
* **Observed Typography:**
  * Product Name: `ProductRowVariants.js` uses `styles.productName` (raw styles), while `MobileProductRow.js` uses `size={14}` `weight="bold"`.
  * Index Column (#): Standard desktop row uses default body text; dense variant uses `size={13}`.
  * Price: Desktop row uses `$price` styling, mobile row uses `size={15}` `weight="700"`.
  * Meta Grid (Brand, Stock): Uses `size={12}` inline label and `size={12}` `weight="600"` value.
* **Inconsistencies:** Desktop product rows rely on custom CSS classes (`styles.productName`), whereas mobile rows use `<Text size={14} weight="bold">`.

#### D. Categories Module
* **Files Responsible:** [CategoriesManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoriesManager.js), [CategoriesStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoriesStyles.js), [CategoryRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryRow.js), [CategoryRowElements.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryRowElements.js), [CategoryTree.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryTree.js), [CategoryFormModal.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryFormModal.js), [CategoryFormFields.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryFormFields.js), [CategoryFormStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryFormStyles.js), [CategoryProductSection.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryProductSection.js).
* **Observed Typography:**
  * Tree Item Label: Custom font styles defined in `CategoriesStyles.js` (`fontSize: 14`, `fontWeight: '600'`).
  * Modal Titles & Section Headers: Uses `h3` (`fontSize: 20`) in `CategoryFormModal.js`, but `size={16}` `weight="bold"` in `CategoryProductSection.js`.

#### E. Users Module
* **Files Responsible:** [UsersManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UsersManager.js), [UsersStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UsersStyles.js), [UserRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserRow.js), [UserDetails.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserDetails.js), [UserInfoCard.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserInfoCard.js), [UserNoteSection.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserNoteSection.js), [UserOrdersList.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserOrdersList.js).
* **Observed Typography:**
  * User Full Name: Uses `size={14}` `weight="bold"` (`UserRow.js`). Sub-meta (Email/Phone) uses `size={13}`.
  * Detail Section Headers: `UserDetails.js` uses `size={16}` `weight="bold"`, while `UserNoteSection.js` uses `size={14}` `weight="bold"`.

#### F. Banners, Analytics & Media Modules
* **Files Responsible:** [BannersManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Banners/BannersManager.js), [AnalyticsDashboard.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/AnalyticsDashboard.js), [MediaBrowser.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Media/MediaBrowser.js).
* **Observed Typography:**
  * Analytics Metrics: `fontSize: 28` (`h1` equivalent) or `fontSize: 36` (`display` equivalent).
  * Banner Titles: `fontSize: 15` (un-tokenized). Media browser metadata: `fontSize: 11` (un-tokenized).

---

### 2.3 Key Inconsistencies Summary Table

| UI Purpose | Component / File A | Current Style | Target Core Variant | Unified Benefit |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Entity Name** | `OrderRow.js` (Customer) | `size={14} weight="bold"` | `subtitle2` (14px, Medium/Semi) | Standardized 14px row title across all tables |
| **Entity ID / Code** | `OrderRow.js` (#Order) | `size={14} weight="bold"` | `code` (13px, Monospace) *(Proposed Shared Token)* | Distinct tabular formatting for IDs & hashes |
| **Price Display** | `MobileOrderRow.js` | `size={15} weight="700"` | `subtitle2` (14px, Medium/Semi) | Eliminates un-tokenized 15px step |
| **Secondary Metadata** | `UserRow.js` (Email) | `size={13}` | `caption` (12px, Regular) | Replaces random 13px subtext with core 12px caption |
| **Section Title** | `UserDetails.js` | `size={16} weight="bold"` | `h4` (16px, Semibold) | Unified 16px section headers in drawers & modals |
| **Pill / Indicator Text** | `OrderRow.js` (Note Pill) | `size={11} weight="600"` | `overline` (10px, Uppercase) or `label` (12px) | Fits core scale steps (10px or 12px) |
| **Chart Axis Labels** | `RevenueChart.js` | `fontSize="9"` (SVG) | `overline` / `caption` (10px / 12px) | Clean chart label scale |

---

## 3. Unified Typography System Mapping Proposal

Instead of creating new variants for the admin panel, we map every Admin UI role directly to the existing core typography system defined in `src/theme/typography.js`.

### 3.1 Mapping Admin Roles to Core Typography Tokens

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        ADMIN TO CORE TYPOGRAPHY MAPPING TABLE                          │
├──────────────────────┬───────────────────────┬──────────┬─────────────┬────────────────┤
│ Admin UI Role        │ Core System Variant   │ Size     │ Weight      │ Line Height    │
├──────────────────────┼───────────────────────┼──────────┼─────────────┼────────────────┤
│ Top Metric KPI       │ display / h1          │ 36 / 28px│ Bold (700)  │ 42 / 34px      │
│ Main Admin Page Title│ h2                    │ 24px     │ Bold (700)  │ 30px           │
│ Modal / Drawer Header│ h3                    │ 20px     │ Semi (600)  │ 28px           │
│ Card / Section Header│ h4                    │ 16px     │ Semi (600)  │ 24px           │
│ Primary Content      │ body1                 │ 16px     │ Regular(400)│ 24px           │
│ Table Cell Main / Name│ subtitle2             │ 14px     │ Medium (500)│ 20px           │
│ Table Cell Body      │ body2                 │ 14px     │ Regular(400)│ 20px           │
│ Table Header (TH)    │ overline              │ 10px     │ Bold (700)  │ 14px (UPPER)   │
│ Form Label           │ label                 │ 12px     │ Medium (500)│ 16px           │
│ Subtext / Timestamp  │ caption               │ 12px     │ Regular(400)│ 16px           │
│ Button / Badge Text  │ label / subtitle2     │ 12 / 14px│ Medium (500)│ 16 / 20px      │
│ Order / Product ID   │ code *(Proposed Shared)│ 13px    │ Semi (Mono) │ 18px           │
└──────────────────────┴───────────────────────┴──────────┴─────────────┴────────────────┘
```

---

### 3.2 Evaluation & Justification of Proposed Additions

To adhere strictly to the rule of **prioritizing reuse over creation**, we evaluate potential additions against the core design system:

#### Proposed New Core Variant: `code` (Monospace Token)
* **Definition:** `{ fontSize: 13, lineHeight: 18, fontWeight: '600', letterSpacing: 0.5, fontFamily: Platform.select({ ios: 'Courier', android: 'monospace', web: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }) }`
* **Justification:** 
  1. Both the public app (Order Confirmation, Checkout Receipt, Tracking page) and the Admin Panel (Order Manager, Product SKU manager, User ID tags) display system-generated hashes, SKUs, and order numbers (`#A1B2C`).
  2. The current design system lacks a dedicated token for technical code/ID data, forcing developers to use raw inline font overrides.
  3. Adding `code` to `src/theme/typography.js` enriches the shared design system for **both** the public app and the admin panel, maintaining 100% architectural alignment.

> [!NOTE]
> All other admin text requirements (headers, labels, subtext, body text, table content) are **100% satisfied** by existing core variants (`display`, `h1`-`h4`, `subtitle1`, `subtitle2`, `body1`, `body2`, `caption`, `label`, `overline`). **No other new variants are needed.**

---

## 4. Visual Consistency Beyond Typography

By reusing core design system variants across all modules, we establish visual harmony beyond text elements:

### 4.1 Button Text Styles
* **Primary / Secondary Buttons:** Standardize on core `label` variant (`fontSize: 12`, `fontWeight: 500`, `letterSpacing: 0.5`) for small buttons, and `subtitle2` (`fontSize: 14`, `fontWeight: 500`) for standard buttons.
* **Table Action Buttons (Edit / Delete / Details):** Standardize on `caption` (`fontSize: 12`, `fontWeight: 400`).

### 4.2 Badge & Indicator Text Styles
* **Status Badges (`Badge.js`):** Standardize text across all status badges (`pending`, `processing`, `completed`, `cancelled`, `active`, `inactive`) to core `label` variant (`fontSize: 12`, `fontWeight: 500`).
* **Count Badges (Table Headers & Tabs):** Standardize on `overline` variant (`fontSize: 10`, `fontWeight: 700`).

### 4.3 Chip & Filter Text
* **Filter Bar Tabs (`ProductsFilterBar.js`, `OrdersTableControls.js`):** Standardize active and inactive tab items on `label` (`fontSize: 12`, `fontWeight: 500`).
* **Language Switcher Tabs (`LanguageTabs.js`):** Standardize on `label` (`fontSize: 12`, `fontWeight: 500`).

### 4.4 Table and List Row Typography
* **Table Column Headers (`DataTableStyles.js`):** Standardize header text (`thText`) to core `overline` (`fontSize: 10`, `fontWeight: 700`, uppercase, muted color).
* **Primary Cell Content (Name, Title):** Standardize on `subtitle2` (`14px` medium).
* **Entity IDs (#Order, SKU):** Standardize on shared `code` variant (`13px` monospace).
* **Numeric Data (Price, Stock):** Align right with `subtitle2` (`14px` medium) using `fontVariant: ['tabular-nums']`.
* **Secondary Cell Content (Date, Subtext, Email):** Standardize on `caption` (`12px` regular).

### 4.5 Modal & Drawer Typography
* **Modal Headers (`FormModalLayout.js`):** Title uses `h3` (`fontSize: 20`, `fontWeight: 600`), description uses `caption` (`fontSize: 12`, `color: textDesc`).
* **Form Field Labels (`SharedFormComponents.js`):** Standardize on `label` (`fontSize: 12`, `fontWeight: 500`).
* **Form Helper / Error Text:** Standardize error messages on `caption` (`fontSize: 12`, `color: danger`).

### 4.6 Empty States & Status Labels
* **Empty State Primitive (`EmptyState.js`):** Title uses `h3` (`fontSize: 20`), description uses `body2` (`14px` muted text).
* **Dropdown Menus (`OrderStatusDropdownMenu.js`):** Menu item text uses `body2` (`14px`), selected item uses `subtitle2` (`14px` medium).

### 4.7 Pagination Controls
* **Pagination Text (`OrdersTableControls.js`):** Standardize count indicators and page navigation text on `caption` (`12px` regular) with highlighted total numbers in `subtitle2` (`14px` medium).

---

## 5. Affected Files Directory & Impact Analysis

The following 67 files will be refactored to consume core typography tokens directly:

### Core Architecture & Primitives
1. [src/theme/typography.js](file:///d:/Magazine/_PigmentShop/src/theme/typography.js) — Add shared `code` token to core scale.
2. [src/components/ui/Text/TextStyles.js](file:///d:/Magazine/_PigmentShop/src/components/ui/Text/TextStyles.js) — Register `code` variant in `VARIANTS` map.
3. [src/components/ui/Text/Text.js](file:///d:/Magazine/_PigmentShop/src/components/ui/Text/Text.js) — Clean warning handler and default resolution.
4. [src/components/ui/Badge/BadgeStyles.js](file:///d:/Magazine/_PigmentShop/src/components/ui/Badge/BadgeStyles.js) — Standardize text to core `label` token.
5. [src/components/ui/Button/ButtonStyles.js](file:///d:/Magazine/_PigmentShop/src/components/ui/Button/ButtonStyles.js) — Standardize text to core `label` / `subtitle2` tokens.
6. [src/components/domain/DataTable/DataTableStyles.js](file:///d:/Magazine/_PigmentShop/src/components/domain/DataTable/DataTableStyles.js) — Standardize header (`thText`) to core `overline` and row text to core `body2` / `subtitle2`.
7. [src/components/domain/DataTable/EmptyState.js](file:///d:/Magazine/_PigmentShop/src/components/domain/DataTable/EmptyState.js) — Align typography to `h3` and `body2`.

### Shared Admin Shell Components
8. [src/features/admin/AdminPanel.js](file:///d:/Magazine/_PigmentShop/src/features/admin/AdminPanel.js) & [AdminPanelStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/AdminPanelStyles.js) — Standardize header to `h2` and tab items to `label` / `subtitle2`.
9. [src/features/admin/AdminTabBar.js](file:///d:/Magazine/_PigmentShop/src/features/admin/AdminTabBar.js) — Update tab labels to `label`.
10. [src/features/admin/AdminSaveFooter.js](file:///d:/Magazine/_PigmentShop/src/features/admin/AdminSaveFooter.js) — Update message to `body2` and button text to `subtitle2`.
11. [src/features/admin/LanguageTabs.js](file:///d:/Magazine/_PigmentShop/src/features/admin/LanguageTabs.js) — Update chip typography to `label`.
12. [src/features/admin/SharedFormComponents.js](file:///d:/Magazine/_PigmentShop/src/features/admin/SharedFormComponents.js) — Standardize form labels to `label` and helper text to `caption`.
13. [src/features/admin/FormModalLayout.js](file:///d:/Magazine/_PigmentShop/src/features/admin/FormModalLayout.js) — Align modal title to `h3` and footer text to `caption`.

### Orders Feature
14. [src/features/admin/Orders/OrdersManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrdersManager.js)
15. [src/features/admin/Orders/OrdersStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrdersStyles.js)
16. [src/features/admin/Orders/OrdersTable.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrdersTable.js)
17. [src/features/admin/Orders/OrderRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderRow.js) — Replace `size={14}`, `size={15}`, `size={11}` with `code`, `subtitle2`, `caption`, `overline`.
18. [src/features/admin/Orders/OrdersTableControls.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrdersTableControls.js)
19. [src/features/admin/Orders/OrderDetails.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderDetails.js)
20. [src/features/admin/Orders/OrderCustomerCard.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderCustomerCard.js)
21. [src/features/admin/Orders/OrderItemsList.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderItemsList.js)
22. [src/features/admin/Orders/AdminNoteSection.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/AdminNoteSection.js)
23. [src/features/admin/Orders/OrderStatusSelector.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderStatusSelector.js)
24. [src/features/admin/Orders/OrderStatusDropdownMenu.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderStatusDropdownMenu.js)

### Products Feature
25. [src/features/admin/Products/ProductsManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductsManager.js)
26. [src/features/admin/Products/ProductsStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductsStyles.js)
27. [src/features/admin/Products/ProductsTable.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductsTable.js)
28. [src/features/admin/Products/ProductRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductRow.js)
29. [src/features/admin/Products/ProductRowComponents.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductRowComponents.js)
30. [src/features/admin/Products/ProductRowVariants.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductRowVariants.js)
31. [src/features/admin/Products/MobileProductRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/MobileProductRow.js)
32. [src/features/admin/Products/ProductsFilterBar.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductsFilterBar.js)
33. [src/features/admin/Products/ProductFormModal.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductFormModal.js)
34. [src/features/admin/Products/ProductFormFields.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductFormFields.js)
35. [src/features/admin/Products/ProductFormStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductFormStyles.js)

### Categories Feature
36. [src/features/admin/Categories/CategoriesManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoriesManager.js)
37. [src/features/admin/Categories/CategoriesStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoriesStyles.js)
38. [src/features/admin/Categories/CategoryRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryRow.js)
39. [src/features/admin/Categories/CategoryRowElements.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryRowElements.js)
40. [src/features/admin/Categories/CategoryTree.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryTree.js)
41. [src/features/admin/Categories/CategoryFormModal.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryFormModal.js)
42. [src/features/admin/Categories/CategoryFormFields.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryFormFields.js)
43. [src/features/admin/Categories/CategoryFormStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryFormStyles.js)
44. [src/features/admin/Categories/CategoryProductSection.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryProductSection.js)

### Users Feature
45. [src/features/admin/Users/UsersManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UsersManager.js)
46. [src/features/admin/Users/UsersStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UsersStyles.js)
47. [src/features/admin/Users/UserRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserRow.js)
48. [src/features/admin/Users/UserDetails.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserDetails.js)
49. [src/features/admin/Users/UserInfoCard.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserInfoCard.js)
50. [src/features/admin/Users/UserNoteSection.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserNoteSection.js)
51. [src/features/admin/Users/UserOrdersList.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserOrdersList.js)

### Banners Feature
52. [src/features/admin/Banners/BannersManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Banners/BannersManager.js)
53. [src/features/admin/Banners/BannersStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Banners/BannersStyles.js)

### Analytics Feature
54. [src/features/admin/Analytics/AnalyticsDashboard.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/AnalyticsDashboard.js)
55. [src/features/admin/Analytics/AnalyticsStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/AnalyticsStyles.js)
56. [src/features/admin/Analytics/DateRangePicker.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/DateRangePicker.js)
57. [src/features/admin/Analytics/DateRangeCalendar.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/DateRangeCalendar.js)
58. [src/features/admin/Analytics/DateRangeCalendarStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/DateRangeCalendarStyles.js)
59. [src/features/admin/Analytics/CalendarDayCell.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/CalendarDayCell.js)
60. [src/features/admin/Analytics/RevenueChart.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/RevenueChart.js)
61. [src/features/admin/Analytics/OrderStatusChart.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/OrderStatusChart.js)
62. [src/features/admin/Analytics/TopProductsChart.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/TopProductsChart.js)

### Media Feature
63. [src/features/admin/Media/MediaBrowser.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Media/MediaBrowser.js)
64. [src/features/admin/Media/MediaBrowserComponents.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Media/MediaBrowserComponents.js)
65. [src/features/admin/Media/MediaBrowserItem.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Media/MediaBrowserItem.js)
66. [src/features/admin/Media/MediaBrowserStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Media/MediaBrowserStyles.js)

---

## 6. Rationale Behind Recommendations

1. **Architectural Integrity & Brand Unity:** Reusing core design tokens ensures that the Admin Panel feels like a seamless extension of the main application rather than an isolated tool built with a separate design system.
2. **Zero Code Duplication:** Bypassing parallel tokens keeps the theme codebase lean, highly maintainable, and straightforward to update.
3. **Elimination of Runtime Warnings:** Replacing custom inline props (`size={...}`) with core variants (`variant="subtitle2"`, `variant="caption"`) permanently resolves dynamic font override warnings logged by `warnFontOverrides`.
4. **Enhanced Developer Experience:** Developers working on both store features and admin modules use the exact same component props (`<Text variant="body2">`), drastically lowering cognitive load.

---

## 7. Prioritized Implementation Plan for Future Development

```
  ┌───────────────────────────────────────────────────────────────────┐
  │              REFACTORING ROADMAP: CONSUMING CORE TOKENS           │
  └───────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│ PHASE 1: Core System Addition (Shared `code` Token)                  │
│ - Add `code` variant to typography.js, TextStyles.js, & Text.js.     │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│ PHASE 2: Core UI Primitives & Shell Alignment                        │
│ ├─ Phase 2.1: Shared UI Primitives (Badge, Button, DataTable, Empty) │
│ └─ Phase 2.2: Shared Admin Shell & Layouts (TabBar, Footer, Modal)   │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│ PHASE 3: Refactoring Orders & Products Modules                        │
│ ├─ Phase 3.1: Orders Table & Row Components                         │
│ ├─ Phase 3.2: Orders Drawers, Customer Cards & Dropdowns             │
│ ├─ Phase 3.3: Products Table, Row Components & Mobile Cards          │
│ └─ Phase 3.4: Products Filter Bar & Product Form Modals              │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│ PHASE 4: Refactoring Users & Categories Modules                       │
│ ├─ Phase 4.1: Categories Tree & Row Components                       │
│ ├─ Phase 4.2: Category Form Modals & Product Sections               │
│ └─ Phase 4.3: Users Table, Drawers & User Details Cards             │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│ PHASE 5: Refactoring Banners, Analytics & Media Modules              │
│ ├─ Phase 5.1: Banners Manager & Media Browser Components             │
│ ├─ Phase 5.2: Analytics Dashboard & Calendar Date Range Picker       │
│ └─ Phase 5.3: Analytics SVG Data Charts Typography                   │
└──────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────┐
│ PHASE 6: QA & Warning Cleanup Verification                           │
│ - Confirm window.__TYPOGRAPHY_WARNINGS__ reports zero entries.        │
│ - Conduct cross-browser visual QA on desktop and mobile viewports.   │
└──────────────────────────────────────────────────────────────────────┘
```

### Phase 1: Core System Addition (Shared `code` Token) — ◐ FM — 1d 3f +2r
* **Objective:** Add the missing technical `code` variant token to the shared core typography system.
* **Scope:** Core design tokens and Text primitive resolution.
* **Affected Files:**
  * [src/theme/typography.js](file:///d:/Magazine/_PigmentShop/src/theme/typography.js)
  * [src/components/ui/Text/TextStyles.js](file:///d:/Magazine/_PigmentShop/src/components/ui/Text/TextStyles.js)
  * [src/components/ui/Text/Text.js](file:///d:/Magazine/_PigmentShop/src/components/ui/Text/Text.js)
* **Implementation Tasks:**
  * Add `code` token definition (`fontSize: 13`, `lineHeight: 18`, `fontWeight: '600'`, monospace font family) to `src/theme/typography.js`.
  * Register `code` variant in `VARIANTS` lookup object in `src/components/ui/Text/TextStyles.js`.
  * Ensure `src/components/ui/Text/Text.js` resolves `variant="code"` without throwing runtime warnings.
* **Expected Outcome:** Shared `code` variant is available globally across both public store and admin panel.
* **Completion Criteria:** `<Text variant="code">` renders monospace styled text without console warnings.

---

### Phase 2.1: Shared UI Primitives Refactoring — ◕ FH — 1d 4f +2r
* **Objective:** Standardize primitive shared UI component styles to consume core variants directly.
* **Scope:** Design system primitives used across all admin features.
* **Affected Files:**
  * [src/components/ui/Badge/BadgeStyles.js](file:///d:/Magazine/_PigmentShop/src/components/ui/Badge/BadgeStyles.js)
  * [src/components/ui/Button/ButtonStyles.js](file:///d:/Magazine/_PigmentShop/src/components/ui/Button/ButtonStyles.js)
  * [src/components/domain/DataTable/DataTableStyles.js](file:///d:/Magazine/_PigmentShop/src/components/domain/DataTable/DataTableStyles.js)
  * [src/components/domain/DataTable/EmptyState.js](file:///d:/Magazine/_PigmentShop/src/components/domain/DataTable/EmptyState.js)
* **Implementation Tasks:**
  * Refactor `BadgeStyles.js` text styles to core `label` variant (`12px` medium).
  * Refactor `ButtonStyles.js` text styles to core `label` (`12px`) for small buttons and `subtitle2` (`14px`) for standard buttons.
  * Refactor `DataTableStyles.js` `thText` to core `overline` (`10px` bold uppercase) and row text to `body2` / `subtitle2`.
  * Refactor `EmptyState.js` title to `h3` (`20px`) and message body to `body2` (`14px`).
* **Expected Outcome:** Core primitives consume core tokens and emit zero font override warnings.
* **Completion Criteria:** Badges, Buttons, DataTables, and EmptyState render cleanly using core token rules.

### Phase 2.2: Shared Admin Shell & Layout Refactoring — ◕ FH — 1d 7f +2r
* **Objective:** Refactor shared admin layout headers, tab navigation bars, save footers, and modal shells.
* **Scope:** Global admin layout container components and form structural wrappers.
* **Affected Files:**
  * [src/features/admin/AdminPanel.js](file:///d:/Magazine/_PigmentShop/src/features/admin/AdminPanel.js)
  * [src/features/admin/AdminPanelStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/AdminPanelStyles.js)
  * [src/features/admin/AdminTabBar.js](file:///d:/Magazine/_PigmentShop/src/features/admin/AdminTabBar.js)
  * [src/features/admin/AdminSaveFooter.js](file:///d:/Magazine/_PigmentShop/src/features/admin/AdminSaveFooter.js)
  * [src/features/admin/LanguageTabs.js](file:///d:/Magazine/_PigmentShop/src/features/admin/LanguageTabs.js)
  * [src/features/admin/SharedFormComponents.js](file:///d:/Magazine/_PigmentShop/src/features/admin/SharedFormComponents.js)
  * [src/features/admin/FormModalLayout.js](file:///d:/Magazine/_PigmentShop/src/features/admin/FormModalLayout.js)
* **Implementation Tasks:**
  * Update admin main header title in `AdminPanel.js` to `h2` (`24px` bold).
  * Refactor `AdminTabBar.js` and `LanguageTabs.js` tab item labels to core `label` (`12px` medium).
  * Standardize `AdminSaveFooter.js` message text to `body2` (`14px`) and action button to `subtitle2` (`14px`).
  * Refactor `SharedFormComponents.js` input labels to core `label` (`12px`) and error subtext to `caption` (`12px`).
  * Align `FormModalLayout.js` modal title to `h3` (`20px`) and footer text to `caption`.
* **Expected Outcome:** Consistent global admin shell typography adhering to core design scale.
* **Completion Criteria:** Navigation tabs, form labels, modal headers, and save footers use standard core variants.

---

### Phase 3.1: Orders Table & Row Components — ◕ FH — 1d 5f +2r — Phase 3.1 [Parallel with Phase 3.3, Phase 4.1, Phase 5.1]
* **Objective:** Standardize typography across main Orders table view and desktop/mobile order rows.
* **Scope:** Orders list container, table structure, row layouts, and table pagination controls.
* **Affected Files:**
  * [src/features/admin/Orders/OrdersManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrdersManager.js)
  * [src/features/admin/Orders/OrdersStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrdersStyles.js)
  * [src/features/admin/Orders/OrdersTable.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrdersTable.js)
  * [src/features/admin/Orders/OrderRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderRow.js)
  * [src/features/admin/Orders/OrdersTableControls.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrdersTableControls.js)
* **Implementation Tasks:**
  * Replace Order ID font overrides (`size={14}`, `weight="bold"`) with core `code` variant (`13px` monospace).
  * Standardize Customer Name to `subtitle2` (`14px` medium) and Total Price to `subtitle2` (`14px` tabular).
  * Standardize Order Date and secondary row subtext to `caption` (`12px` regular).
  * Standardize Note indicator pill text from un-tokenized `size={11}` to `overline` (`10px` bold uppercase) or `label` (`12px`).
  * Refactor `OrdersTableControls.js` pagination count text to `caption` and highlight numbers to `subtitle2`.
* **Expected Outcome:** Orders table rows display standardized typography without inline size prop overrides.
* **Completion Criteria:** Desktop and mobile order rows render clean tabular typography with zero console warnings.

### Phase 3.2: Orders Drawers, Customer Cards & Dropdowns — ◕ FH — 1d 6f +2r
* **Objective:** Refactor Order details drawer, customer summary cards, line items list, and status dropdowns.
* **Scope:** Order inspect drawer, admin notes section, customer information cards, and status selectors.
* **Affected Files:**
  * [src/features/admin/Orders/OrderDetails.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderDetails.js)
  * [src/features/admin/Orders/OrderCustomerCard.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderCustomerCard.js)
  * [src/features/admin/Orders/OrderItemsList.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderItemsList.js)
  * [src/features/admin/Orders/AdminNoteSection.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/AdminNoteSection.js)
  * [src/features/admin/Orders/OrderStatusSelector.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderStatusSelector.js)
  * [src/features/admin/Orders/OrderStatusDropdownMenu.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Orders/OrderStatusDropdownMenu.js)
* **Implementation Tasks:**
  * Standardize drawer section titles in `OrderDetails.js` and `AdminNoteSection.js` to `h4` (`16px` semibold).
  * Refactor customer info labels in `OrderCustomerCard.js` to `label` (`12px`) and values to `body2` (`14px`).
  * Refactor order line items in `OrderItemsList.js` product titles to `subtitle2` (`14px`) and item price/SKU to `code` / `caption`.
  * Standardize `OrderStatusDropdownMenu.js` items to `body2` (`14px`) and active option to `subtitle2` (`14px` medium).
* **Expected Outcome:** Order detail drawer and modal components utilize standard core typography.
* **Completion Criteria:** All detail views, notes sections, and status dropdown menus render using core variants.

### Phase 3.3: Products Table, Row Components & Mobile Cards — ◕ FH — 1d 7f +2r — Phase 3.3 [Parallel with Phase 3.1, Phase 4.1, Phase 5.1]
* **Objective:** Refactor Product management tables, row variants, dense layouts, and mobile product cards.
* **Scope:** Products manager container, table views, row variants, and mobile card views.
* **Affected Files:**
  * [src/features/admin/Products/ProductsManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductsManager.js)
  * [src/features/admin/Products/ProductsStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductsStyles.js)
  * [src/features/admin/Products/ProductsTable.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductsTable.js)
  * [src/features/admin/Products/ProductRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductRow.js)
  * [src/features/admin/Products/ProductRowComponents.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductRowComponents.js)
  * [src/features/admin/Products/ProductRowVariants.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductRowVariants.js)
  * [src/features/admin/Products/MobileProductRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/MobileProductRow.js)
* **Implementation Tasks:**
  * Refactor Product Name in `ProductRowVariants.js` and `MobileProductRow.js` from raw CSS classes to `subtitle2` (`14px` medium).
  * Replace Product SKU font overrides with shared `code` variant (`13px` monospace).
  * Replace un-tokenized `size={15}` price text in mobile product rows with `subtitle2` (`14px` medium).
  * Standardize Stock count, Brand metadata, and Category tags to `caption` (`12px` regular) / `label` (`12px` medium).
  * Standardize row index (#) text to `caption` (`12px`).
* **Expected Outcome:** Unified typography across desktop product tables and mobile product cards.
* **Completion Criteria:** Product name, SKU, price, and stock indicators render consistently with zero console warnings.

### Phase 3.4: Products Filter Bar & Product Form Modals — ◕ FH — 1d 4f +2r
* **Objective:** Refactor Product filtering controls, search bar, and product edit/create form modals.
* **Scope:** Product filter bar, tab items, form modal fields, and product editor layouts.
* **Affected Files:**
  * [src/features/admin/Products/ProductsFilterBar.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductsFilterBar.js)
  * [src/features/admin/Products/ProductFormModal.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductFormModal.js)
  * [src/features/admin/Products/ProductFormFields.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductFormFields.js)
  * [src/features/admin/Products/ProductFormStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Products/ProductFormStyles.js)
* **Implementation Tasks:**
  * Standardize `ProductsFilterBar.js` active/inactive filter chips and search placeholder text to `label` (`12px` medium).
  * Refactor `ProductFormModal.js` header title to `h3` (`20px` semibold) and subtitle to `caption` (`12px`).
  * Refactor `ProductFormFields.js` field labels to core `label` (`12px`) and input helper text to `caption` (`12px`).
* **Expected Outcome:** Filter bars and product form modals consume standard core tokens.
* **Completion Criteria:** Filter tabs and form modal controls display unified typography without font warnings.

---

### Phase 4.1: Categories Tree & Row Components — ◕ FH — 1d 5f +2r — Phase 4.1 [Parallel with Phase 3.1, Phase 3.3, Phase 5.1]
* **Objective:** Standardize typography across Category tree views, hierarchy row elements, and manager layouts.
* **Scope:** Categories manager container, tree navigation, and nested row components.
* **Affected Files:**
  * [src/features/admin/Categories/CategoriesManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoriesManager.js)
  * [src/features/admin/Categories/CategoriesStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoriesStyles.js)
  * [src/features/admin/Categories/CategoryRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryRow.js)
  * [src/features/admin/Categories/CategoryRowElements.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryRowElements.js)
  * [src/features/admin/Categories/CategoryTree.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryTree.js)
* **Implementation Tasks:**
  * Standardize Category Tree item labels in `CategoryTree.js` to `subtitle2` (`14px` medium).
  * Refactor category slug / code indicators to `code` variant (`13px` monospace).
  * Refactor subcategory count badges and status indicators in `CategoryRowElements.js` to `overline` (`10px` bold uppercase) or `label` (`12px`).
* **Expected Outcome:** Category hierarchy tree and rows display standardized typography.
* **Completion Criteria:** Category tree items, slugs, and counts render cleanly using core variants.

### Phase 4.2: Category Form Modals & Product Sections — ◕ FH — 1d 4f +2r
* **Objective:** Refactor Category creation/edit modals, field inputs, and assigned product section listings.
* **Scope:** Category form modals, form fields, and category product association sections.
* **Affected Files:**
  * [src/features/admin/Categories/CategoryFormModal.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryFormModal.js)
  * [src/features/admin/Categories/CategoryFormFields.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryFormFields.js)
  * [src/features/admin/Categories/CategoryFormStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryFormStyles.js)
  * [src/features/admin/Categories/CategoryProductSection.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Categories/CategoryProductSection.js)
* **Implementation Tasks:**
  * Refactor `CategoryFormModal.js` modal title to `h3` (`20px` semibold).
  * Replace custom `size={16}` `weight="bold"` section header in `CategoryProductSection.js` with `h4` (`16px` semibold).
  * Standardize `CategoryFormFields.js` input labels to `label` (`12px` medium) and helper hints to `caption` (`12px`).
* **Expected Outcome:** Category form modals and product sections use standard core variants.
* **Completion Criteria:** Category editing forms display unified section headers, labels, and text fields.

### Phase 4.3: Users Table, Drawers & User Details Cards — ◕ FH — 1d 7f +2r
* **Objective:** Refactor Users management table, user rows, user details drawer, notes, and order history lists.
* **Scope:** Users table manager, row views, user drawer details, and user order sub-lists.
* **Affected Files:**
  * [src/features/admin/Users/UsersManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UsersManager.js)
  * [src/features/admin/Users/UsersStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UsersStyles.js)
  * [src/features/admin/Users/UserRow.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserRow.js)
  * [src/features/admin/Users/UserDetails.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserDetails.js)
  * [src/features/admin/Users/UserInfoCard.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserInfoCard.js)
  * [src/features/admin/Users/UserNoteSection.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserNoteSection.js)
  * [src/features/admin/Users/UserOrdersList.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Users/UserOrdersList.js)
* **Implementation Tasks:**
  * Refactor User Full Name in `UserRow.js` from `size={14}` `weight="bold"` to `subtitle2` (`14px` medium).
  * Replace non-standard `size={13}` email/phone subtext in `UserRow.js` with core `caption` (`12px` regular).
  * Standardize Section Headers in `UserDetails.js` (`size={16}` `weight="bold"`) and `UserNoteSection.js` (`size={14}`) to `h4` (`16px` semibold).
  * Standardize User ID and Order IDs in `UserOrdersList.js` to shared `code` variant (`13px` monospace).
* **Expected Outcome:** User management tables and detail drawers consume core typography tokens.
* **Completion Criteria:** User table rows, email subtext, detail headers, and order history lists render cleanly.

---

### Phase 5.1: Banners Manager & Media Browser Components — ◕ FH — 1d 6f +2r — Phase 5.1 [Parallel with Phase 3.1, Phase 3.3, Phase 4.1]
* **Objective:** Refactor Banners manager cards and Media browser grid items, metadata, and preview popups.
* **Scope:** Banner management view and Media asset management components.
* **Affected Files:**
  * [src/features/admin/Banners/BannersManager.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Banners/BannersManager.js)
  * [src/features/admin/Banners/BannersStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Banners/BannersStyles.js)
  * [src/features/admin/Media/MediaBrowser.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Media/MediaBrowser.js)
  * [src/features/admin/Media/MediaBrowserComponents.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Media/MediaBrowserComponents.js)
  * [src/features/admin/Media/MediaBrowserItem.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Media/MediaBrowserItem.js)
  * [src/features/admin/Media/MediaBrowserStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Media/MediaBrowserStyles.js)
* **Implementation Tasks:**
  * Replace un-tokenized `fontSize: 15` in `BannersManager.js` banner title cards with `subtitle2` (`14px` medium) or `h4` (`16px` semibold).
  * Replace un-tokenized `fontSize: 11` media item size/dimension metadata in `MediaBrowserItem.js` with `caption` (`12px` regular) or `overline` (`10px`).
  * Standardize Media asset file names to `subtitle2` (`14px` medium) and URLs to `code` variant (`13px` monospace).
* **Expected Outcome:** Banner cards and media browser grid items consume standard core variants.
* **Completion Criteria:** Banner titles and media item metadata display unified typography without font warnings.

### Phase 5.2: Analytics Dashboard & Calendar Date Range Picker — ◕ FH — 1d 6f +2r
* **Objective:** Refactor Analytics KPI metric cards, dashboard layout, and date range picker calendar controls.
* **Scope:** Analytics dashboard metrics, date picker dropdowns, and calendar cell grids.
* **Affected Files:**
  * [src/features/admin/Analytics/AnalyticsDashboard.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/AnalyticsDashboard.js)
  * [src/features/admin/Analytics/AnalyticsStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/AnalyticsStyles.js)
  * [src/features/admin/Analytics/DateRangePicker.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/DateRangePicker.js)
  * [src/features/admin/Analytics/DateRangeCalendar.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/DateRangeCalendar.js)
  * [src/features/admin/Analytics/DateRangeCalendarStyles.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/DateRangeCalendarStyles.js)
  * [src/features/admin/Analytics/CalendarDayCell.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/CalendarDayCell.js)
* **Implementation Tasks:**
  * Replace raw `fontSize: 28` / `fontSize: 36` in `AnalyticsDashboard.js` KPI summary metrics with core `h1` (`28px` bold) and `display` (`36px` bold).
  * Standardize KPI card labels to `label` (`12px` medium) and trend change percentages to `caption` (`12px`).
  * Refactor `DateRangePicker.js` toggle text to `subtitle2` (`14px` medium) and calendar day cell numbers in `CalendarDayCell.js` to `body2` (`14px`) / `caption` (`12px`).
* **Expected Outcome:** Analytics metrics and date picker controls adhere strictly to core typography scale.
* **Completion Criteria:** KPI summary values, labels, and calendar date cells render with zero font warnings.

### Phase 5.3: Analytics SVG Data Charts Typography — ◐ FM — 1d 3f +2r
* **Objective:** Refactor SVG data charts (Revenue, Order Status, Top Products) axis labels and tooltip text.
* **Scope:** Analytics chart visualization components.
* **Affected Files:**
  * [src/features/admin/Analytics/RevenueChart.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/RevenueChart.js)
  * [src/features/admin/Analytics/OrderStatusChart.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/OrderStatusChart.js)
  * [src/features/admin/Analytics/TopProductsChart.js](file:///d:/Magazine/_PigmentShop/src/features/admin/Analytics/TopProductsChart.js)
* **Implementation Tasks:**
  * Replace raw SVG `fontSize="9"` or `fontSize="11"` props in `RevenueChart.js` axis tick labels with core `overline` (`10px` uppercase) or `caption` (`12px`).
  * Standardize chart legend text in `OrderStatusChart.js` and `TopProductsChart.js` to `caption` (`12px` regular).
  * Refactor hover tooltip value text to `subtitle2` (`14px` medium).
* **Expected Outcome:** SVG analytics charts display standardized axis typography matching overall admin theme.
* **Completion Criteria:** Chart axes, legends, and tooltips render legible text aligned with design system tokens.

---

### Phase 6: QA & Warning Cleanup Verification — ◐ FM — 1d 0f +10r
* **Objective:** Verify 100% elimination of dynamic font override warnings and validate visual cohesion.
* **Scope:** Entire admin panel application (`src/features/admin/`) across desktop and mobile viewports.
* **Affected Files:**
  * Entire Admin Panel module (Verification pass).
* **Implementation Tasks:**
  * Inspect `localStorage.getItem('typography_warnings')` and `window.__TYPOGRAPHY_WARNINGS__` in browser runtime to confirm zero logged entries.
  * Execute visual audit across Orders, Products, Categories, Users, Banners, Analytics, and Media modules.
  * Audit layout integrity across standard web viewports (`1440px`, `1024px`, `768px`, `375px`).
* **Expected Outcome:** Zero dynamic typography warnings logged and flawless typography across all admin screens.
* **Completion Criteria:** Console warning log reports exactly 0 warnings; all admin modules pass visual QA inspection.
