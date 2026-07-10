import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function useNavigationState(setShowLangMenu, categoryTree, setShowUserMenu) {
  const { t } = useTheme();
  const [selectedProduct, rawSetSelectedProduct] = useState(null);
  const [showCart, rawSetShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, rawSetShowLogin] = useState(false);
  const [showProfile, rawSetShowProfile] = useState(false);
  const [showOrders, rawSetShowOrders] = useState(false);
  const [showFavorites, rawSetShowFavorites] = useState(false);
  const [showCatalog, rawSetShowCatalog] = useState(false);
  const [navigationStack, setNavigationStack] = useState([{ label: t('navRootCatalog'), items: categoryTree }]);

  const resetScreens = (activeRawSetter = null) => {
    const rawSetters = [
      rawSetShowCatalog,
      rawSetShowCart,
      rawSetShowLogin,
      rawSetShowProfile,
      rawSetShowOrders,
      rawSetShowFavorites,
    ];
    rawSetters.forEach((rawSetter) => {
      if (rawSetter !== activeRawSetter) rawSetter(false);
    });
    setShowLangMenu(false);
    setShowUserMenu(false);
  };

  const setShowCatalog = (val) => {
    if (val) {
      resetScreens(rawSetShowCatalog);
      rawSetSelectedProduct(null);
    }
    rawSetShowCatalog(val);
  };

  const setShowCart = (val) => {
    if (val) {
      resetScreens(rawSetShowCart);
      rawSetSelectedProduct(null);
    }
    rawSetShowCart(val);
  };

  const setShowLogin = (val) => {
    if (val) {
      resetScreens(rawSetShowLogin);
    }
    rawSetShowLogin(val);
  };

  const setShowProfile = (val) => {
    if (val) {
      resetScreens(rawSetShowProfile);
      rawSetSelectedProduct(null);
    }
    rawSetShowProfile(val);
  };

  const setShowOrders = (val) => {
    if (val) {
      resetScreens(rawSetShowOrders);
      rawSetSelectedProduct(null);
    }
    rawSetShowOrders(val);
  };

  const setShowFavorites = (val) => {
    if (val) {
      resetScreens(rawSetShowFavorites);
      rawSetSelectedProduct(null);
    }
    rawSetShowFavorites(val);
  };

  // Keep root level in sync when catalog or language changes
  React.useEffect(() => {
    setNavigationStack((prev) => {
      const updated = [...prev];
      updated[0] = { label: t('navRootCatalog'), items: categoryTree };
      return updated;
    });
  }, [categoryTree, t]);

  const setSelectedProduct = (product) => {
    const newStack = getNewNavigationStack(product, categoryTree, t);
    if (newStack) {
      setNavigationStack(newStack);
    }
    rawSetSelectedProduct(product);
  };

  const handleCardPress = (node) => {
    if (!node.children?.length && !node.isCategory) return setSelectedProduct(node);
    setNavigationStack((p) => [...p, { label: node.label, items: node.children || [] }]);
    setShowLangMenu(false);
    setShowUserMenu(false);
  };
  const handleCrumbPress = (idx) => { setNavigationStack((p) => p.slice(0, idx + 2)); setSelectedProduct(null); setShowLangMenu(false); setShowUserMenu(false); };
  const handleBackPress = () => {
    const screens = [
      [showLogin, setShowLogin],
      [showProfile, setShowProfile],
      [showOrders, setShowOrders],
      [showFavorites, setShowFavorites],
      [showCart, setShowCart],
      [showCatalog, setShowCatalog],
    ];
    const activeScreen = screens.find(([isActive]) => isActive);
    if (activeScreen) {
      activeScreen[1](false);
    } else if (selectedProduct) {
      setSelectedProduct(null);
    } else if (navigationStack.length > 1) {
      setNavigationStack((p) => p.slice(0, -1));
    }
    setShowLangMenu(false);
    setShowUserMenu(false);
  };
  // resetScreens is defined at the top to resolve hoisting/TDZ references in state setters
  const selectProductFromSearch = (product) => {
    resetScreens();
    setSelectedProduct(product);
  };
  const handleCatalogPress = () => {
    resetScreens(setShowCatalog);
    setShowCatalog(true);
    rawSetSelectedProduct(null);
  };
  const handleHome = () => {
    resetScreens();
    setNavigationStack([{ label: t('navRootCatalog'), items: categoryTree }]);
    setSelectedProduct(null);
  };
  const canGoBack = checkCanGoBack({
    showCart,
    showLogin,
    showProfile,
    showOrders,
    showFavorites,
    showCatalog,
    selectedProduct,
    navigationStack
  });

  const currentLevel = navigationStack[navigationStack.length - 1];
  const crumbs = navigationStack.slice(1).map((s) => ({ label: s.label }));
  const depth = navigationStack.length - 1;

  return {
    selectedProduct, showCart, showMenu, showLogin, showProfile, showOrders, showFavorites, showCatalog, setShowCatalog, navigationStack, setSelectedProduct, setShowCart, setShowMenu, setShowLogin, setShowProfile, setShowOrders, setShowFavorites,
    handleCardPress, handleCrumbPress, handleBackPress, handleHome, handleCatalogPress, selectProductFromSearch, canGoBack,
    currentLevel, crumbs, depth
  };
}

function getNewNavigationStack(product, categoryTree, t) {
  if (!product) return null;
  const catLabel = product.category || t('navCategoryOther');
  const catNode = categoryTree.find((c) => c.label === catLabel) || categoryTree.find((c) => c.label === t('navCategoryOther'));
  if (!catNode) return null;
  return [
    { label: t('navRootCatalog'), items: categoryTree },
    { label: catNode.label, items: catNode.children }
  ];
}

function checkCanGoBack(state) {
  const flags = [
    state.showCart,
    state.showLogin,
    state.showProfile,
    state.showOrders,
    state.showFavorites,
    state.showCatalog,
    state.selectedProduct,
    state.navigationStack.length > 1
  ];
  return flags.some(Boolean);
}
