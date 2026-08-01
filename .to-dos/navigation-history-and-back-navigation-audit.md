# Navigation History & Back Navigation Architecture Blueprint

**Date**: August 1, 2026  
**Status**: Technical Blueprint & Step-by-Step Implementation Roadmap (No Code Implemented Yet)  
**Target Scope**: Cross-platform navigation architecture (Expo Router, React Navigation, React Native `BackHandler`, Web Browsers, Android System Back, iOS Navigation Gestures, PWA)

---

## 1. Executive Overview & Objectives

This document establishes a unified, cross-platform Back navigation architecture for the application.

The primary objective is to deliver intuitive, platform-native Back navigation behavior across Desktop Web, Android (native/PWA), iOS (native/PWA), and Mobile Web browsers—following conventions users naturally expect on each platform—without modifying the underlying file-based routing architecture or introducing custom navigation managers or raw DOM manipulation hacks.

### Core Architectural Principles
1. **Framework-Native Execution**: Built exclusively on standard APIs provided by **Expo Router**, **React Navigation**, and React Native's **`BackHandler`**.
2. **Hierarchical Route Resolution**: Replace blind `router.push('/')` fallbacks on direct page landings (`canGoBack() === false`) with deterministic hierarchical route replacement (`router.replace`).
3. **Transient UI State Interception**: Handle hardware and gesture back events for transient overlays (drawers, modals, bottom sheets) via `BackHandler` and React Navigation lifecycle listeners (`beforeRemove`), dismissing overlays before route popping occurs.
4. **Architecture Preservation**: Maintain the current Expo Router structure in `/app` and React state management without introducing structural changes or URL bloat.

---

## 2. Current Navigation Architecture & Component Inventory

### 2.1 Core Framework & Routing Engine
- **Framework**: Expo Router (built on React Navigation and React Native Web).
- **Routing Structure**: File-based routing under `/app`.

