import { getProducts } from './catalogState';

function formatDateLabel(date) {
  return `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

function getOrderDate(order) {
  if (!order.createdAt) return null;
  return order.createdAt.toDate ? order.createdAt.toDate() : new Date(order.createdAt);
}

function isDateInRange(date, start, end) {
  return date >= start && date <= end;
}

function processOrderForRevenue(order, start, end, data) {
  const orderDate = getOrderDate(order);
  if (!orderDate || !isDateInRange(orderDate, start, end)) {
    return;
  }
  const label = formatDateLabel(orderDate);
  const dayData = data.find((d) => d.dateKey === label);
  if (dayData) {
    dayData.value += order.totalPrice || 0;
  }
}

/** Generate revenue data by day within the date range */
export function getRevenueChartData(orders, startDate, endDate) {
  const data = [];
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  // Initialize all days in range with 0 revenue
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const label = formatDateLabel(d);
    data.push({ label, value: 0, dateKey: label });
  }

  // Aggregate revenue from orders
  orders.forEach((order) => processOrderForRevenue(order, start, end, data));

  return data;
}

/** Aggregate product sales from orders */
function getProductSales(orders) {
  const sales = {};
  orders.forEach((order) => {
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach((item) => {
        if (!sales[item.id]) {
          sales[item.id] = { label: item.name, value: 0 };
        }
        sales[item.id].value += item.qty;
      });
    }
  });
  return Object.values(sales);
}

/** Top products by sold quantity */
export function getTopProducts(orders, limit = 5) {
  const sales = getProductSales(orders);
  return sales.sort((a, b) => b.value - a.value).slice(0, limit);
}

/** Lowest-selling products */
export function getLowestSellingProducts(orders, limit = 5) {
  const sales = getProductSales(orders);
  const allProducts = getProducts();
  
  // Include products with 0 sales
  const allProductSales = allProducts.map((p) => {
    const sold = sales.find((s) => s.label === p.name || s.label === p.name?.ru);
    return {
      label: p.name,
      value: sold ? sold.value : 0
    };
  });

  return allProductSales.sort((a, b) => a.value - b.value).slice(0, limit);
}

/** Summary stats */
export function getSummaryStats(orders) {
  const totalSold = orders.reduce((sum, order) => sum + (order.totalItems || 0), 0);
  const revenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  const ordersCount = orders.length;
  const avgOrder = ordersCount > 0 ? Math.round(revenue / ordersCount) : 0;
  
  return { revenue, orders: ordersCount, avgOrder, totalSold };
}

const STATUS_COLOR_MAP = {
  'Новый заказ': '#5B8CF5',
  'В обработке': '#E87A8E',
  'Отменён': '#94a3b8',
  'Выполнен': '#10B981',
};

/** Order status distribution */
export function getOrderStatuses(orders) {
  const statuses = {};
  orders.forEach((order) => {
    const status = order.status || 'Новый заказ';
    statuses[status] = (statuses[status] || 0) + 1;
  });

  return Object.keys(statuses).map((status) => ({
    label: status,
    value: statuses[status],
    color: STATUS_COLOR_MAP[status] || '#CBD5E1',
  }));
}
