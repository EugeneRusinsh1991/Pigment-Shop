import { STATUS_FILTERS } from './OrdersTableControls';
import { compareStrings, compareNumbers } from '../../../utils/sorting';

export function getStatusGroup(status) {
  for (const s of STATUS_FILTERS) {
    if (s.values.includes(status)) return s.key;
  }
  return 'pending';
}

const sortGetters = {
  id: (o) => o.id || '',
  customer: (o) => (o.customerName || '').toLowerCase(),
  date: (o) => o.createdAt?.toDate ? o.createdAt.toDate().getTime() : new Date(o.createdAt || 0).getTime(),
  status: (o) => getStatusGroup(o.status),
  total: (o) => o.totalPrice || 0,
};

export function sortOrders(orders, sortField, sortDirection) {
  const getter = sortGetters[sortField];
  if (!getter) return orders;

  return [...orders].sort((a, b) => {
    const valA = getter(a);
    const valB = getter(b);

    if (typeof valA === 'string' && typeof valB === 'string') {
      return compareStrings(valA, valB, sortDirection);
    }
    return compareNumbers(valA, valB, sortDirection);
  });
}
