/**
 * adminDomain.js
 *
 * Dedicated admin hooks and boundaries. Exposes separate hooks for authentication,
 * draft catalog mutations, and persistence actions.
 */

import { useSyncExternalStore, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { catalogStore } from '../data/catalogState';
import { AdminCatalogState } from './adminCatalogState';
import * as adminCatalogService from './adminCatalogService';

export const adminCatalogState = new AdminCatalogState(catalogStore);

function hasAdminRole(user) {
  return user.role === 'admin' || user.isAdmin === true;
}

function hasAdminClaim(user) {
  return user.customClaims?.admin === true || user.claims?.role === 'admin';
}

function hasAdminEmail(user) {
  return Boolean(user.email && (user.email === 'admin@pigment-shop.com' || user.email.startsWith('admin@')));
}

/**
 * Evaluates whether a user account possesses administrative privileges.
 * Checks custom claims, role attributes, and designated admin credentials.
 */
export function checkIsAdmin(user) {
  if (!user) return false;
  return hasAdminRole(user) || hasAdminClaim(user) || hasAdminEmail(user);
}

/**
 * Hook for admin session and authentication controls.
 */
export function useAdminAuth() {
  const { isAuthenticated, user, logout } = useAuth();
  const isAdmin = Boolean(isAuthenticated && checkIsAdmin(user));
  return useMemo(() => ({
    isAdmin,
    logoutAdmin: logout,
  }), [isAdmin, logout]);
}

/**
 * Hook for reading and mutating local catalog draft state.
 */
export function useAdminDrafts() {
  const state = useSyncExternalStore(
    (callback) => adminCatalogState.subscribe(callback),
    () => adminCatalogState.getSnapshot()
  );

  const api = useMemo(() => ({
    loadDrafts: () => adminCatalogState.loadDrafts(),
    addCategory: (data) => adminCatalogState.addCategory(data),
    updateCategory: (id, data) => adminCatalogState.updateCategory(id, data),
    removeCategory: (id) => adminCatalogState.removeCategory(id),
    addProduct: (data) => adminCatalogState.addProduct(data),
    updateProduct: (id, data) => adminCatalogState.updateProduct(id, data),
    removeProduct: (id) => adminCatalogState.removeProduct(id),
  }), []);

  return useMemo(() => ({
    ...state,
    ...api,
  }), [state, api]);
}

/**
 * Hook for admin catalog persistence actions (save/reset).
 */
export function useAdminActions() {
  const saveDrafts = useCallback(async () => {
    const categories = adminCatalogState.getDraftCategories();
    const products = adminCatalogState.getDraftProducts();
    const oldCategories = catalogStore.getCategories();
    const oldProducts = catalogStore.getProducts();

    const result = await adminCatalogService.saveDrafts(products, categories, oldProducts, oldCategories);
    if (result.success) {
      catalogStore.execute({ type: 'UPDATE_CATEGORIES', payload: categories });
      catalogStore.execute({ type: 'UPDATE_PRODUCTS', payload: products });
      adminCatalogState.markClean();
    }
    return result;
  }, []);

  const resetBannersToSeed = useCallback(async () => {
    const result = await adminCatalogService.resetBannersToSeed();
    if (result.success) {
      catalogStore.execute({ type: 'UPDATE_BANNERS', payload: result.data.banners });
    }
    return result;
  }, []);

  const updateBanners = useCallback(async (banners) => {
    const result = await adminCatalogService.updateBanners(banners);
    if (result.success) {
      catalogStore.execute({ type: 'UPDATE_BANNERS', payload: banners });
    }
    return result;
  }, []);

  const regenerateDatabase = useCallback(async () => {
    return adminCatalogService.regenerateDatabase();
  }, []);

  return {
    saveDrafts,
    resetBannersToSeed,
    updateBanners,
    regenerateDatabase,
  };
}
