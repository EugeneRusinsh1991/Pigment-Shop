import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../context/NavigationContext';

import CartView from './CartView';
import CatalogPage from './CatalogPage';
import CatalogView from './CatalogView';
import FavoritesPage from './FavoritesPage';
import LoginPage from './LoginPage';
import OrdersPage from './OrdersPage';
import ProductPage from './ProductPage';
import ProfilePage from './ProfilePage';

const SCREENS = {
  login: LoginPage,
  profile: ProfilePage,
  orders: OrdersPage,
  favorites: FavoritesPage,
  cart: CartView,
  allProducts: CatalogPage,
};

const SCREEN_KEYS = [
  'showCatalog',
  'showLogin',
  'showProfile',
  'showOrders',
  'showFavorites',
  'showCart',
  'showAllProducts',
];

const KEY_MAPPING = {
  showCatalog: 'catalog',
  showLogin: 'login',
  showProfile: 'profile',
  showOrders: 'orders',
  showFavorites: 'favorites',
  showCart: 'cart',
  showAllProducts: 'allProducts',
};

function getActiveScreenKey(nav) {
  const activeKey = SCREEN_KEYS.find((key) => nav[key]);
  return activeKey ? KEY_MAPPING[activeKey] : null;
}

export default function MainContent({ isDark, isWide }) {
  const nav = useNavigation();
  const auth = useAuth();

  const key = getActiveScreenKey(nav);
  if (key === 'catalog') {
    return (
      <CatalogView
        isDark={isDark}
        isWide={isWide}
        depth={nav.depth}
        currentLevel={nav.currentLevel}
        items={nav.currentLevel.items}
        crumbs={nav.crumbs}
        showCategoryGrid
        showSectionTitle
        showPromotionalSections={false}
        showHeroBanner={false}
        showNavigation={true}
      />
    );
  }

  if (key) {
    const Component = SCREENS[key];
    return <Component isDark={isDark} auth={auth} />;
  }

  if (nav.selectedProduct) {
    return <ProductPage product={nav.selectedProduct} isDark={isDark} showNavigation={true} />;
  }

  return (
    <CatalogView
      isDark={isDark}
      isWide={isWide}
      depth={nav.depth}
      currentLevel={nav.currentLevel}
      items={nav.currentLevel.items}
      crumbs={nav.crumbs}
      showCategoryGrid={false}
      showSectionTitle={false}
    />
  );
}
