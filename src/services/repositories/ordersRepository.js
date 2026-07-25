import { collection, doc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/index.js';
import { COLLECTIONS } from '../collections.js';

/**
 * Persists a new order.
 * Internally sets `createdAt` to `serverTimestamp()`.
 * @param {Object} orderData - The order details payload.
 * @returns {Promise<{id: string}>} The generated order ID wrapped in an object.
 */
export async function createOrder(orderData) {
  const payload = {
    ...orderData,
    createdAt: serverTimestamp(),
  };
  const orderRef = await addDoc(collection(db, COLLECTIONS.ORDERS), payload);
  return { id: orderRef.id };
}

/**
 * Updates the status of an existing order.
 * @param {string} orderId
 * @param {string} newStatus
 * @returns {Promise<void>}
 */
export async function updateOrderStatus(orderId, newStatus) {
  const orderRef = doc(db, COLLECTIONS.ORDERS, orderId);
  await updateDoc(orderRef, { status: newStatus });
}

/**
 * Updates the admin note for an existing order.
 * @param {string} orderId
 * @param {string|null} adminNote
 * @returns {Promise<void>}
 */
export async function updateAdminNote(orderId, adminNote) {
  const orderRef = doc(db, COLLECTIONS.ORDERS, orderId);
  await updateDoc(orderRef, {
    adminNote: adminNote && adminNote.trim().length > 0 ? adminNote.trim() : null,
  });
}
