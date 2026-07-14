import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardSpecific: {
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '500',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusNewDark: { color: '#60A5FA' },
  statusNewLight: { color: '#2563EB' },
  statusProcessingDark: { color: '#FBBF24' },
  statusProcessingLight: { color: '#D97706' },
  statusCompletedDark: { color: '#34D399' },
  statusCompletedLight: { color: '#15803D' },
  statusCancelledDark: { color: '#F87171' },
  statusCancelledLight: { color: '#DC2626' },
  orderDate: {
    fontSize: 14,
    marginBottom: 16,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '500',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  toggleTextDark: { color: '#60A5FA' },
  toggleTextLight: { color: '#2563EB' },
  itemsList: {
    marginTop: 16,
    borderRadius: 8,
    padding: 12,
  },
  itemsListDark: {
    backgroundColor: '#1E1E1E',
  },
  itemsListLight: {
    backgroundColor: '#F8FAFC',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemBorderDark: {
    borderTopWidth: 1,
    borderTopColor: '#2D2D2D',
  },
  itemBorderLight: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  itemInfo: {
    flex: 1,
    marginRight: 8,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemQtyPrice: {
    fontSize: 12,
    marginTop: 2,
  },
  itemSubtotal: {
    fontSize: 14,
    fontWeight: '600',
  },
  adminCardNew: {
    backgroundColor: '#EFF6FF',
    borderColor: '#DBEAFE',
  },
  adminCardProcessing: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FEF3C7',
  },
  adminCardCompleted: {
    backgroundColor: '#ECFDF5',
    borderColor: '#D1FAE5',
  },
  adminCardCancelled: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FEE2E2',
  },
  adminCardSpecific: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
  },
  adminOrderHeader: {
    marginBottom: 4,
  },
  adminOrderDate: {
    marginBottom: 6,
  },
});
