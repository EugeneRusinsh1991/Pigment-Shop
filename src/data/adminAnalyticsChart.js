import { formatDateNumeric } from '../utils/dateFormatting';

export function getOrderDate(order) {
  if (!order || !order.createdAt) return null;
  return order.createdAt.toDate ? order.createdAt.toDate() : new Date(order.createdAt);
}

function createDateRangeMap(start, end) {
  const data = [];
  if (!start || !end) return { data, dayMap: new Map(), startMs: 0, endMs: 0 };

  const startDate = new Date(start);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(end);
  endDate.setHours(23, 59, 59, 999);

  const dayMap = new Map();
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const label = formatDateNumeric(d);
    const item = { label, value: 0, dateKey: label };
    dayMap.set(label, item);
    data.push(item);
  }

  return { data, dayMap, startMs: startDate.getTime(), endMs: endDate.getTime() };
}

function isWithinTimeRange(time, startMs, endMs) {
  return time >= startMs && time <= endMs;
}

function processSingleOrderRevenue(order, startMs, endMs, dayMap) {
  const orderDate = getOrderDate(order);
  if (!orderDate) return;
  if (!isWithinTimeRange(orderDate.getTime(), startMs, endMs)) return;

  const label = formatDateNumeric(orderDate);
  const dayData = dayMap.get(label);
  if (dayData) {
    dayData.value += Number(order.totalPrice) || 0;
  }
}

function accumulateOrderRevenue(orders, startMs, endMs, dayMap) {
  orders.forEach((order) => processSingleOrderRevenue(order, startMs, endMs, dayMap));
}

export function computeRevenueChartData(orders, start, end) {
  const { data, dayMap, startMs, endMs } = createDateRangeMap(start, end);
  if (data.length === 0) return data;
  accumulateOrderRevenue(orders, startMs, endMs, dayMap);
  return data;
}
