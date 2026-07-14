import { useState } from 'react';

/**
 * useScreenState.js
 *
 * Manages which storefront overlay/page screen is currently active.
 * Encapsulates the mutual-exclusion behavior so that activating one screen
 * automatically deactivates all others. This module is intentionally isolated
 * from catalog browsing state.
 *
 * Screens managed: catalog, cart, login, profile, orders, favorites, menu.
 */

const SCREEN_SETTERS_KEY = Symbol('SCREEN_SETTERS');

export default function useScreenState(onDismissMenus) {
  const [showCatalog, rawSetShowCatalog] = useState(false);
  const [showCart, rawSetShowCart] = useState(false);
  const [showLogin, rawSetShowLogin] = useState(false);
  const [showProfile, rawSetShowProfile] = useState(false);
  const [showOrders, rawSetShowOrders] = useState(false);
  const [showFavorites, rawSetShowFavorites] = useState(false);
  const [showAllProducts, rawSetShowAllProducts] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  /** Closes all screens except the one whose raw setter is passed as `except`. */
  const closeAllExcept = (except = null) => {
    const all = [
      rawSetShowCatalog,
      rawSetShowCart,
      rawSetShowLogin,
      rawSetShowProfile,
      rawSetShowOrders,
      rawSetShowFavorites,
      rawSetShowAllProducts,
    ];
    all.forEach((setter) => {
      if (setter !== except) setter(false);
    });
    if (onDismissMenus) onDismissMenus();
  };

  const setShowCatalog = (val) => {
    if (val) closeAllExcept(rawSetShowCatalog);
    rawSetShowCatalog(val);
  };

  const setShowCart = (val) => {
    if (val) closeAllExcept(rawSetShowCart);
    rawSetShowCart(val);
  };

  const setShowLogin = (val) => {
    if (val) closeAllExcept(rawSetShowLogin);
    rawSetShowLogin(val);
  };

  const setShowProfile = (val) => {
    if (val) closeAllExcept(rawSetShowProfile);
    rawSetShowProfile(val);
  };

  const setShowOrders = (val) => {
    if (val) closeAllExcept(rawSetShowOrders);
    rawSetShowOrders(val);
  };

  const setShowFavorites = (val) => {
    if (val) closeAllExcept(rawSetShowFavorites);
    rawSetShowFavorites(val);
  };

  const setShowAllProducts = (val) => {
    if (val) closeAllExcept(rawSetShowAllProducts);
    rawSetShowAllProducts(val);
  };

  /** Closes all screens (no active screen after this call). */
  const closeAll = () => closeAllExcept(null);

  return {
    // State
    showCatalog,
    showCart,
    showLogin,
    showProfile,
    showOrders,
    showFavorites,
    showAllProducts,
    showMenu,
    // Setters
    setShowCatalog,
    setShowCart,
    setShowLogin,
    setShowProfile,
    setShowOrders,
    setShowFavorites,
    setShowAllProducts,
    setShowMenu,
    // Utility
    closeAll,
  };
}
