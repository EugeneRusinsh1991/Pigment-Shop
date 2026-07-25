/**
 * OrdersStyles.js
 */
import { StyleSheet } from 'react-native';
import { colors, layout } from '../../../theme/tokens';
import { shadow } from '../../../theme/shadows';

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
    color: colors.textLight,
  },
  countBadge: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  countText: {
    color: colors.textDark,
    fontWeight: '700',
    fontSize: 14,
  },
  tableCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: 16,
    ...shadow.card(),
    elevation: 2,
    overflow: 'hidden',
  },

  colId: { flex: 1 },
  colDate: { flex: 1.5 },
  colCustomer: { flex: 2 },
  colNote: { flex: 0.7, alignItems: 'center' },
  colAdminNote: { flex: 0.7, alignItems: 'center' },
  colTotal: { flex: 1, alignItems: 'flex-end' },
  colStatus: { flex: 1.5, alignItems: 'center' },
  // Status filter bar
  statusFilterBarScroll: {
    marginBottom: 16,
  },
  statusFilterBar: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 4,
  },
  statusFilterGridMobile: {
    gap: 8,
    marginBottom: 16,
  },
  statusFilterRowMobile: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },

  // Row
  row: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryLightBorder,
    gap: 6,
  },
  rowMobile: {
    backgroundColor: colors.surfaceElevatedLight,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowDate: {
    fontSize: 12,
    color: colors.slateText,
  },
  rowMiddle: {
    flexDirection: 'row',
    gap: 0,
  },
  rowBottom: {
    flexDirection: 'row',
    gap: 0,
    borderTopWidth: 1,
    borderTopColor: colors.secondaryLightBorder,
    paddingTop: 8,
    marginTop: 2,
  },
  customerName: {
    fontWeight: '700',
    fontSize: 14,
    color: colors.textLight,
  },
  metaBlock: {
    flex: 1,
    minWidth: 0,
  },
  metaLabel: {
    fontSize: 10,
    color: colors.secondaryDarkText,
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  metaValue: {
    fontSize: 13,
    color: colors.textLight,
    fontWeight: '600',
  },
  noteBlock: {
    flex: 1,
    minWidth: 0,
  },
  tdText: {
    fontSize: 14,
    color: colors.textLight,
  },
  subText: {
    fontSize: 12,
    color: colors.secondaryDarkText,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Status Colors
  statusNewBg: { backgroundColor: colors.infoBgMid },
  statusNewText: { color: colors.infoStrong },
  statusProcessingBg: { backgroundColor: colors.warningBgMid },
  statusProcessingText: { color: colors.warningDark },
  statusCompletedBg: { backgroundColor: colors.successBgMid },
  statusCompletedText: { color: colors.successMid },
  statusCancelledBg: { backgroundColor: colors.dangerBgLight },
  statusCancelledText: { color: colors.danger },

  // Details Modal
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtnText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.textDescLight,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
    marginTop: 12,
    marginBottom: 6,
  },
  detailCard: {
    backgroundColor: colors.slateLight,
    borderRadius: layout.radii.sm,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.secondaryLightBorder,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 6,
    gap: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.slateText,
    flexShrink: 0,
  },
  detailValue: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '500',
    flexShrink: 1,
    textAlign: 'right',
    flex: 1,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryLightBorder,
  },
  itemLabel: {
    fontSize: 14,
    color: colors.textLight,
    flex: 1,
  },
  itemQty: {
    fontSize: 14,
    color: colors.slateText,
    width: 60,
    textAlign: 'center',
  },
  itemUnitPrice: {
    fontSize: 14,
    color: colors.slateText,
    width: 80,
    textAlign: 'right',
  },
  itemPrice: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '500',
    width: 80,
    textAlign: 'right',
  },
  itemColHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textDescDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusDropdown: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.secondaryLightBorder,
    borderRadius: layout.radii.sm,
    padding: 12,
    marginTop: 8,
  },
  statusOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.slateMid,
  },
  statusOptionText: {
    fontSize: 14,
    color: colors.textLight,
  },
  statusOptionActiveText: {
    fontWeight: '700',
    color: colors.successMid,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: layout.radii.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackBanner: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: layout.radii.xs,
    marginBottom: 10,
    borderWidth: 1,
  },
  feedbackSuccess: {
    backgroundColor: colors.successBgSoft,
    borderColor: colors.successBgFaint,
  },
  feedbackError: {
    backgroundColor: colors.dangerSoftLightBg,
    borderColor: colors.dangerSoftLightBorder,
  },
  feedbackText: {
    fontSize: 13,
    fontWeight: '600',
  },
  feedbackSuccessText: {
    color: colors.successDeeper,
  },
  feedbackErrorText: {
    color: colors.dangerStrong,
  },
  adminNoteInput: {
    backgroundColor: colors.surfaceLight,
    fontSize: 14,
    color: colors.textLight,
  },
});
