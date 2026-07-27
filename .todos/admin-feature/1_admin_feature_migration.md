# Migration Tasks: Admin Feature Page

## Overview
Move Admin UI from `src/components/Admin/` into a dedicated feature module `src/features/admin/`
to conform to the project's **flat feature-based architecture** (matching `catalog`, `cart`, `profile`, etc.).

## Recommended Models
- **Full Execution:** 🔴 G 3.1 P (H) — 5d | 31f | +3ctx
  ⚠️ Action: BREAK DOWN INTO SUBTASKS

---

## ~~Step 1: Create `src/features/admin/` Directory~~ ✅
`🟢 G 3.6 F (L) — 1d | 1f | +0ctx`

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
`🔴 G 3.1 P (H) — 3d | 21f | +1ctx` ⚠️ Action: BREAK DOWN INTO SUBTASKS

### Step 2.1: Copy Root-Level Admin Files
`🟡 G 3.6 F (M) — 1d | 6f | +0ctx`

Copy the 6 root-level files from `src/components/Admin/` → `src/features/admin/`:
- `AdminPanel.js`
- `AdminPanelStyles.js`
- `AdminTabBar.js`
- `FormModalLayout.js`
- `LanguageTabs.js`
- `SharedFormComponents.js`

---

### Step 2.2: Copy Domain Sub-Folders
`🟠 G 3.6 F (H) — 2d | ~14f | +0ctx`

Copy all domain sub-folders preserving internal structure:
- `Analytics/` → `src/features/admin/Analytics/`
- `Banners/` → `src/features/admin/Banners/`
- `Categories/` → `src/features/admin/Categories/`
- `Media/` → `src/features/admin/Media/`
- `Orders/` → `src/features/admin/Orders/`
- `Products/` → `src/features/admin/Products/`
- `Users/` → `src/features/admin/Users/`

---

### Step 2.3: Move `shared/AdminSaveFooter.js`
`🟢 G 3.6 F (L) — 1d | 1f | +0ctx`

Move `src/components/Admin/shared/AdminSaveFooter.js` → `src/features/admin/AdminSaveFooter.js`.

---

### Step 2.4: Move `shared/adminSharedService.js` to Services
`🟢 G 3.6 F (L) — 2d | 1f | +1ctx`

Move `src/components/Admin/shared/adminSharedService.js` → `src/services/adminSharedService.js`.

> **Note:** This is a service utility — it must not land in the feature folder.
> Update any internal Admin files importing `../shared/adminSharedService` → `src/services/adminSharedService`.

> **No backward-compat re-exports needed** — consumers are limited to the router/shell and
> `src/services/`. Update them directly in Step 3.

---


## Step 3: Update All Import Sites
`🔴 G 3.1 P (H) — 4d | 9f | +2ctx`

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
`🟢 G 3.6 F (L) — 1d | 1f | +1ctx`

If the project uses a `@features` module alias (metro/babel config), verify `admin` is covered
by the existing wildcard — no change needed. If explicit entries are required, add:
```js
'@features/admin': ['src/features/admin/index.js']
```

---

## Step 5: Clean Up & Verification
`🟢 G 3.6 F (L) — 1d | 0f | +0ctx`

1. Delete `src/components/Admin/` entirely.
2. Run `npm run health` — verify 0 broken relative imports.
3. Run `npm run audit:ui` — confirm no regressions.
