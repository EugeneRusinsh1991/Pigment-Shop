/**
 * ProductsStyles.js
 */
import { StyleSheet } from 'react-native';
import { buttonTokens, colors, layout, shadow } from '../../../theme/tokens';

export default StyleSheet.create({
  container: {
    padding: layout.spacing.xl,
  },

  /* Toolbar */
  toolbar: {
    marginBottom: layout.spacing.md,
  },

  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: layout.spacing.sm,
    marginBottom: layout.spacing.lg,
  },
  controlBtn: {
    height: buttonTokens.sizes.sm.height,
    paddingHorizontal: layout.radii.iconBtn,
    borderRadius: layout.radii.lg,
    borderWidth: layout.borderWidth.focus,
    borderColor: colors.secondaryLightBorder,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtnActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  controlBtnAction: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  controlBtnText: {
    color: colors.textDescLight,
  },
  controlBtnTextActive: {
    color: colors.white,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xs,
    backgroundColor: colors.accent,
    borderRadius: layout.radii.sm,
    paddingVertical: layout.spacing.md - 1,
    paddingHorizontal: layout.spacing.lg,
    height: 44,
  },
  addBtnText: {
    color: colors.white,
  },
  /* Mobile toolbar (stacked) */
  mobileToolbar: {
    flexDirection: 'column',
    gap: layout.spacing.md - 2,
    marginBottom: layout.spacing.lg,
  },
  mobileAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: layout.spacing.xs,
    backgroundColor: colors.accent,
    borderRadius: layout.radii.sm,
    paddingVertical: layout.spacing.md,
    height: 44,
  },

  /* Table */
  tableCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: layout.radii.md,
    ...shadow.card(),
    elevation: layout.elevation.sm,
    overflow: 'hidden',
  },
  thText: {
    color: colors.textDescDark,
  },
  tableRow: {
    flexDirection: 'column',
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.lg,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.secondaryLightBorder,
    gap: layout.spacing.md,
  },
  tableRowTablet: {
    flexDirection: 'column',
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.sm,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.secondaryLightBorder,
    gap: layout.spacing.xs,
  },
  tableRowDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.xs,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.secondaryLightBorder,
  },
  tableRowAlt: {
    backgroundColor: colors.productCardLight,
  },
  rowNum: {
    width: 24,
    color: colors.textDescDark,
    marginRight: layout.spacing.sm,
  },
  desktopTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: layout.spacing.md - 2,
    flexWrap: 'wrap',
  },
  desktopBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: layout.spacing.md - 2,
  },
  desktopStatusCell: {
    flex: 1,
    minWidth: 120,
  },
  desktopCell: {
    color: colors.textLight,
    minWidth: 80,
  },
  desktopProductCell: {
    flex: 1,
    minWidth: 120,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: layout.spacing.sm,
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
  productMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: layout.spacing.xxs,
  },
  metaLabelInline: {
    color: colors.secondaryDarkText,
  },
  cardMetaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layout.spacing.md,
    marginTop: layout.spacing.sm,
  },
  cardMetaBlock: {
    flexDirection: 'column',
    gap: layout.spacing.xxs - 2,
    minWidth: 70,
  },
  cardMetaLabel: {
    color: colors.secondaryDarkText,
  },
  cardMetaValue: {
    color: colors.textLight,
  },
  cardEditBtn: {
    marginTop: layout.spacing.md - 2,
    height: 40,
    borderRadius: layout.radii.sm,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.outlineLightBorder,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardEditBtnText: {
    color: colors.textStrongLight,
  },
  priceText: {
    color: colors.textLight,
  },
  priceEmphasis: {
    color: colors.textLight,
    minWidth: 60,
    textAlign: 'right',
  },
  metaText: {
    color: colors.slateText,
    minWidth: 80,
  },
  actionBtn: {
    minWidth: 90,
    paddingVertical: layout.spacing.md - 2,
    paddingHorizontal: layout.radii.iconBtn,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: layout.radii.sm,
    backgroundColor: colors.secondaryLightBg,
  },
  rowActions: {
    flexDirection: 'row',
    gap: layout.spacing.md - 2,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  editBtn: {
    backgroundColor: colors.surfaceLight,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.outlineLightBorder,
  },
  deleteBtn: {
    backgroundColor: colors.dangerSoftLightBg,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.dangerSoftLightBorder,
  },
  actionBtnText: {
    color: colors.textStrongLight,
  },

  /* Cell widths */
  colProduct: { flex: 1.5 },
  colCategory: { flex: 1.5 },
  colBrand: { flex: 1 },
  colPrice: { flex: 0.8 },
  colDiscount: { flex: 0.8 },
  colStock: { flex: 0.7 },
  colStatus: { flex: 0.8 },
  colNew: { flex: 0.6 },
  colActions: { flex: 0.6, flexDirection: 'row', gap: layout.spacing.sm, justifyContent: 'flex-end' },

  /* Product name & sku */
  productName: {
    color: colors.textLight,
  },
  productSku: {
    color: colors.textDescDark,
    marginTop: layout.spacing.xxs - 3,
  },
  badgeNew: {
    backgroundColor: colors.infoBgMid,
    borderRadius: layout.spacing.xxs,
    paddingHorizontal: layout.spacing.xs - 1,
    paddingVertical: layout.spacing.xxs - 3,
    marginRight: layout.spacing.xxs,
    alignSelf: 'flex-start',
  },
  badgeNewText: {
    color: colors.infoDeep,
  },
  badgesRow: {
    flexDirection: 'row',
    marginTop: layout.spacing.xxs - 1,
  },

  /* Cells */
  cellText: {
    color: colors.textLight,
  },
  discountText: {
    color: colors.accent,
  },
  discountNone: {
    color: colors.textDescDark,
  },
  statusBadge: {
    borderRadius: layout.radii.full,
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.xxs - 1,
    alignSelf: 'flex-start',
  },
  statusActive: { backgroundColor: colors.successBgAlt },
  statusInactive: { backgroundColor: colors.slateMid },
  statusText: {},
  statusActiveText: { color: colors.success },
  statusInactiveText: { color: colors.slateText },

  /* Action buttons */
  actionIcon: {},



  /* Save Button */
  saveBtn: {
    marginTop: layout.radii.lg,
    backgroundColor: colors.success,
    borderRadius: layout.radii.sm,
    paddingVertical: layout.radii.iconBtn,
    alignItems: 'center',
  },
  saveBtnText: {
    color: colors.textDark,
  },

  sortPickerNative: {
    height: buttonTokens.sizes.sm.height,
    paddingHorizontal: layout.spacing.md,
    borderRadius: layout.radii.sm,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.borderLight,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortPickerNativeText: {
    color: colors.textDescLight,
  },

  /* Added for tokenization */
  mobileInfoCol: { flex: 1 },
  mobileNameRow: { flexDirection: 'row', alignItems: 'center', gap: layout.spacing.xs, flexWrap: 'wrap' },
  mobilePriceRow: { flexDirection: 'row', alignItems: 'center', gap: layout.spacing.xxs },
  rowActionsCompact: { flexDirection: 'row', alignItems: 'center', gap: layout.spacing.xxs },
  colIndex: { width: layout.spacing.xxl },
  imageFieldsGroup: { gap: layout.spacing.sm, marginBottom: layout.spacing.md },
  deleteSection: {
    marginTop: layout.spacing.xl,
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: colors.borderLight,
    paddingTop: layout.spacing.xl,
  },
});
