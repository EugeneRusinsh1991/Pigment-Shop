/**
 * CategoriesStyles.js
 *
 * Styles for the categories manager container and tree table.
 */
import { StyleSheet } from 'react-native';
import { colors, layout } from '../../../theme/tokens';
import { shadow } from '../../../theme/shadows';

export const CATEGORY_TYPE_COLORS = {
  category_holder: {
    label: 'Category Holder',
    accent: colors.purpleLight,
    softBg: colors.purpleBgLight,
    text: colors.purpleDeep,
  },
  product_holder: {
    label: 'Product Holder',
    accent: colors.successMid,
    softBg: colors.successBgSoft,
    text: colors.successStrong,
  },
};

export default StyleSheet.create({
  container: {
    padding: 24,
  },

  /* Toolbar */
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  addBtn: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.textLight,
    backgroundColor: colors.textLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: colors.textDark,
    fontSize: 13,
    fontWeight: '600',
  },

  /* Expand/collapse all controls */
  treeControls: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  treeControlBtn: {
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.secondaryLightBorder,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  treeControlBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textDescLight,
  },

  /* Table card */
  tableCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 14,
    ...shadow.card(),
    elevation: 2,
    overflow: 'hidden',
  },


  /* Tree row */
  treeRow: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryLightBorder,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
    overflow: 'hidden',
  },
  treeRowAlt: {
    backgroundColor: colors.surfaceElevatedLight,
  },
  treeRowCategoryHolder: {
    backgroundColor: colors.purpleBgAlt,
    borderLeftColor: colors.purpleLight,
  },
  treeRowProductHolder: {
    backgroundColor: colors.successBgGreen,
    borderLeftColor: colors.successMid,
  },
  treeRowDepth1: {
    backgroundColor: colors.infoBgAlt,
  },
  treeRowDepth2: {
    backgroundColor: colors.neutralLightMax,
  },

  /* Cell widths */
  colName: { flex: 2 },
  colImage: { flex: 0.8 },
  colActions: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingLeft: 8 },

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
    color: colors.textDescDark,
    fontWeight: '700',
  },
  togglePlaceholder: {
    width: 20,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textLight,
  },
  categoryId: {
    fontSize: 11,
    color: colors.textDescDark,
    marginTop: 1,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    marginTop: 3,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: layout.radii.full,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },

  cellText: {
    fontSize: 13,
    color: colors.textDescLight,
  },

  imageBadge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  imageBadgeSet: { backgroundColor: colors.successBgAlt },
  imageBadgeNone: { backgroundColor: colors.slateMid },
  imageBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  imageBadgeSetText: { color: colors.success },
  imageBadgeNoneText: { color: colors.slateText },

  /* Action buttons */
  actionBtn: {
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: layout.radii.sm,
    borderWidth: 1,
    borderColor: colors.slateText,
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 12,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.slateText,
  },
  addChildBtn: {
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: layout.radii.sm,
    borderWidth: 1,
    borderColor: colors.infoStrong,
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 12,
  },
  addChildBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.infoStrong,
  },

  actionIcon: {
    fontSize: 13,
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



  /* Mobile card layout */
  mobileTreeCard: {
    position: 'relative',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryLightBorder,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
    overflow: 'hidden',
  },
  mobileTreeCardCategoryHolder: {
    backgroundColor: colors.purpleBgAlt,
    borderLeftColor: colors.purpleLight,
  },
  mobileTreeCardProductHolder: {
    backgroundColor: colors.successBgGreen,
    borderLeftColor: colors.successMid,
  },
});
