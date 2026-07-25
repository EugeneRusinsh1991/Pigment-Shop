/**
 * collections.js
 * 
 * Centralized registry of all Firestore collection names used in the application.
 * Use these constants instead of hardcoded strings to prevent typos and facilitate refactoring.
 */

export const COLLECTIONS = {
  CATEGORIES: 'categories',
  PRODUCTS: 'products',
  ORDERS: 'orders',
  USERS: 'users',
  SETTINGS: 'settings',
  SUPPORT_MESSAGES: 'support_messages',
  ADMIN_NOTES: 'adminNotes',
  BANNERS: 'banners',

  // Nested subcollections
  PRODUCT_REVIEWS: 'reviews',
  PRODUCT_QUESTIONS: 'questions',
};
