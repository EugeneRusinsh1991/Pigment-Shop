/**
 * adminUsersService.js
 *
 * Fetches all registered users from the users collection
 * and enriches each record with their order count and total spend
 * aggregated from the orders collection.
 */
import { fetchUserNote as fetchNoteRepo, saveUserNote as saveNoteRepo } from './repositories/usersRepository';
import { fetchUsersAndOrders } from '../components/Admin/shared/adminSharedService';
import { withServiceContract } from './serviceContract';

function buildOrderStats(orders) {
  const stats = {};
  for (const order of orders) {
    const uid = order.userId;
    if (!uid) continue;
    if (!stats[uid]) stats[uid] = { count: 0, total: 0 };
    stats[uid].count += 1;
    stats[uid].total += Number(order.total) || 0;
  }
  return stats;
}

function getOrderTime(order) {
  return order.createdAt?.toMillis ? order.createdAt.toMillis() : 0;
}

function sortOrdersByDate(orders) {
  return [...orders].sort((a, b) => getOrderTime(b) - getOrderTime(a));
}

function getUserOrders(userId, orders) {
  const userOrders = orders.filter(o => o.userId === userId);
  return sortOrdersByDate(userOrders);
}

function getProfile(u) {
  return u.profile || {};
}

function getProfileField(profile, field) {
  return profile[field] || '';
}

function getUserEmail(u, profile) {
  return u.email || profile.email || '';
}

function getUserStats(orderStats, uid) {
  return orderStats[uid] || { count: 0, total: 0 };
}

function formatUser(u, orders, orderStats) {
  const profile = getProfile(u);
  const stats = getUserStats(orderStats, u.uid);
  return {
    uid: u.uid,
    firstName: getProfileField(profile, 'firstName'),
    lastName: getProfileField(profile, 'lastName'),
    email: getUserEmail(u, profile),
    phone: getProfileField(profile, 'phone'),
    city: getProfileField(profile, 'city'),
    promoCode: getProfileField(profile, 'promoCode'),
    orderCount: stats.count,
    orderTotal: stats.total,
    orders: getUserOrders(u.uid, orders),
  };
}


async function _loadUsers() {
  const { users, orders } = await fetchUsersAndOrders();
  
  const orderStats = buildOrderStats(orders);

  return users.map((u) => formatUser(u, orders, orderStats));
}

async function _fetchUserNote(uid) {
  return await fetchNoteRepo(uid);
}

async function _saveUserNote(uid, noteText) {
  await saveNoteRepo(uid, noteText);
}

export const loadUsers = withServiceContract(_loadUsers, 'Failed to load users');
export const fetchUserNote = withServiceContract(_fetchUserNote, 'Failed to fetch user note');
export const saveUserNote = withServiceContract(_saveUserNote, 'Failed to save user note');
