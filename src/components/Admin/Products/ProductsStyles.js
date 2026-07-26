/**
 * ProductsStyles.js
 */
import { StyleSheet } from 'react-native';
import { colors, layout, buttonTokens } from '../../../theme/tokens';
import { shadow } from '../../../theme/shadows';

export default StyleSheet.create({
  container: {
    padding: 24,
  },

  /* Toolbar */
  toolbar: {
    marginBottom: 12,
  },

  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  controlBtn: {
    height: buttonTokens.sizes.sm.height,
    paddingHorizontal: 14,
    borderRadius: 20,
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
    gap: 6,
    backgroundColor: colors.textLight,
    borderRadius: layout.radii.sm,
    paddingVertical: 11,
    paddingHorizontal: 18,
    height: 44,
  },
  addBtnText: {
    color: colors.textDark,
  },
  /* Mobile toolbar (stacked) */
  mobileToolbar: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 16,
  },
  mobileAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.textLight,
    borderRadius: layout.radii.sm,
    paddingVertical: 12,
    height: 44,
  },

  /* Table */
  tableCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 14,
    ...shadow.card(),
    elevation: 2,
    overflow: 'hidden',
  },
  thText: {
    color: colors.textDescDark,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryLightBorder,
    gap: 12,
  },
  tableRowDesktop: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryLightBorder,
    gap: 4,
  },
  tableRowAlt: {
    backgroundColor: colors.surfaceElevatedLight,
  },
  rowNum: {
    width: 24,
    color: colors.textDescDark,
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
    gap: 8,
  },
  cardMetaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  cardMetaBlock: {
    flexDirection: 'column',
    gap: 2,
    minWidth: 70,
  },
  cardMetaLabel: {
    color: colors.secondaryDarkText,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
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
  colActions: { flex: 0.6, flexDirection: 'row', gap: 8, justifyContent: 'flex-end' },

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
    marginRight: 4,
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
    paddingHorizontal: 8,
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
    paddingHorizontal: 12,
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
