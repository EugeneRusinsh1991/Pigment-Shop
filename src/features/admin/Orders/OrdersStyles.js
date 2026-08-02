/**
 * OrdersStyles.js
 */
import { StyleSheet } from 'react-native';
import { colors, layout, shadow } from '../../../theme/tokens';

export default StyleSheet.create({
  container: {
    paddingHorizontal: layout.spacing.xl,
    paddingTop: layout.spacing.xl,
    paddingBottom: layout.spacing.xxl,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.xl,
  },
  title: {
    color: colors.textLight,
  },
  countBadge: {
    backgroundColor: colors.accent,
    borderRadius: layout.radii.sm,
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.xxs,
  },
  countText: {
    color: colors.textDark,
  },
  tableCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: layout.radii.md,
    padding: layout.spacing.lg,
    ...shadow.card(),
    elevation: layout.elevation.sm,
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
    marginBottom: layout.spacing.lg,
  },
  statusFilterBar: {
    flexDirection: 'row',
    gap: layout.spacing.sm,
    paddingRight: layout.spacing.xxs,
  },
  statusFilterGridMobile: {
    gap: layout.spacing.sm,
    marginBottom: layout.spacing.lg,
  },
  statusFilterRowMobile: {
    flexDirection: 'row',
    gap: layout.spacing.sm,
    width: '100%',
  },

  // Row
  row: {
    flexDirection: 'column',
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.md,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.secondaryLightBorder,
    gap: layout.spacing.xs,
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
  rowMiddleCompact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: layout.spacing.xxs,
  },
  priceValue: {
    color: colors.textLight,
  },
  noteIndicatorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xs,
    marginTop: layout.spacing.xxs,
  },
  noteIndicatorPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.xs + 2,
    paddingVertical: layout.spacing.xxxs,
    borderRadius: layout.radii.xs,
    borderWidth: layout.borderWidth.thin,
  },
  customerName: {
    color: colors.textLight,
    flex: 1,
    marginRight: layout.spacing.sm,
  },
  metaBlock: {
    flex: 1,
    minWidth: 0,
  },
  metaLabel: {
    color: colors.secondaryDarkText,
    marginBottom: layout.elevation.sm,
  },
  metaLabelInline: {
    color: colors.secondaryDarkText,
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
    marginTop: layout.elevation.sm,
  },
  statusBadge: {
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.xxs,
    borderRadius: layout.radii.full,
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
    marginBottom: layout.spacing.xl,
  },
  backBtnText: {
    marginLeft: layout.spacing.sm,
    color: colors.textDescLight,
  },
  sectionTitle: {
    color: colors.textLight,
    marginTop: layout.spacing.md,
    marginBottom: layout.spacing.xs,
  },
  detailCard: {
    backgroundColor: colors.slateLight,
    borderRadius: layout.radii.sm,
    padding: layout.spacing.md,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.secondaryLightBorder,
    marginBottom: layout.spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: layout.spacing.xs,
    gap: layout.spacing.xxs,
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
    paddingVertical: layout.spacing.xs,
    borderBottomWidth: layout.borderWidth.thin,
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
  },
  itemHeaderRow: {
    paddingBottom: layout.spacing.sm,
  },
  itemTotalRow: {
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: colors.secondaryLightBorder,
    borderBottomWidth: layout.borderWidth.none,
    marginTop: layout.spacing.xxs,
  },
  statusDropdown: {
    backgroundColor: colors.surfaceLight,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.secondaryLightBorder,
    borderRadius: layout.radii.sm,
    padding: layout.spacing.md,
    marginTop: layout.spacing.sm,
  },
  statusOption: {
    paddingVertical: layout.spacing.sm,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.slateMid,
  },
  statusOptionText: {
    color: colors.textLight,
  },
  statusOptionActiveText: {
    color: colors.accent,
  },
  btn: {
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.md,
    borderRadius: layout.radii.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackBanner: {
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.md,
    borderRadius: layout.radii.xs,
    marginBottom: layout.spacing.sm,
    borderWidth: layout.borderWidth.thin,
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

  // Helper classes for eliminating inline styles across Orders components
  guestBanner: {
    backgroundColor: colors.warningBgLegacy,
    padding: layout.spacing.md,
    borderRadius: layout.radii.xs,
    marginBottom: layout.spacing.md,
  },
  guestBannerText: {
    color: colors.warningDeep,
  },
  rowMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowNotes: {
    flexDirection: 'row',
    gap: layout.spacing.xl,
    marginTop: layout.spacing.xxs,
  },
  noteItem: {
    flexDirection: 'row',
    flex: 1,
    gap: layout.spacing.xxs,
  },
  loadingIndicator: {
    marginTop: layout.spacing.xxl,
  },
  errorText: {
    marginTop: layout.spacing.xl,
  },
  filterBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: layout.spacing.lg,
    flexWrap: 'wrap',
    gap: layout.spacing.sm,
  },
  dropdownMenuContainer: {
    position: 'absolute',
    top: layout.spacing.xl * 2,
    left: layout.spacing.none,
    right: layout.spacing.none,
    backgroundColor: colors.surfaceLight,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.secondaryLightBorder,
    borderRadius: layout.radii.sm,
    elevation: layout.elevation.md,
    zIndex: layout.zIndices.dropdown,
    overflow: 'hidden',
    ...shadow.dropdown(),
  },
  dropdownOption: {
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.md,
    backgroundColor: colors.surfaceLight,
  },
  dropdownOptionBorder: {
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.slateMid,
  },
  dropdownOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.sm,
  },
  statusDot: {
    width: layout.spacing.sm,
    height: layout.spacing.sm,
    borderRadius: layout.spacing.xxs,
  },
  checkmark: {
    marginLeft: layout.spacing.xxs,
  },
  statusSelectorContainer: {
    zIndex: layout.zIndices.dropdown,
    position: 'relative',
    marginBottom: layout.spacing.md,
  },
  filterModalContainer: {
    backgroundColor: colors.surfaceLight,
    borderRadius: layout.radii.md,
    padding: layout.spacing.lg,
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
  },
  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.md,
  },
  filterModalContent: {
    paddingVertical: layout.spacing.xs,
    gap: layout.spacing.sm,
  },
  modalRow: {
    flexDirection: 'row',
    gap: layout.spacing.sm,
    width: '100%',
  },
  modalFlagHalf: {
    flex: 1,
  },
  modalFlagFull: {
    width: '100%',
  },
});
