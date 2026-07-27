/**
 * CategoriesStyles.js
 *
 * Styles for the categories manager container and tree table.
 */
import { StyleSheet } from 'react-native';
import { colors, layout, shadow, buttonTokens } from '../../../theme/tokens';

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
    padding: layout.spacing.xl,
  },

  /* Toolbar */
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: layout.spacing.sm,
    marginBottom: layout.spacing.lg,
  },
  addBtn: {
    height: buttonTokens.sizes.sm.height,
    paddingHorizontal: layout.spacing.md,
    borderRadius: layout.radii.lg,
    borderWidth: 1.5,
    borderColor: colors.textLight,
    backgroundColor: colors.textLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: colors.textDark,
  },

  /* Expand/collapse all controls */
  treeControls: {
    flexDirection: 'row',
    gap: layout.spacing.sm,
    marginBottom: layout.spacing.sm,
    alignSelf: 'flex-start',
  },
  treeControlBtn: {
    height: buttonTokens.sizes.sm.height,
    paddingHorizontal: layout.spacing.md,
    borderRadius: layout.radii.lg,
    borderWidth: 1.5,
    borderColor: colors.secondaryLightBorder,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  treeControlBtnText: {
    color: colors.textDescLight,
  },

  /* Table card */
  tableCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: layout.radii.iconBtn,
    ...shadow.card(),
    elevation: 2,
    overflow: 'hidden',
  },


  /* Tree row */
  treeRow: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.sm,
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
  colActions: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingLeft: layout.spacing.sm },

  /* Name cell */
  nameCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xs,
  },
  toggleBtn: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleIcon: {
    color: colors.textDescDark,
  },
  togglePlaceholder: {
    width: 20,
  },
  categoryName: {
    color: colors.textLight,
  },
  categoryId: {
    color: colors.textDescDark,
    marginTop: layout.spacing.xxs,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    marginTop: layout.spacing.xxs,
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.xxs,
    borderRadius: layout.radii.full,
  },
  typeBadgeText: {
    textTransform: 'uppercase',
  },

  cellText: {
    color: colors.textDescLight,
  },

  imageBadge: {
    borderRadius: layout.radii.xs,
    paddingHorizontal: layout.spacing.xs,
    paddingVertical: layout.spacing.xxs,
    alignSelf: 'flex-start',
  },
  imageBadgeSet: { backgroundColor: colors.successBgAlt },
  imageBadgeNone: { backgroundColor: colors.slateMid },
  imageBadgeText: {
  },
  imageBadgeSetText: { color: colors.success },
  imageBadgeNoneText: { color: colors.slateText },

  /* Action buttons */
  actionBtn: {
    height: buttonTokens.sizes.sm.height,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: layout.radii.sm,
    borderWidth: 1,
    borderColor: colors.slateText,
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: layout.spacing.md,
  },
  actionBtnText: {
    color: colors.slateText,
  },
  addChildBtn: {
    height: buttonTokens.sizes.sm.height,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: layout.radii.sm,
    borderWidth: 1,
    borderColor: colors.infoStrong,
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: layout.spacing.md,
  },
  addChildBtnText: {
    color: colors.infoStrong,
  },

  actionIcon: {
  },

  /* Save Button */
  saveBtn: {
    marginTop: layout.spacing.lg,
    backgroundColor: colors.success,
    borderRadius: layout.radii.sm,
    paddingVertical: layout.spacing.md,
    alignItems: 'center',
  },
  saveBtnText: {
    color: colors.textDark,
  },



  /* Mobile card layout */
  mobileTreeCard: {
    position: 'relative',
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.md,
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
