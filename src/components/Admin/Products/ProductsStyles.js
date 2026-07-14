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
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 12,
  },
  tableRowDesktop: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 8,
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
  desktopTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    flexWrap: 'wrap',
  },
  desktopBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  desktopStatusCell: {
    flex: 1,
    minWidth: 120,
  },
  desktopCell: {
    fontSize: 13,
    color: '#1C1C1C',
    minWidth: 80,
  },
  desktopProductCell: {
    flex: 1,
    minWidth: 120,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
  },
  cardMiddleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  priceText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1C1C',
  },
  metaText: {
    fontSize: 13,
    color: '#64748B',
    minWidth: 80,
  },
  actionBtn: {
    minWidth: 90,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#F5F7FA',
  },
  rowActions: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  editBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  deleteBtn: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
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
    color: '#E31B23',
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

  /* Save Button (mirrors categories) */
  saveBtn: {
    marginTop: 20,
    backgroundColor: '#16A34A',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  /* Filter bar */
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  filterToggles: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  filterToggle: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterToggleActive: {
    backgroundColor: '#1C1C1C',
    borderColor: '#1C1C1C',
  },
  filterToggleText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#475569',
  },
  filterToggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sortPickerNative: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1E8E4',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortPickerNativeText: {
    fontSize: 13,
    color: '#475569',
  },
  colHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer', // Web enhancement
  },
  sortArrow: {
    fontSize: 10,
    color: '#E31B23',
    marginLeft: 4,
  },
});

