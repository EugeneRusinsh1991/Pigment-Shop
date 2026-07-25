/**
 * ProductsStyles.js
 */
import { StyleSheet } from 'react-native';
import { colors, layout } from '../../../theme/tokens';
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
    height: 36,
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
    fontSize: 13,
    fontWeight: '500',
    color: colors.textDescLight,
  },
  controlBtnTextActive: {
    color: colors.textDark,
    fontWeight: '600',
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
    fontSize: 13,
    fontWeight: '700',
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
    fontSize: 11,
    fontWeight: '700',
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
    fontSize: 12,
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
    fontSize: 13,
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
    fontSize: 10,
    color: colors.secondaryDarkText,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  cardMetaValue: {
    fontSize: 13,
    color: colors.textLight,
    fontWeight: '500',
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
    fontSize: 13,
    fontWeight: '600',
    color: colors.textStrongLight,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textLight,
  },
  priceEmphasis: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textLight,
    minWidth: 60,
    textAlign: 'right',
  },
  metaText: {
    fontSize: 13,
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
    fontSize: 13,
    fontWeight: '600',
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
    fontSize: 14,
    fontWeight: '700',
    color: colors.textLight,
  },
  productSku: {
    fontSize: 11,
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
    fontSize: 9,
    color: colors.infoDeep,
    fontWeight: '700',
  },
  badgesRow: {
    flexDirection: 'row',
    marginTop: 3,
  },

  /* Cells */
  cellText: {
    fontSize: 13,
    color: colors.textLight,
  },
  discountText: {
    fontSize: 13,
    color: colors.accent,
    fontWeight: '600',
  },
  discountNone: {
    fontSize: 13,
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
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusActiveText: { color: colors.success },
  statusInactiveText: { color: colors.slateText },

  /* Action buttons */
  actionIcon: {
    fontSize: 14,
  },



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
    fontSize: 14,
    fontWeight: '700',
  },

  sortPickerNative: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: layout.radii.sm,
    borderWidth: 1,
    borderColor: colors.borderLightAlt,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortPickerNativeText: {
    fontSize: 13,
    color: colors.textDescLight,
  },

});
