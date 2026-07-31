/**
 * mockFactories.js
 *
 * Deterministic factory functions for all catalog domain entities.
 * All factories accept an `overrides` object and return deeply-cloned
 * objects to prevent accidental in-memory state contamination.
 */

import { PRODUCT_PLACEHOLDER } from '../../constants/index.js';

let _productCounter = 0;
let _categoryCounter = 0;
let _orderCounter = 0;

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createMockProduct(overrides = {}) {
  _productCounter++;
  const base = {
    id: `mock-product-${_productCounter}`,
    label: { uk: `Продукт ${_productCounter}`, ru: `Продукт ${_productCounter}`, en: `Product ${_productCounter}` },
    description: { uk: 'Тестовий опис', ru: 'Тестовое описание', en: 'Test description' },
    price: 100 + _productCounter * 10,
    images: [PRODUCT_PLACEHOLDER],
    sold: _productCounter,
    stock: 10,
    active: true,
    isNew: false,
    discountPercent: 0,
    sku: `SKU-${_productCounter.toString().padStart(4, '0')}`,
    brand: 'MockBrand',
    categoryId: 'mock-category-1',
  };
  return deepClone({ ...base, ...overrides });
}

function createMockCategory(overrides = {}) {
  _categoryCounter++;
  const base = {
    id: `mock-category-${_categoryCounter}`,
    name: { uk: `Категорія ${_categoryCounter}`, ru: `Категория ${_categoryCounter}`, en: `Category ${_categoryCounter}` },
    slug: `category-${_categoryCounter}`,
    icon: 'tag',
    productIds: [],
    parentId: null,
  };
  return deepClone({ ...base, ...overrides });
}

export function createMockUser(overrides = {}) {
  const base = {
    uid: 'mock-user-1',
    email: 'mock@example.com',
    displayName: 'Mock User',
    role: 'user',
    photoURL: null,
  };
  return deepClone({ ...base, ...overrides });
}

/** Pre-built collections for mock repos to slice from */
export const MOCK_PRODUCTS = Array.from({ length: 30 }, (_, i) =>
  createMockProduct({ id: `mock-product-${i + 1}`, categoryId: i < 15 ? 'mock-category-1' : 'mock-category-2' })
);

export const MOCK_CATEGORIES = [
  createMockCategory({ id: 'mock-category-1', productIds: MOCK_PRODUCTS.slice(0, 15).map((p) => p.id) }),
  createMockCategory({ id: 'mock-category-2', productIds: MOCK_PRODUCTS.slice(15).map((p) => p.id) }),
];
