/**
 * CategoriesStyles.js
 *
 * Styles for the categories manager container and tree table.
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
    borderBottomColor: '#F9F5F3',
  },
  treeRowAlt: {
    backgroundColor: '#FEFEFE',
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
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#EFF6FF',
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
