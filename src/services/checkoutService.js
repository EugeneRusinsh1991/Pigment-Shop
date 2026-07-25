import { COLLECTIONS } from './collections';
import { createOrder } from './repositories/ordersRepository';
import { notifyOrderCreated } from './telegramService';
import { withServiceContract } from './serviceContract';

export const ORDER_STATUS = {
  NEW: 'Новый заказ',
  PROCESSING: 'В обработке',
  COMPLETED: 'Выполнен',
  CANCELLED: 'Отменён',
};

function getCleanItems(items) {
  return items.map(item => {
    const cleanItem = { ...item };
    Object.keys(cleanItem).forEach(key => {
      if (cleanItem[key] === undefined) delete cleanItem[key];
    });
    return cleanItem;
  });
}

export function isCustomerInfoComplete(customerInfo) {
  if (!customerInfo) return false;
  const required = ['email', 'firstName', 'lastName', 'phone', 'city'];
  return required.every((key) => {
    const fieldValue = customerInfo[key];
    return typeof fieldValue === 'string' && fieldValue.trim().length > 0;
  });
}

function generateOrderUserId(user) {
  if (user?.uid) return user.uid;
  return `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function buildOrderData({ user, items, totalItems, totalPrice, note, customerInfo }) {
  const isGuest = !user;
  const uid = generateOrderUserId(user);
  const trimmedNote = note?.trim();

  return {
    userId: uid,
    items: getCleanItems(items),
    totalItems,
    totalPrice,
    status: ORDER_STATUS.NEW,
    customerInfo: {
      email: customerInfo.email,
      firstName: customerInfo.firstName,
      lastName: customerInfo.lastName,
      phone: customerInfo.phone,
      city: customerInfo.city,
    },
    ...(isGuest && { isGuestOrder: true }),
    ...(trimmedNote ? { note: trimmedNote } : {})
  };
}

export async function sendOrderNotification({ orderId, totalItems, totalPrice }) {
  const result = await notifyOrderCreated({
    orderId,
    totalItems,
    totalPrice,
    createdAt: new Date().toISOString(),
    status: ORDER_STATUS.NEW
  });
  if (!result.success) {
    console.warn('[checkoutService] Notification failed:', result.error || 'Unknown error', {
      orderId,
      totalItems,
      totalPrice,
      errorDetails: result,
    });
  }
  return result;
}

async function _processCheckout({ user, items, totalItems, totalPrice, note, customerInfo }) {
  if (!isCustomerInfoComplete(customerInfo)) {
    const err = new Error('Customer profile is incomplete');
    err.code = 'INCOMPLETE_PROFILE';
    throw err;
  }

  const orderData = buildOrderData({ user, items, totalItems, totalPrice, note, customerInfo });
  const result = await createOrder(orderData);

  await sendOrderNotification({ orderId: result.id, totalItems, totalPrice });

  return result.id;
}

export const processCheckout = withServiceContract(_processCheckout, 'Order creation failed');

export const checkoutService = {
  processCheckout,
  isCustomerInfoComplete,
  sendOrderNotification,
  ORDER_STATUS,
};
