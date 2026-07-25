/**
 * adminOrdersService.js
 *
 * Manages admin orders logic: fetch all orders, load user profiles for those orders,
 * and update order statuses.
 */
import { COLLECTIONS } from './collections';
import { updateOrderStatus as updateStatusRepo, updateAdminNote as updateNoteRepo } from './repositories/ordersRepository';
import { fetchUsersAndOrders } from '../components/Admin/shared/adminSharedService';
import { withServiceContract } from './serviceContract';

function buildFullName(firstName, lastName, fallback) {
  return [firstName, lastName].filter(Boolean).join(' ') || fallback;
}

function buildCustomerShape(name, phone, email, city, isGuest) {
  return { name, phone: phone || '', email: email || '', city: city || '', isGuest };
}

function extractGuestCustomerInfo(customerInfo) {
  const name = buildFullName(customerInfo.firstName, customerInfo.lastName, 'Guest');
  return buildCustomerShape(name, customerInfo.phone, customerInfo.email, customerInfo.city, true);
}

function extractAuthCustomerInfo(user) {
  if (!user) return buildCustomerShape('Unknown', '', '', '', false);
  const { firstName, lastName } = user.profile || {};
  const name = buildFullName(firstName, lastName, user.email || 'Unknown');
  return buildCustomerShape(name, user.profile?.phone, user.email, user.profile?.city, false);
}

function extractCustomerInfo(user, order) {
  if (order?.isGuestOrder && order?.customerInfo) {
    return extractGuestCustomerInfo(order.customerInfo);
  }
  return extractAuthCustomerInfo(user);
}

function enrichOrderData(order, userMap) {
  const user = userMap[order.userId];
  const { name: customerName, phone: customerPhone, email: customerEmail, city: customerCity, isGuest } = extractCustomerInfo(user, order);
  return { ...order, customerName, customerPhone, customerEmail, customerCity, isGuest };
}

async function _loadAdminOrders() {
  const { users, orders } = await fetchUsersAndOrders();

  const userMap = Object.fromEntries(users.map((u) => [u.uid, u]));

  const enriched = orders.map((order) => enrichOrderData(order, userMap));

  return enriched.sort((a, b) => {
    const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
    const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
    return timeB - timeA;
  });
}

async function _updateOrderStatus(orderId, newStatus) {
  const res = await updateStatusRepo(orderId, newStatus);
  if (!res.success) throw new Error(res.error || 'Failed to update order status');
  return res.data;
}

async function _updateAdminNote(orderId, adminNote) {
  const res = await updateNoteRepo(orderId, adminNote);
  if (!res.success) throw new Error(res.error || 'Failed to update admin note');
  return res.data;
}

export const loadAdminOrders = withServiceContract(_loadAdminOrders, 'Failed to load orders');
export const updateOrderStatus = withServiceContract(_updateOrderStatus, 'Failed to update order status');
export const updateAdminNote = withServiceContract(_updateAdminNote, 'Failed to update admin note');
