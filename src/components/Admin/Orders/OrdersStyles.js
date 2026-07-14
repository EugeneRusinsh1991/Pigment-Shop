/**
 * OrdersStyles.js
 */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1C',
  },
  countBadge: {
    backgroundColor: '#E31B23',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  countText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  tableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  // Table Header
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 8,
  },
  thText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  colId: { flex: 1 },
  colDate: { flex: 1.5 },
  colCustomer: { flex: 2 },
  colNote: { flex: 0.7, alignItems: 'center' },
  colAdminNote: { flex: 0.7, alignItems: 'center' },
  colTotal: { flex: 1, alignItems: 'flex-end' },
  colStatus: { flex: 1.5, alignItems: 'center' },
  // Row
  row: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 12,
  },
  rowMobile: {
    backgroundColor: '#FBFBFB',
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  rowMiddle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  rowBottom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  customerName: {
    flex: 1,
    minWidth: 100,
    fontWeight: '700',
  },
  metaBlock: {
    flex: 1,
    minWidth: 110,
  },
  metaLabel: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  metaValue: {
    fontSize: 13,
    color: '#1C1C1C',
    fontWeight: '600',
  },
  noteBlock: {
    flex: 1,
    minWidth: 140,
  },
  tdText: {
    fontSize: 14,
    color: '#1C1C1C',
  },
  subText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  // Status Colors
  statusNewBg: { backgroundColor: '#DBEAFE' },
  statusNewText: { color: '#3B82F6' },
  statusProcessingBg: { backgroundColor: '#FEF3C7' },
  statusProcessingText: { color: '#D97706' },
  statusCompletedBg: { backgroundColor: '#D1FAE5' },
  statusCompletedText: { color: '#10B981' },
  statusCancelledBg: { backgroundColor: '#F1F5F9' },
  statusCancelledText: { color: '#64748B' },
  
  // Details Modal
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtnText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1C',
    marginTop: 12,
    marginBottom: 6,
  },
  detailCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  detailValue: {
    fontSize: 14,
    color: '#1C1C1C',
    fontWeight: '500',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  itemLabel: {
    fontSize: 14,
    color: '#1C1C1C',
    flex: 1,
  },
  itemQty: {
    fontSize: 14,
    color: '#64748B',
    marginHorizontal: 16,
  },
  itemPrice: {
    fontSize: 14,
    color: '#1C1C1C',
    fontWeight: '500',
  },
  statusDropdown: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  statusOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  statusOptionText: {
    fontSize: 14,
    color: '#1C1C1C',
  },
  statusOptionActiveText: {
    fontWeight: '700',
    color: '#10B981',
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackBanner: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 10,
    borderWidth: 1,
  },
  feedbackSuccess: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  feedbackError: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  feedbackText: {
    fontSize: 13,
    fontWeight: '600',
  },
  feedbackSuccessText: {
    color: '#166534',
  },
  feedbackErrorText: {
    color: '#B91C1C',
  },
  adminNoteInput: {
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    color: '#1C1C1C',
  },
});
