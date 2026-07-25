import { collection, doc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/index.js';
import { COLLECTIONS } from '../collections.js';
import { withServiceContract } from '../serviceContract.js';

async function _createOrder(orderData) {
  const payload = {
    ...orderData,
    createdAt: serverTimestamp(),
  };
  const orderRef = await addDoc(collection(db, COLLECTIONS.ORDERS), payload);
  return { id: orderRef.id };
}

async function _updateOrderStatus(orderId, newStatus) {
  const orderRef = doc(db, COLLECTIONS.ORDERS, orderId);
  await updateDoc(orderRef, { status: newStatus });
}

async function _updateAdminNote(orderId, adminNote) {
  const orderRef = doc(db, COLLECTIONS.ORDERS, orderId);
  await updateDoc(orderRef, {
    adminNote: adminNote && adminNote.trim().length > 0 ? adminNote.trim() : null,
  });
}

export const createOrder = withServiceContract(_createOrder, 'Failed to create order');
export const updateOrderStatus = withServiceContract(_updateOrderStatus, 'Failed to update order status');
export const updateAdminNote = withServiceContract(_updateAdminNote, 'Failed to update admin note');

