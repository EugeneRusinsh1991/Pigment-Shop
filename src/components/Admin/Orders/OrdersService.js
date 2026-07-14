/**
 * OrdersService.js
 *
 * Manages admin orders logic: fetch all orders, load user profiles for those orders,
 * and update order statuses.
 */
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { fetchUsersAndOrders } from '../shared/adminSharedService';

function getProfileFullName(profile) {
  if (!profile) return '';
  const parts = [];
  if (profile.firstName) parts.push(profile.firstName);
  if (profile.lastName) parts.push(profile.lastName);
  return parts.join(' ');
}

function getCustomerName(user) {
  if (!user) {
    return 'Unknown';
  }
  const fullName = getProfileFullName(user.profile);
  if (fullName) {
    return fullName;
  }
  if (user.email) {
    return user.email;
  }
  return 'Unknown';
}

function getCustomerPhone(user) {
  return user?.profile?.phone || '';
}

function getCustomerEmail(user) {
  return user?.email || '';
}

function getCustomerCity(user) {
  return user?.profile?.city || '';
}

function extractCustomerInfo(user, order) {
  // If this is a guest order, use customerInfo from the order itself
  if (order?.isGuestOrder && order?.customerInfo) {
    return {
      name: `${order.customerInfo.firstName || ''} ${order.customerInfo.lastName || ''}`.trim() || 'Guest',
      phone: order.customerInfo.phone || '',
      email: order.customerInfo.email || '',
      city: order.customerInfo.city || '',
      isGuest: true,
    };
  }

  // For authenticated orders, get info from user profile
  if (!user) {
    return {
      name: 'Unknown',
      phone: '',
      email: '',
      city: '',
      isGuest: false,
    };
  }

  const fullName = getProfileFullName(user.profile);
  return {
    name: fullName || user.email || 'Unknown',
    phone: getCustomerPhone(user),
    email: getCustomerEmail(user),
    city: getCustomerCity(user),
    isGuest: false,
  };
}

function enrichOrderData(order, userMap) {
  const user = userMap[order.userId];
  const { name: customerName, phone: customerPhone, email: customerEmail, city: customerCity, isGuest } = extractCustomerInfo(user, order);

  return {
    ...order,
    customerName,
    customerPhone,
    customerEmail,
    customerCity,
    isGuest,
  };
}

export async function loadAdminOrders() {
  const { users, orders } = await fetchUsersAndOrders();
  
  // Create user map for quick lookup
  const userMap = {};
  users.forEach((u) => {
    userMap[u.uid] = u;
  });

  const enriched = orders.map((order) => enrichOrderData(order, userMap));
  
  // Sort orders newest first
  return enriched.sort((a, b) => {
    const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
    const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
    return timeB - timeA;
  });
}

export async function updateOrderStatus(orderId, newStatus) {
  const orderRef = doc(db, 'orders', orderId);
  await updateDoc(orderRef, {
    status: newStatus
  });
}

export async function updateAdminNote(orderId, adminNote) {
  const orderRef = doc(db, 'orders', orderId);
  await updateDoc(orderRef, {
    adminNote: adminNote && adminNote.trim().length > 0 ? adminNote.trim() : null
  });
}
