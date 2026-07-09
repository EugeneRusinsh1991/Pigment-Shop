/**
 * adminAnalytics.js
 *
 * Seeded analytics data for the admin dashboard.
 * In a real app this would come from a backend API.
 */

import { getAdminProducts } from './adminProducts';

/** Generate 14-day revenue data relative to today */
export function getRevenueChartData() {
  const today = new Date();
  const data = [];
  const base = [200, 150, 400, 300, 500, 250, 800, 700, 600, 900, 1200, 3000, 4500, 1800];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const label = `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
    data.push({ label, value: base[13 - i] || 0 });
  }
  return data;
}

/** Top products by sold quantity */
export function getTopProducts(limit = 5) {
  return getAdminProducts()
    .sort((a, b) => b.sold - a.sold)
    .slice(0, limit)
    .map((p) => ({ label: p.label, value: p.sold }));
}

/** Summary stats */
export function getSummaryStats() {
  const products = getAdminProducts();
  const totalSold = products.reduce((s, p) => s + p.sold, 0);
  const revenue = products.reduce((s, p) => {
    const effectivePrice = p.discountPercent
      ? Math.round(p.price * (1 - p.discountPercent / 100))
      : p.price;
    return s + effectivePrice * p.sold;
  }, 0);
  const orders = Math.ceil(totalSold / 3);
  const avgOrder = orders > 0 ? Math.round(revenue / orders) : 0;
  return { revenue, orders, avgOrder, totalSold };
}

/** Order status distribution (seeded) */
export function getOrderStatuses() {
  return [
    { label: 'Выполнен', value: 68, color: '#5B8CF5' },
    { label: 'В обработке', value: 22, color: '#E87A8E' },
    { label: 'Отменён', value: 10, color: '#94a3b8' },
  ];
}
