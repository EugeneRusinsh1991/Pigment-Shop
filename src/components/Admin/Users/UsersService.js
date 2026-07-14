/**
 * UsersService.js
 *
 * Fetches all registered users from the `users` Firestore collection
 * and enriches each record with their order count and total spend
 * aggregated from the `orders` collection.
 */
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { fetchUsersAndOrders } from '../shared/adminSharedService';

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


export async function loadUsers() {
  const { users, orders } = await fetchUsersAndOrders();
  
  const orderStats = buildOrderStats(orders);

  return users.map((u) => formatUser(u, orders, orderStats));
}

export async function fetchUserNote(uid) {
  const docRef = doc(db, 'adminNotes', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().note || '';
  }
  return '';
}

export async function saveUserNote(uid, noteText) {
  const docRef = doc(db, 'adminNotes', uid);
  const trimmed = (noteText || '').trim();
  await setDoc(docRef, { note: trimmed }, { merge: true });
}

