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
    color: colors.textLight,
  },
  metaBlock: {
    flex: 1,
    minWidth: 0,
  },
  metaLabel: {
    color: colors.secondaryDarkText,
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  metaValue: {
    color: colors.textLight,
  },
  noteBlock: {
    flex: 1,
    minWidth: 0,
  },
  tdText: {
    color: colors.textLight,
  },
  subText: {
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
    color: colors.textDescLight,
  },
  sectionTitle: {
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
    color: colors.slateText,
    flexShrink: 0,
  },
  detailValue: {
    color: colors.textLight,
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
    color: colors.textLight,
    flex: 1,
  },
  itemQty: {
    color: colors.slateText,
    width: 60,
    textAlign: 'center',
  },
  itemUnitPrice: {
    color: colors.slateText,
    width: 80,
    textAlign: 'right',
  },
  itemPrice: {
    color: colors.textLight,
    width: 80,
    textAlign: 'right',
  },
  itemColHeader: {
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
    color: colors.textLight,
  },
  statusOptionActiveText: {
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
  feedbackText: {},
  feedbackSuccessText: {
    color: colors.successDeeper,
  },
  feedbackErrorText: {
    color: colors.dangerStrong,
  },
  adminNoteInput: {
    backgroundColor: colors.surfaceLight,
    color: colors.textLight,
  },
});