### 2.2 Routing Layouts & Gateways
- **Root Layout Wrapper**: [`app/_layout.js`](file:///d:/Magazine/_PigmentShop/app/_layout.js)
  - Manages top-level context providers ([`AppProviders`](file:///d:/Magazine/_PigmentShop/src/context/AppProviders.js)), splash screen lifecycle, and global UI overlays.
- **Storefront Group Layout**: [`app/(store)/_layout.js`](file:///d:/Magazine/_PigmentShop/app/(store)/_layout.js)
  - Houses global shell components: [`AppHeader`](file:///d:/Magazine/_PigmentShop/src/features/shell/AppHeader.js), [`NavMenu`](file:///d:/Magazine/_PigmentShop/src/features/shell/NavMenu.js), [`CartDrawer`](file:///d:/Magazine/_PigmentShop/src/features/cart/CartDrawer/CartDrawer.js), [`StoreSearchHeader`](file:///d:/Magazine/_PigmentShop/src/features/shell/StoreSearchHeader.js), and [`SharedLayoutWrapper`](file:///d:/Magazine/_PigmentShop/src/features/shell/SharedLayoutWrapper.js).
- **Admin Layout**: [`app/admin/_layout.js`](file:///d:/Magazine/_PigmentShop/app/admin/_layout.js)
  - Auth-guarded shell for administration features.

### 2.3 Key Navigation Files & Components
- **Navigation Hook**: [`src/hooks/useProductNavigation.js`](file:///d:/Magazine/_PigmentShop/src/hooks/useProductNavigation.js) (`useBackHandler`).
- **Page Header Navigation**: [`src/components/domain/Navigation/PageNavigation.js`](file:///d:/Magazine/_PigmentShop/src/components/domain/Navigation/PageNavigation.js).
- **Catalog Navigation View**: [`src/features/catalog/CatalogView.js`](file:///d:/Magazine/_PigmentShop/src/features/catalog/CatalogView.js).
- **Shell Overlay Controllers**:
  - [`src/features/shell/useMenuVisibilityState.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/useMenuVisibilityState.js) (Cart Drawer & Nav Menu visibility).
  - [`src/features/shell/useNavMenuController.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/useNavMenuController.js) (Multi-level menu category drill-down).
- **Modals & Dialogs**:
  - [`src/components/ui/Modal.js`](file:///d:/Magazine/_PigmentShop/src/components/ui/Modal.js) and [`src/hooks/useDeleteConfirmation.js`](file:///d:/Magazine/_PigmentShop/src/hooks/useDeleteConfirmation.js).

---

## 3. Platform Behavior Requirements & Target Specifications

| Platform / Environment | Expected Back Behavior | Standard Framework Capability Used |
| :--- | :--- | :--- |
| **Desktop Web (Chrome/Firefox/Edge/Safari)** | Direct landings (`canGoBack() === false`) navigate to logical parent route (e.g., `/product/123` -> `/catalog`). UI Back button replaces route cleanly. | Expo Router `router.replace(getParentRoute(pathname))` |
| **Android System Back (Native / PWA / Web)** | Pressing physical back button or edge swipe gesture closes active drawers/modals first. If no overlays are open, pops screen stack or navigates to parent route. | React Native `BackHandler.addEventListener('hardwareBackPress', ...)` |
| **iOS Navigation Gestures** | Edge swipe right gesture pops route cleanly. Active modals/drawers intercept back dismissals cleanly without stack corruption. | React Navigation stack lifecycle & `BackHandler` / overlay state synchronization |
| **Mobile Web (Android Chrome / iOS Safari)** | Native swipe or browser back button triggers screen pop or overlay dismissal seamlessly. | Expo Router standard stack integration |

---

## 4. Unified Technical Design

### 4.1 Hierarchical Fallback Resolution (`useSmartBackHandler`)
When a user accesses a page directly via URL (such as a bookmark, shared link, or page refresh), `router.canGoBack()` evaluates to `false` because the React Navigation stack has no prior entry.

Instead of navigating blindly to `/` via `router.push('/')` (which contaminates the browser history stack with duplicate entries), the application will use `useSmartBackHandler` to resolve the logical parent route and execute `router.replace(fallbackPath)`:

```javascript
import { useRouter, usePathname } from 'expo-router';
import { useCallback } from 'react';

export function getParentRoute(pathname) {
  if (!pathname || pathname === '/') return '/';
  if (pathname.startsWith('/product/')) return '/catalog';
  if (pathname.startsWith('/catalog/')) return '/catalog';
  if (pathname === '/checkout') return '/cart';
  if (pathname.startsWith('/admin/')) return '/admin';
  return '/';
}

export function useSmartBackHandler(onBack, customFallback) {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(() => {
    if (onBack) {
      onBack();
      return;
    }
    if (router.canGoBack()) {
      router.back();
      return;
    }
    
    const fallback = customFallback || getParentRoute(pathname);
    router.replace(fallback);
  }, [onBack, customFallback, pathname, router]);
}
```

### 4.2 Native Overlay Back Interception (`useDrawerBackHandler`)
Active UI overlays (Cart Drawer, Nav Menu, confirmation dialogs) intercept system back button presses on Android and PWA platforms using React Native's `BackHandler`:

```javascript
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export function useDrawerBackHandler(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    const onBackPress = () => {
      onClose();
      return true; // Consumes event to prevent screen pop
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [isOpen, onClose]);
}
```

---

## 5. Step-by-Step Implementation Roadmap

The implementation plan is divided into small, self-contained tasks designed to be executed incrementally across future iterations.

---

### Task 1: Implement Core Hierarchical Route Resolver Hook
*Model Recommendation: ◐ FM — 1d 1f +1r*
- **Objective**: Create `useSmartBackHandler` hook to replace blind `router.push('/')` fallbacks with deterministic parent route replacement (`router.replace`).
- **Affected Files**:
  - [`src/hooks/useProductNavigation.js`](file:///d:/Magazine/_PigmentShop/src/hooks/useProductNavigation.js)
- **Expected Outcome**: Calling back on a deep page without history replaces the route with its parent path instead of forcing home or adding history loops.
- **Completion Criteria**:
  - `getParentRoute(pathname)` correctly maps `/product/*`, `/catalog/*`, `/checkout`, `/admin/*` to their parent paths.
  - Uses `router.replace()` when `canGoBack()` is `false`.
  - Preserves custom `onBack` callbacks when provided.

---

### Task 2: Refactor Catalog Navigation to Use Smart Back Resolution
*Model Recommendation: ◐ FM — 1d 1f +2r*
- **Objective**: Update `CatalogView.js` to utilize the new `useSmartBackHandler` logic.
- **Affected Files**:
  - [`src/features/catalog/CatalogView.js`](file:///d:/Magazine/_PigmentShop/src/features/catalog/CatalogView.js)
- **Expected Outcome**: Catalog view back button correctly handles direct URL entries without history loops.
- **Completion Criteria**:
  - Replaces inline `handleBackPress` with `useSmartBackHandler`.
  - Direct navigation to `/catalog/coatings` followed by clicking Back correctly navigates to `/catalog` via `router.replace`.

---

### Task 3: Integrate Hardware Back Interception for Cart Drawer & Nav Menu
*Model Recommendation: ◐ FM — 1d 2f +2r — Task 3 [Parallel with Task 4]*
- **Objective**: Bind React Native `BackHandler` listeners to shell drawers (`CartDrawer` and `NavMenu`) so hardware back presses dismiss overlays before popping routes.
- **Affected Files**:
  - [`src/features/shell/useMenuVisibilityState.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/useMenuVisibilityState.js)
  - [`src/features/shell/NavMenu.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/NavMenu.js)
- **Expected Outcome**: Pressing physical back or gesture back when the Cart Drawer or Nav Menu is open closes the drawer and keeps the user on the current page.
- **Completion Criteria**:
  - `BackHandler` listener added when drawer/menu is open.
  - Listener returns `true` to block screen popping while drawer is open.
  - Listener is cleanly unsubscribed when drawer/menu closes or unmounts.

---

### Task 4: Integrate Hardware Back Interception for Modal Dialogs
*Model Recommendation: ◐ FM — 1d 2f +2r — Task 4 [Parallel with Task 3]*
- **Objective**: Enable `BackHandler` support for themed modal overlays (e.g., delete confirmations, form dialogs).
- **Affected Files**:
  - [`src/components/ui/Modal.js`](file:///d:/Magazine/_PigmentShop/src/components/ui/Modal.js)
  - [`src/hooks/useDeleteConfirmation.js`](file:///d:/Magazine/_PigmentShop/src/hooks/useDeleteConfirmation.js)
- **Expected Outcome**: Hardware back press closes active confirmation/form modals instead of triggering page navigation.
- **Completion Criteria**:
  - `Modal` primitive or `useDeleteConfirmation` hook listens to `hardwareBackPress` when visible.
  - Pressing back closes modal cleanly and prevents screen popping.

---

### Task 5: Multi-Level Menu Drill-Down Back Button Integration
*Model Recommendation: ◐ FM — 1d 1f +2r*
- **Objective**: Connect internal category sub-tree navigation in `NavMenu` with back handlers.
- **Affected Files**:
  - [`src/features/shell/useNavMenuController.js`](file:///d:/Magazine/_PigmentShop/src/features/shell/useNavMenuController.js)
- **Expected Outcome**: In-menu back button steps back through category sub-levels cleanly before closing the menu layout.
- **Completion Criteria**:
  - Header back arrow in `NavMenu` pops category depth level when nested.
  - When at root category level, back button closes the menu.

---

### Task 6: End-to-End Verification Across Platforms
*Model Recommendation: ◐ FM — 1d 0f +6r*
- **Objective**: Validate cross-platform Back navigation behavior across Desktop Web, Mobile Web, Android, iOS, and PWA environments.
- **Affected Files**:
  - All navigation test points across `/app` and `/src`.
- **Expected Outcome**: Empirical confirmation of clean, consistent back navigation behavior on all supported platforms.
- **Completion Criteria**:
  - Direct URL landing -> Back button -> Parent route replace verified.
  - Cart Drawer / Nav Menu open -> Back button -> Drawer closes without route change verified.
  - Modals open -> Back button -> Modal closes verified.
  - Zero browser history loops or orphaned UI overlays.
