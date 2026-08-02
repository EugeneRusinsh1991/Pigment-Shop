/**
 * CategoriesStyles.js
 *
 * Styles for the categories manager container and tree table.
 */
import { StyleSheet } from 'react-native';
import { buttonTokens, colors, layout, shadow } from '../../../theme/tokens';

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
    borderRadius: layout.radii.sm,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.accent,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: colors.white,
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
    borderWidth: layout.borderWidth.focus,
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
    borderRadius: layout.radii.md,
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
    paddingVertical: layout.spacing.md,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.secondaryLightBorder,
    borderLeftWidth: layout.borderWidth.medium,
    borderLeftColor: colors.transparent,
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
    backgroundColor: colors.surfaceSubtleLight,
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
    width: 32,
    height: 32,
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
    borderWidth: layout.borderWidth.thin,
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
    borderWidth: layout.borderWidth.thin,
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
    flexDirection: 'row',
    alignItems: 'stretch',
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.secondaryLightBorder,
    borderLeftWidth: layout.borderWidth.heavy,
    borderLeftColor: colors.transparent,
    overflow: 'hidden',
  },
  /* Mobile tap-zone isolation */
  mobileToggleZone: {
    minWidth: 44,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileContentZone: {
    flex: 1,
    paddingRight: layout.spacing.lg,
    paddingVertical: layout.spacing.xs + 2,
  },
  mobileTreeCardCategoryHolder: {
    backgroundColor: colors.purpleBgAlt,
    borderLeftColor: colors.purpleLight,
  },
  mobileTreeCardProductHolder: {
    backgroundColor: colors.successBgGreen,
    borderLeftColor: colors.successMid,
  },
  mobileCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xs,
  },
  mobileContentCol: {
    flex: 1,
    gap: layout.spacing.xxxs,
  },
  mobileRowMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: layout.spacing.xs,
  },
  mobileRowSub: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xs,
    marginTop: layout.borderWidth.thin,
  },
  categorySingleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: layout.spacing.sm,
    flex: 1,
  },
  badgeGroupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xs,
    flexShrink: 0,
  },
});
