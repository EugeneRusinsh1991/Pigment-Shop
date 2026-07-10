import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useAuth } from '../context/AuthContext';

import CatalogPage from './CatalogPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import OrdersPage from './OrdersPage';
import FavoritesPage from './FavoritesPage';
import CartView from './CartView';
import ProductPage from './ProductPage';
import CatalogView from './CatalogView';

const SCREENS = {
  catalog: CatalogPage,
  login: LoginPage,
  profile: ProfilePage,
  orders: OrdersPage,
  favorites: FavoritesPage,
  cart: CartView,
};

const SCREEN_KEYS = [
  'showCatalog',
  'showLogin',
  'showProfile',
  'showOrders',
  'showFavorites',
  'showCart',
];

const KEY_MAPPING = {
  showCatalog: 'catalog',
  showLogin: 'login',
  showProfile: 'profile',
  showOrders: 'orders',
  showFavorites: 'favorites',
  showCart: 'cart',
};

function getActiveScreenKey(nav) {
  const activeKey = SCREEN_KEYS.find((key) => nav[key]);
  return activeKey ? KEY_MAPPING[activeKey] : null;
}

export default function MainContent({ isDark, isWide }) {
  const nav = useNavigation();
  const auth = useAuth();

  const key = getActiveScreenKey(nav);
  if (key) {
    const Component = SCREENS[key];
    return <Component isDark={isDark} auth={auth} />;
  }

  if (nav.selectedProduct) {
    return <ProductPage product={nav.selectedProduct} isDark={isDark} />;
  }

  return (
    <CatalogView
      isDark={isDark}
      isWide={isWide}
      depth={nav.depth}
      currentLevel={nav.currentLevel}
      items={nav.currentLevel.items}
      crumbs={nav.crumbs}
    />
  );
}
