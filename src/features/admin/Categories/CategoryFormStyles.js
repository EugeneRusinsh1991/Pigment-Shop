/**
 * CategoryFormStyles.js
 *
 * Styles for the category create/edit form modal.
 * Shares colour tokens with ProductFormStyles.
 */
import { StyleSheet } from 'react-native';
import { colors, fonts, layout, buttonTokens } from '../../../theme/tokens';
import { shadow } from '../../../theme/shadows';

export default StyleSheet.create({
  /* Modal overlay */
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlayScrim,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: layout.zIndices.modal,
  },
  modalCard: {
    width: '95%',
    maxWidth: 560,
    maxHeight: '90%',
    backgroundColor: colors.surfaceLight,
    borderRadius: layout.radii.md,
    ...shadow.modal(),
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.xl,
    paddingTop: layout.spacing.xl,
    paddingBottom: layout.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLightAlt,
  },
  modalTitle: {
    color: colors.textLight,
  },
  modalCloseBtn: {
    color: colors.textDescDark,
    padding: layout.spacing.xxs,
  },
  modalBody: {
    paddingHorizontal: layout.spacing.xl,
    paddingVertical: layout.spacing.lg,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: layout.spacing.md,
    paddingHorizontal: layout.spacing.xl,
    paddingBottom: layout.spacing.xl,
    paddingTop: layout.spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLightAlt,
  },
  modalFooterRight: {
    flexDirection: 'row',
    gap: layout.spacing.md,
  },

  /* Subsection divider */
  subSectionDivider: {
    marginTop: layout.spacing.lg,
    marginBottom: layout.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.secondaryLightBorder,
    paddingTop: layout.spacing.lg,
  },
  subSectionTitle: {
    color: colors.textLight,
    marginBottom: layout.spacing.md,
  },

  /* Delete confirmation */
  deleteConfirmBox: {
    backgroundColor: colors.dangerBgAlt,
    borderRadius: layout.radii.sm,
    borderWidth: 1,
    borderColor: colors.dangerLight,
    padding: layout.spacing.md,
    marginTop: layout.spacing.sm,
  },
  deleteConfirmText: {
    color: colors.dangerDeep,
  },

  /* Section heading */
  sectionLabel: {
    color: colors.textDescDark,
    textTransform: 'uppercase',
    marginBottom: layout.spacing.sm,
    marginTop: layout.spacing.xxs,
  },

  /* Form fields */
  fieldRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layout.spacing.lg,
    marginBottom: layout.spacing.md,
  },
  fieldGroup: {
    flex: 1,
    minWidth: 140,
    marginBottom: layout.spacing.md,
  },
  fieldLabel: {
    color: colors.textDescLight,
    marginBottom: layout.spacing.xs,
  },
  fieldInput: {
    height: buttonTokens.sizes.md.height,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: buttonTokens.sizes.md.borderRadius,
    paddingHorizontal: layout.spacing.md,
    color: colors.textLight,
    borderWidth: 1,
    borderColor: colors.navItemHoverDark,
    outlineStyle: 'none',
  },
  fieldInputError: {
    borderColor: colors.accent,
  },
  fieldTextarea: {
    height: 60,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: buttonTokens.sizes.md.borderRadius,
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
    color: colors.textLight,
    borderWidth: 1,
    borderColor: colors.navItemHoverDark,
    textAlignVertical: 'top',
    outlineStyle: 'none',
  },
  errorText: {
    color: colors.accent,
    marginTop: layout.spacing.xxs,
  },

  /* Image picker */
  imagePickerRow: {
    flexDirection: 'row',
    gap: layout.spacing.sm,
    alignItems: 'center',
  },
  imagePickerInput: {
    flex: 1,
    height: buttonTokens.sizes.md.height,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: buttonTokens.sizes.md.borderRadius,
    paddingHorizontal: layout.spacing.md,
    color: colors.textLight,
    borderWidth: 1,
    borderColor: colors.navItemHoverDark,
    outlineStyle: 'none',
  },
  uploadBtn: {
    height: buttonTokens.sizes.md.height,
    paddingHorizontal: layout.spacing.md,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: buttonTokens.sizes.md.borderRadius,
    borderWidth: 1,
    borderColor: colors.navItemHoverDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBtnText: {
    color: colors.textDescLight,
  },

  /* Category Type non-editable row */
  categoryTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.slateLight,
    borderRadius: layout.radii.sm,
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm,
    marginBottom: layout.spacing.lg,
    borderWidth: 1,
    borderColor: colors.secondaryLightBorder,
  },
  categoryTypeLabel: {
    color: colors.textDescLight,
  },
  categoryTypeBadge: {
    paddingVertical: layout.spacing.xxs,
    paddingHorizontal: layout.spacing.sm,
    borderRadius: layout.radii.xs,
    borderWidth: 1,
  },
  categoryTypeBadgeText: {},

  /* Buttons & Footer Grid */
  modalFooterGrid: {
    paddingHorizontal: layout.spacing.xl,
    paddingBottom: layout.spacing.xl,
    paddingTop: layout.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.borderLightAlt,
    gap: layout.spacing.md,
  },
  modalFooterRow: {
    flexDirection: 'row',
    gap: layout.spacing.md,
  },
  addSubcategoryBtn: {
    flex: 1,
    height: buttonTokens.sizes.md.height,
    borderRadius: buttonTokens.sizes.md.borderRadius,
    backgroundColor: colors.infoStrong,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: buttonTokens.sizes.md.paddingHorizontal,
  },
  addSubcategoryBtnText: {
    color: colors.textDark,
  },
  cancelBtn: {
    flex: 1,
    height: buttonTokens.sizes.md.height,
    paddingHorizontal: buttonTokens.sizes.md.paddingHorizontal,
    borderRadius: buttonTokens.sizes.md.borderRadius,
    backgroundColor: colors.secondaryLightBg,
    borderWidth: 1,
    borderColor: colors.secondaryLightBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    color: colors.textDescLight,
  },
  saveBtn: {
    flex: 1,
    height: buttonTokens.sizes.md.height,
    paddingHorizontal: buttonTokens.sizes.md.paddingHorizontal,
    borderRadius: buttonTokens.sizes.md.borderRadius,
    backgroundColor: colors.textLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    color: colors.textDark,
  },
  deleteBtn: {
    flex: 1,
    height: buttonTokens.sizes.md.height,
    paddingHorizontal: buttonTokens.sizes.md.paddingHorizontal,
    borderRadius: buttonTokens.sizes.md.borderRadius,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnActive: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
  },
  deleteBtnText: {
    color: colors.textDark,
  },
  deleteBtnTextActive: {
    color: colors.textDark,
  },
  flex1: {
    flex: 1,
  },
});
