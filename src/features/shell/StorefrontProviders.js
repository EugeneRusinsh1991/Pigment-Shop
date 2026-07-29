/**
 * StorefrontProviders.js
 *
 * Feature-level provider composition wrapper for the storefront domain.
 * Encapsulates Catalog, Cart, and Favorites context providers away from the root AppProviders shell.
 */
import React from 'react';
import { CartProvider } from '../cart/CartContext';
import { CatalogProvider } from '../catalog/CatalogContext';
import { FavoritesProvider } from '../favorites/FavoritesContext';

function StorefrontProviders({ children }) {
  return (
    <CatalogProvider>
      <CartProvider>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </CartProvider>
    </CatalogProvider>
  );
}

export default StorefrontProviders;
