/**
 * adminDomain.js
 *
 * Dedicated domain module for the admin experience.
 *
 * ── Responsibilities ──────────────────────────────────────────────────────────
 * 1. Admin Auth State: Exposes whether an admin is logged in by checking the shared app AuthContext
 *    for the admin email ('admin@pigment-shop.com'). Removes reliance on an isolated local flag.
 * 2. Admin Mutations: Owns the write operations for products, categories, and banners.
 *    By wrapping or importing the boundary logic, it acts as the single point of entry for all admin actions.
 * 3. Persistence Rules: Enforces that Firestore is the source of truth for categories and banners,
 *    and that in-memory state is only updated after successful Firestore commits.
 * 4. State Propagation: Interacts with the shared `catalogState.js` so storefront subscribers (CatalogContext)
 *    re-render automatically upon any admin-driven change.
 */

import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { getCategories, getProducts, SEED_BANNERS, setBanners, setCategories, setProducts } from '../data/catalogState';
import { db } from '../firebase';
import { regenerateCatalogDatabase } from './catalogDatabaseRegenerator.js';

const ADMIN_EMAIL = 'admin@pigment-shop.com';

// ---------------------------------------------------------------------------
// Product commands  (in-memory only — no Firestore backing)
// ---------------------------------------------------------------------------

function sanitizeProductInput(data) {
  const { category, subcategory, categoryId, ...rest } = data || {};
  return {
    ...rest,
    sold: rest.sold ?? 0,
    stock: rest.stock ?? 0,
    active: rest.active ?? true,
  };
}

export function addProduct(data) {
  const product = {
    ...sanitizeProductInput(data),
    id: `p-admin-${Date.now()}`,
  };
  setProducts([...getProducts(), product]);
  return product;
}

export function updateProduct(id, changes) {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated = { ...products[idx], ...sanitizeProductInput(changes) };
  const next = [...products];
  next[idx] = updated;
  setProducts(next);
  return updated;
}

export function removeProduct(id) {
  const before = getProducts();
  const after = before.filter((p) => p.id !== id);
  if (after.length === before.length) return false;
  const nextCategories = getCategories().map((category) => ({
    ...category,
    productIds: (category.productIds || []).filter((productId) => productId !== id),
  }));
  setCategories(nextCategories);
  setProducts(after);
  return true;
}

// ---------------------------------------------------------------------------
// Category commands  (Firestore batch + in-memory; persist first)
// ---------------------------------------------------------------------------

export async function persistCategories(categories) {
  const oldCategories = getCategories();

  const batch = writeBatch(db);
  const categoriesCol = collection(db, 'categories');

  const newIds = new Set(categories.map((c) => c.id));
  const deleted = oldCategories.filter((c) => !newIds.has(c.id));

  deleted.forEach((cat) => {
    batch.delete(doc(categoriesCol, cat.id));
  });

  categories.forEach((cat) => {
    const { image, ...rest } = cat;
    batch.set(doc(categoriesCol, cat.id), rest);
  });

  await batch.commit();
  setCategories(categories);
}

// ---------------------------------------------------------------------------
// Product persistence  (Firestore batch + in-memory; persist first)
// ---------------------------------------------------------------------------

export async function persistProducts(products) {
  const oldProducts = getProducts();

  const batch = writeBatch(db);
  const productsCol = collection(db, 'products');

  const newIds = new Set(products.map((p) => p.id));
  const deleted = oldProducts.filter((p) => !newIds.has(p.id));

  deleted.forEach((prod) => {
    batch.delete(doc(productsCol, prod.id));
  });

  products.forEach((prod) => {
    const { images, category, subcategory, categoryId, ...rest } = prod;
    batch.set(doc(productsCol, prod.id), rest);
  });

  await batch.commit();
  setProducts(products);
}

// ---------------------------------------------------------------------------
// Banner commands  (Firestore doc + in-memory; persist first)
// ---------------------------------------------------------------------------

export async function updateBanners(banners) {
  await setDoc(doc(db, 'settings', 'banners'), { items: banners });
  setBanners(banners);
}

export async function resetBannersToSeed() {
  const seed = [...SEED_BANNERS];
  await setDoc(doc(db, 'settings', 'banners'), { items: seed });
  setBanners(seed);
}

export async function regenerateDatabase() {
  return regenerateCatalogDatabase();
}

// ---------------------------------------------------------------------------
// Auth & Hook Export
// ---------------------------------------------------------------------------

/**
 * useAdminDomain
 * 
 * Provides the unified admin domain boundary for the admin UI.
 */
export function useAdminDomain() {
  const { user, isAuthenticated, login, logout } = useAuth();

  const isAdmin = isAuthenticated && user?.email === ADMIN_EMAIL;

  const loginAdmin = async (userLogin, password) => {
    if (userLogin === '111111' && password === '111111') {
      try {
        await login(ADMIN_EMAIL, 'admin123456');
        return true;
      } catch (err) {
        console.warn('[adminDomain] Firebase login failed:', err);
        return false;
      }
    }
    return false;
  };

  return {
    // Auth State & Actions
    isAdmin,
    loginAdmin,
    logoutAdmin: logout,

    // Catalog Mutation Commands
    addProduct,
    updateProduct,
    removeProduct,
    persistProducts,
    persistCategories,
    updateBanners,
    resetBannersToSeed,
    regenerateDatabase,
  };
}
