# Feature Specification: Favorites Module (`src/features/favorites/`)

> [!NOTE]
> Specification for customer wishlist management, favorite product toggling, and saved items storage.

---

## 1. Domain Responsibility

The **Favorites Feature** provides wishlist capabilities:
- **Wishlist Product Grid (`FavoritesPage.js`)**: Grid of user-saved products, empty state placeholder.
- **Favorite Button Trigger (`FavoriteButton.js`)**: Heart icon toggle button used across product cards and product pages.
- **Persistence Layer (`useFavorites.js`)**: Syncs favorites with user profile or local storage for guests.

---

## 2. Directory Layout

```text
src/features/favorites/
├── FavoritesPage.js         # Wishlist screen container
├── FavoriteButton.js        # Toggle icon button component
├── favoritesStyles.js       # Favorites section styling
├── useFavorites.js          # Wishlist state management hook
└── index.js                 # Public API exports
```

---

## 3. Public API Contract (`index.js`)

```javascript
export { default as FavoritesPage } from './FavoritesPage';
export { default as FavoriteButton } from './FavoriteButton';
```
