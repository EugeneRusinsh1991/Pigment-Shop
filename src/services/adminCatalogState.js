/**
 * adminCatalogState.js
 *
 * Dedicated admin catalog state boundary that owns draft mutations and dirty tracking
 * separately from the persistence service. Exposes well-defined actions and subscriptions.
 */

import { normalizeProductEntity, normalizeCategoryEntity } from '../domain/catalogEntityContract';
import { addCategory, updateCategory, removeCategory as removeCategoryPure, getDescendantIds } from './adminCategoriesTransforms';

export class AdminCatalogState {
  constructor(store) {
    this.store = store;
    this.draftProducts = [...this.store.getProducts()];
    this.draftCategories = [...this.store.getCategories()];
    this.isDirty = false;
    this.listeners = new Set();
    this._snapshot = null;

    // Subscribe to store changes so that drafts stay in sync automatically
    // when Firebase updates (or on initial load / reload / regeneration).
    this.store.subscribe(() => {
      if (!this.isDirty) {
        this.draftProducts = [...this.store.getProducts()];
        this.draftCategories = [...this.store.getCategories()];
        this.notify();
      }
    });
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this._snapshot = null;
    this.listeners.forEach((l) => l());
  }

  getSnapshot() {
    if (!this._snapshot) {
      this._snapshot = {
        draftProducts: this.draftProducts,
        draftCategories: this.draftCategories,
        isDirty: this.isDirty,
      };
    }
    return this._snapshot;
  }

  loadDrafts() {
    this.draftProducts = [...this.store.getProducts()];
    this.draftCategories = [...this.store.getCategories()];
    this.isDirty = false;
    this.notify();
  }

  getDraftProducts() {
    return this.draftProducts;
  }

  getDraftCategories() {
    return this.draftCategories;
  }

  getIsDirty() {
    return this.isDirty;
  }

  markClean() {
    this.isDirty = false;
    this.notify();
  }

  addProduct(data) {
    const product = normalizeProductEntity({
      ...data,
      id: `p-admin-${Date.now()}`,
    });
    this.draftProducts = [...this.draftProducts, product];
    this.isDirty = true;
    this.notify();
    return product;
  }

  updateProduct(id, changes) {
    const idx = this.draftProducts.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    const updated = normalizeProductEntity({ ...this.draftProducts[idx], ...changes });
    this.draftProducts = [...this.draftProducts];
    this.draftProducts[idx] = updated;
    this.isDirty = true;
    this.notify();
    return updated;
  }

  removeProduct(id) {
    const before = this.draftProducts;
    const after = before.filter((p) => p.id !== id);
    if (after.length === before.length) return false;
    
    this.draftCategories = this.draftCategories.map((category) => ({
      ...category,
      productIds: (category.productIds || []).filter((productId) => productId !== id),
    }));
    this.draftProducts = after;
    this.isDirty = true;
    this.notify();
    return true;
  }

  addCategory(data) {
    const next = addCategory(normalizeCategoryEntity(data), this.draftCategories);
    if (next) {
      this.draftCategories = next;
      this.isDirty = true;
      this.notify();
      return true;
    }
    return false;
  }

  updateCategory(id, data) {
    const next = updateCategory(id, normalizeCategoryEntity(data), this.draftCategories);
    if (next) {
      this.draftCategories = next;
      this.isDirty = true;
      this.notify();
      return true;
    }
    return false;
  }

  removeCategory(id) {
    const toDeleteIds = getDescendantIds(id, this.draftCategories);
    const deletedCats = this.draftCategories.filter((c) => toDeleteIds.includes(c.id));
    const prodIdsToDelete = new Set(deletedCats.flatMap((c) => c.productIds || []));

    const nextProducts = this.draftProducts.filter((p) => !prodIdsToDelete.has(p.id));
    const nextCategories = removeCategoryPure(id, this.draftCategories);

    this.draftCategories = nextCategories;
    this.draftProducts = nextProducts;
    this.isDirty = true;
    this.notify();
    return true;
  }
}
