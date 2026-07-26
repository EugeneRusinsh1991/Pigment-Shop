/**
 * ProductsStyles.js
 */
import { StyleSheet } from 'react-native';
import { colors, layout, buttonTokens } from '../../../theme/tokens';
import { shadow } from '../../../theme/shadows';

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
    paddingHorizontal: 14,
    borderRadius: layout.radii.lg,
    borderWidth: 1.5,
    borderColor: colors.secondaryLightBorder,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtnActive: {
    backgroundColor: colors.textLight,
    borderColor: colors.textLight,
  },
  controlBtnAction: {
    backgroundColor: colors.textLight,
    borderColor: colors.textLight,
  },
  controlBtnText: {
    color: colors.textDescLight,
  },
  controlBtnTextActive: {
    color: colors.textDark,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xs,
    backgroundColor: colors.textLight,
    borderRadius: layout.radii.sm,
    paddingVertical: 11,
    paddingHorizontal: layout.spacing.lg,
    height: 44,
  },
  addBtnText: {
    color: colors.textDark,
  },
  /* Mobile toolbar (stacked) */
  mobileToolbar: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: layout.spacing.lg,
  },
  mobileAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: layout.spacing.xs,
    backgroundColor: colors.textLight,
    borderRadius: layout.radii.sm,
    paddingVertical: layout.spacing.md,
    height: 44,
  },

  /* Table */
  tableCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: layout.radii.iconBtn,
    ...shadow.card(),
    elevation: layout.elevation.sm,
    overflow: 'hidden',
  },
  thText: {
    color: colors.textDescDark,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'column',
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryLightBorder,
    gap: layout.spacing.md,
  },
  tableRowDesktop: {
    flexDirection: 'column',
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryLightBorder,
    gap: layout.spacing.xxs,
  },
  tableRowAlt: {
    backgroundColor: colors.surfaceElevatedLight,
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
  cardMetaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layout.spacing.md,
    marginTop: layout.spacing.sm,
  },
  cardMetaBlock: {
    flexDirection: 'column',
    gap: 2,
    minWidth: 70,
  },
  cardMetaLabel: {
    color: colors.secondaryDarkText,
    textTransform: 'uppercase',
  },
  cardMetaValue: {
    color: colors.textLight,
  },
  cardEditBtn: {
    marginTop: 10,
    height: 40,
    borderRadius: layout.radii.sm,
    borderWidth: 1,
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
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: layout.radii.sm,
    backgroundColor: colors.secondaryLightBg,
  },
  rowActions: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  editBtn: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.outlineLightBorder,
  },
  deleteBtn: {
    backgroundColor: colors.dangerSoftLightBg,
    borderWidth: 1,
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
    marginTop: 1,
  },
  badgeNew: {
    backgroundColor: colors.infoBgMid,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginRight: layout.spacing.xxs,
    alignSelf: 'flex-start',
  },
  badgeNewText: {
    color: colors.infoDeep,
  },
  badgesRow: {
    flexDirection: 'row',
    marginTop: 3,
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
    borderRadius: layout.radii.xs,
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: 3,
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
    marginTop: 20,
    backgroundColor: colors.success,
    borderRadius: layout.radii.sm,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveBtnText: {
    color: colors.textDark,
  },

  sortPickerNative: {
    height: buttonTokens.sizes.sm.height,
    paddingHorizontal: layout.spacing.md,
    borderRadius: layout.radii.sm,
    borderWidth: 1,
    borderColor: colors.borderLightAlt,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortPickerNativeText: {
    color: colors.textDescLight,
  },

});
