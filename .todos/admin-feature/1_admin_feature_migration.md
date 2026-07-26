# Migration Tasks: Admin Feature Page

## Overview
Move Admin UI from `src/components/Admin/` into a dedicated feature module `src/features/admin/`
to conform to the project's **flat feature-based architecture** (matching `catalog`, `cart`, `profile`, etc.).

## Recommended Models
- **Execution:** 🟢 Gemini 3.6 Flash (Low)

---

## Step 1: Create `src/features/admin/` Directory

Mirror the flat layout used by all other features — **no nested `components/`, `hooks/`, or `styles/` sub-folders**.
Files land directly in `src/features/admin/`:

```
src/features/admin/
  AdminPanel.js
  AdminPanelStyles.js
  AdminTabBar.js
  FormModalLayout.js
  LanguageTabs.js
  SharedFormComponents.js
  AdminSaveFooter.js          ← from shared/
  Analytics/                  ← keep domain sub-folders as-is
  Banners/
  Categories/
  Media/
  Orders/
  Products/
  Users/
  index.js                    ← feature root export (exports AdminPanel)
```

> **Note:** `adminSharedService.js` (currently `shared/adminSharedService.js`) is a service utility
> and should move to `src/services/adminSharedService.js` to match where `adminUsersService.js`
> and `adminOrdersService.js` already live — not into the feature folder.

---

## Step 2: Move Files

1. Copy all files from `src/components/Admin/` → `src/features/admin/` preserving sub-folder structure
   (`Analytics/`, `Banners/`, `Categories/`, `Media/`, `Orders/`, `Products/`, `Users/`).
2. Move `src/components/Admin/shared/AdminSaveFooter.js` → `src/features/admin/AdminSaveFooter.js`.
3. Move `src/components/Admin/shared/adminSharedService.js` → `src/services/adminSharedService.js`.
4. Create `src/features/admin/index.js`:
   ```js
   export { default } from './AdminPanel';
   ```

> **No backward-compat re-exports needed** — consumers are limited to the router/shell and
> `src/services/`. Update them directly in Step 3.

---

## Step 3: Update All Import Sites

Files that import from `src/components/Admin` (confirmed by grep):
- `src/services/adminUsersService.js`
- `src/services/adminOrdersService.js`
- `src/features/auth/LoginPage.js` / `LoginPageComponents.js`
- `src/features/cart/CartSummary.js`
- `src/features/contact/ContactQuestionForm.js`
- `src/features/profile/ProfileFormCard.js`
- `src/features/product/ProductReviewSubcomponents.js`
- `src/features/catalog/SidebarUIComponents.js`
- Router / shell navigation entry (wherever `AdminPanel` is registered)

Update each to import from `src/features/admin` (or `@features/admin` if alias is configured).

Also update any internal Admin files that import `../shared/adminSharedService` → `src/services/adminSharedService`.

---

## Step 4: Check Path Alias (if used)

If the project uses a `@features` module alias (metro/babel config), verify `admin` is covered
by the existing wildcard — no change needed. If explicit entries are required, add:
```js
'@features/admin': ['src/features/admin/index.js']
```

---

## Step 5: Clean Up & Verification

1. Delete `src/components/Admin/` entirely.
2. Run `npm run health` — verify 0 broken relative imports.
3. Run `npm run audit:ui` — confirm no regressions.
