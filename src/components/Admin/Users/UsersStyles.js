/**
 * UsersStyles.js
 */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
  },
  countBadge: {
    backgroundColor: '#F5F1EE',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
  },
  loading: {
    marginTop: 40,
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 14,
  },
  emptyText: {
    marginTop: 40,
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 14,
  },
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
    flexWrap: 'wrap',
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
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableRowAlt: {
    backgroundColor: '#FEFEFE',
  },
  rowNum: {
    width: 24,
    fontSize: 12,
    color: '#94a3b8',
    marginRight: 8,
    marginTop: 4,
  },
  userCell: {
    flex: 1,
    minWidth: 120,
    marginBottom: 4,
  },
  cellText: {
    fontSize: 13,
    color: '#1C1C1C',
  },
  cellTextMuted: {
    fontSize: 13,
    color: '#cbd5e1',
    fontStyle: 'italic',
  },
  colName: { flex: 2, minWidth: 140 },
  colEmail: { flex: 2, minWidth: 160 },
  colPhone: { flex: 1.5, minWidth: 120 },
  colOrders: { flex: 0.8, minWidth: 70, alignItems: 'flex-end' },

  ordersBadge: {
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ordersBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },

  /* Details Panel */
  detailsPanel: {
    flex: 1,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  backBtnText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  clientInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap',
  },
  infoGroup: {
    flexDirection: 'column',
    gap: 4,
  },
  infoLabel: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
    color: '#1C1C1C',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 12,
  },
  ordersList: {
    gap: 12,
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
  noteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1C',
    marginBottom: 10,
  },
  noteInput: {
    minHeight: 80,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#1C1C1C',
    borderWidth: 1,
    borderColor: '#E8EDF5',
    textAlignVertical: 'top',
    outlineStyle: 'none',
    marginBottom: 12,
  },
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  noteSaveBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSaveBtnDisabled: {
    backgroundColor: '#cbd5e1',
  },
  noteSaveBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

