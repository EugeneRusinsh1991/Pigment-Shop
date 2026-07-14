/**
 * CategoriesStyles.js
 *
 * Styles for the categories manager container and tree table.
 */
import { StyleSheet } from 'react-native';

export const CATEGORY_TYPE_COLORS = {
  category_holder: {
    label: 'Category Holder',
    accent: '#8B5CF6',
    softBg: '#F5F3FF',
    text: '#6D28D9',
  },
  product_holder: {
    label: 'Product Holder',
    accent: '#10B981',
    softBg: '#ECFDF5',
    text: '#047857',
  },
};

export default StyleSheet.create({
  container: {
    padding: 24,
  },

  /* Toolbar */
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  toolbarTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
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

  /* Expand/collapse all controls */
  treeControls: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  treeControlBtn: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 7,
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#E8EDF5',
  },
  treeControlBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },

  /* Table card */
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

  /* Tree row */
  treeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  treeRowAlt: {
    backgroundColor: '#FEFEFE',
  },
  treeRowCategoryHolder: {
    backgroundColor: '#F8F7FF',
    borderLeftColor: '#8B5CF6',
  },
  treeRowProductHolder: {
    backgroundColor: '#F3FCF7',
    borderLeftColor: '#10B981',
  },

  /* Cell widths */
  colName: { flex: 2.5 },
  colImage: { flex: 1 },
  colActions: { flex: 1, flexDirection: 'row', gap: 6, justifyContent: 'flex-end', alignItems: 'center' },

  /* Name cell */
  nameCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  toggleBtn: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleIcon: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '700',
  },
  togglePlaceholder: {
    width: 20,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  categoryId: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 1,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    marginTop: 3,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 999,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },

  cellText: {
    fontSize: 13,
    color: '#475569',
  },

  imageBadge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  imageBadgeSet: { backgroundColor: '#DCFCE7' },
  imageBadgeNone: { backgroundColor: '#F1F5F9' },
  imageBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  imageBadgeSetText: { color: '#16A34A' },
  imageBadgeNoneText: { color: '#64748B' },

  /* Action buttons */
  actionBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#F5F7FA',
  },
  addChildBtn: {
    minWidth: 120,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
  },
  addChildBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  actionIcon: {
    fontSize: 13,
  },

  /* Save Button */
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

  /* Empty */
  emptyText: {
    textAlign: 'center',
    padding: 40,
    color: '#94a3b8',
    fontSize: 14,
  },
});
