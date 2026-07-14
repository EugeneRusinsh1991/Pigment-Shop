# Hamburger Menu Navigation

## Overview

The hamburger menu is implemented as a modal overlay in `src/components/NavMenu.js`. It displays a fixed set of main navigation items and a list of categories built from the current catalog browsing level.

The menu is intended to support hierarchical category browsing. Users can drill down into categories without leaving the menu until they reach a category that is a product holder.

## Key Files

- `src/components/AppShell.js`
  - Builds menu items and handles selection from the hamburger menu.
  - Calls navigation actions from `NavigationContext`.
  - Contains the logic that decides whether to keep the hamburger menu open or close it.

- `src/components/NavMenu.js`
  - Renders the modal overlay for the hamburger menu.
  - Uses `NavItemList` to render items.
  - Only closes automatically when the selected item has no children.

- `src/components/NavMenu/NavItemList.js`
  - Renders a list of touchable menu items.
  - Each item calls `onSelect(item)` when pressed.

- `src/hooks/useNavigationOrchestrator.js`
  - Coordinates catalog browsing state and screen state.
  - Implements `handleCardPress(item)` for selecting categories and products.
  - Ensures selecting a category opens the catalog view, while selecting a product opens the product detail view.

- `src/context/NavigationContext.js`
  - Exposes the public navigation API used by UI components.
  - Wire-ups the orchestrator with `CatalogContext` and `UIMenuContext`.

## How Navigation Works

### Category Items in the Hamburger Menu

The menu receives `categoryItems` from `AppShell`, which are derived from `nav.currentLevel.items`:

```js
const { mainItems, categoryItems } = React.useMemo(
  () => buildMenuItems(t, nav.currentLevel.items),
  [t, nav.currentLevel.items],
);
```

`nav.currentLevel` is the current category browsing level maintained by the catalog browsing state.

### Menu Item Selection Flow

In `src/components/AppShell.js`, the `handleMenuSelect` function handles all menu selection logic:

- `home`, `catalog`, `allProducts`, and `favorites` use explicit navigation actions.
- Categories and products use `nav.handleCardPress(item)`.
- The hamburger menu remains open for category navigation unless the selected category is a product holder.

### Menu Close Policy

The current implementation keeps the hamburger menu open when the user navigates inside the category hierarchy. The only case where the menu closes automatically is when the selected category is a product holder.

A product holder category is detected as:

- `item.isCategory === true`
- `item.children` exists
- all children are not categories (that is, leaf product nodes)

This logic is defined in `AppShell.js`:

```js
const isProductHolderCategory = (item) =>
  item?.isCategory &&
  item.children?.length > 0 &&
  item.children.every((child) => !child.isCategory);
```

When this returns `true`, `nav.setShowMenu(false)` is called to dismiss the hamburger menu.

## Category Transition Behavior

### Inside the Menu

- Selecting a parent category keeps the menu open.
- The current catalog browsing level advances to the selected category.
- The menu items update to show the next category level.

### Reaching a Product Holder

- When the user selects a category that contains only products, the menu closes.
- Navigation transitions to the catalog view for that category.
- This enables users to continue browsing categories without interruption, while still closing the menu at the final product-holder level.

## Important Implementation Details

### `NavMenu` Auto-Close Logic

`src/components/NavMenu.js` uses this behavior:

```js
const handleSelect = (item) => {
  onSelectItem(item);
  if (!item.children?.length) {
    onClose();
  }
};
```

This means the menu itself only auto-closes for leaf items. The higher-level category close policy is managed in `AppShell.js`.

### `handleCardPress` Behavior

In `src/hooks/useNavigationOrchestrator.js`, `handleCardPress` distinguishes between products and categories:

- Products (`!node.children?.length && !node.isCategory`) close all screens and show the product page.
- Categories call `catalog.enterNode(node)` and ensure the catalog screen is visible.

This keeps the category browsing stack consistent when users navigate inside the menu.

## Future Maintenance Notes

- To modify menu behavior, start in `src/components/AppShell.js`.
- Category hierarchy state is stored and updated in `src/hooks/useCatalogBrowsing.js`.
- Screen visibility and high-level navigation coordination are in `src/hooks/useNavigationOrchestrator.js`.
- The menu rendering layer is in `src/components/NavMenu.js`.

If the category tree structure changes, these files are the primary places to verify the menu navigation flow.
