import { computeRevenueChartData } from './adminAnalyticsChart';

const STATUS_GROUPS = {
  'Выполнен': 'completed',
  'Completed': 'completed',
  'В обработке': 'processing',
  'Processing': 'processing',
  'Новый заказ': 'pending',
  'New': 'pending',
  'pending': 'pending',
};

const CANONICAL_STATUS_GROUPS = [
  { id: 'pending', keys: ['Новый заказ', 'New', 'pending'] },
  { id: 'processing', keys: ['В обработке', 'Processing'] },
  { id: 'completed', keys: ['Выполнен', 'Completed'] },
  { id: 'cancelled', keys: ['Отменён', 'Cancelled'] },
];

function getSafeId(item) {
  return item?.id || item?.productId || null;
}

function getSafeLabel(item) {
  return item?.label || item?.name || '';
}

function getSafeQty(item) {
  const val = item?.qty ?? item?.quantity;
  return val != null ? val : 0;
}

function accumulateOrderItems(items, status, salesMap) {
  const group = STATUS_GROUPS[status];
  if (!group || !Array.isArray(items)) return;

  for (let j = 0; j < items.length; j++) {
    const item = items[j];
    const id = getSafeId(item);
    if (!id) continue;

    let record = salesMap[id];
    if (!record) {
      record = {
        label: getSafeLabel(item),
        value: 0,
        completed: 0,
        processing: 0,
        pending: 0,
      };
      salesMap[id] = record;
    }
    const qty = getSafeQty(item);
    record.value += qty;
    record[group] += qty;
  }
}

function calculateOrderStatuses(rawStatusCounts) {
  return CANONICAL_STATUS_GROUPS.map(({ id, keys }) => {
    let value = 0;
    for (let k = 0; k < keys.length; k++) {
      value += rawStatusCounts[keys[k]] || 0;
    }
    return { id, status: id, value };
  });
}

function createEmptyAggregationResult() {
  return {
    summaryStats: { revenue: 0, orders: 0, avgOrder: 0, totalSold: 0 },
    orderStatuses: CANONICAL_STATUS_GROUPS.map(({ id }) => ({ id, status: id, value: 0 })),
    salesMap: {},
    allSales: [],
    sortedTopSales: null,
    revenueCache: new Map(),
  };
}

function accumulateOrder(order, rawStatusCounts, salesMap) {
  if (!order) return { revenue: 0, totalItems: 0 };
  const status = order.status || 'Новый заказ';
  rawStatusCounts[status] = (rawStatusCounts[status] || 0) + 1;
  accumulateOrderItems(order.items, status, salesMap);
  return {
    revenue: order.totalPrice || 0,
    totalItems: order.totalItems || 0,
  };
}

function processOrdersList(orders) {
  let revenue = 0;
  let totalSold = 0;
  const rawStatusCounts = {};
  const salesMap = {};
  const len = orders.length;

  for (let i = 0; i < len; i++) {
    const acc = accumulateOrder(orders[i], rawStatusCounts, salesMap);
    revenue += acc.revenue;
    totalSold += acc.totalItems;
  }

  const avgOrder = len > 0 ? Math.round(revenue / len) : 0;
  return {
    summaryStats: { revenue, orders: len, avgOrder, totalSold },
    orderStatuses: calculateOrderStatuses(rawStatusCounts),
    salesMap,
    allSales: Object.values(salesMap),
  };
}

const cache = new WeakMap();

function getAggregations(orders) {
  if (!orders || !Array.isArray(orders) || orders.length === 0) {
    return createEmptyAggregationResult();
  }

  const cached = cache.get(orders);
  if (cached) return cached;

  const processed = processOrdersList(orders);
  const result = {
    ...processed,
    sortedTopSales: null,
    revenueCache: new Map(),
  };

  cache.set(orders, result);
  return result;
}

export function getRevenueChartData(orders, startDate, endDate) {
  if (!orders || !Array.isArray(orders)) return [];
  const agg = getAggregations(orders);
  
  const startMs = startDate ? new Date(startDate).getTime() : 0;
  const endMs = endDate ? new Date(endDate).getTime() : 0;
  const cacheKey = `${startMs}_${endMs}`;

  if (agg.revenueCache.has(cacheKey)) {
    return agg.revenueCache.get(cacheKey);
  }

  const data = computeRevenueChartData(orders, startDate, endDate);
  agg.revenueCache.set(cacheKey, data);
  return data;
}

export function getTopProducts(orders, limit = 5) {
  const agg = getAggregations(orders);
  if (!agg.sortedTopSales) {
    agg.sortedTopSales = [...agg.allSales].sort((a, b) => b.value - a.value);
  }
  return agg.sortedTopSales.slice(0, limit);
}

export function getSummaryStats(orders) {
  return getAggregations(orders).summaryStats;
}

export function getOrderStatuses(orders) {
  return getAggregations(orders).orderStatuses;
}

