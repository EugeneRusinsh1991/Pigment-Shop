/**
 * ProductsStyles.js
 */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 24,
  },

  /* Toolbar */
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  searchInputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    borderColor: '#F1E8E4',
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
    color: '#94a3b8',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1C1C1C',
    outlineStyle: 'none',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 18,
    height: 44,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  /* Table */
  tableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1E8E4',
    backgroundColor: '#FAFAFA',
  },
  thText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F9F5F3',
  },
  tableRowAlt: {
    backgroundColor: '#FEFEFE',
  },
  rowNum: {
    width: 24,
    fontSize: 12,
    color: '#94a3b8',
    marginRight: 8,
  },

  /* Cell widths */
  colProduct: { flex: 2.5 },
  colCategory: { flex: 1.5 },
  colBrand: { flex: 1 },
  colPrice: { flex: 0.8 },
  colDiscount: { flex: 0.8 },
  colStock: { flex: 0.7 },
  colStatus: { flex: 0.8 },
  colActions: { flex: 0.7, flexDirection: 'row', gap: 8, justifyContent: 'flex-end' },

  /* Product name & sku */
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  productSku: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 1,
  },
  badgeNew: {
    backgroundColor: '#DBEAFE',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginRight: 4,
    alignSelf: 'flex-start',
  },
  badgeNewText: {
    fontSize: 9,
    color: '#2563EB',
    fontWeight: '700',
  },
  badgesRow: {
    flexDirection: 'row',
    marginTop: 3,
  },

  /* Cells */
  cellText: {
    fontSize: 13,
    color: '#1C1C1C',
  },
  discountText: {
    fontSize: 13,
    color: '#E87A8E',
    fontWeight: '600',
  },
  discountNone: {
    fontSize: 13,
    color: '#94a3b8',
  },
  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  statusActive: { backgroundColor: '#DCFCE7' },
  statusInactive: { backgroundColor: '#F1F5F9' },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusActiveText: { color: '#16A34A' },
  statusInactiveText: { color: '#64748B' },

  /* Action buttons */
  actionBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#F5F7FA',
  },
  actionIcon: {
    fontSize: 14,
  },

  /* Empty state */
  emptyText: {
    textAlign: 'center',
    padding: 40,
    color: '#94a3b8',
    fontSize: 14,
  },
});

