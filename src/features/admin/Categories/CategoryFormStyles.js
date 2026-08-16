/**
 * CategoryFormStyles.js
 *
 * Styles for the category create/edit form modal.
 * Shares colour tokens with ProductFormStyles.
 */
import { StyleSheet } from 'react-native';
import { buttonTokens, colors, layout, shadow } from '../../../theme/tokens';

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
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.borderLight,
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
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: colors.borderLight,
  },
  modalFooterRight: {
    flexDirection: 'row',
    gap: layout.spacing.md,
  },

  /* Subsection divider */
  subSectionDivider: {
    marginTop: layout.spacing.lg,
    marginBottom: layout.spacing.lg,
    borderTopWidth: layout.borderWidth.thin,
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
    borderWidth: layout.borderWidth.thin,
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
    borderWidth: layout.borderWidth.thin,
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
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.navItemHoverDark,
    textAlignVertical: 'top',
    outlineStyle: 'none',
  },
  errorText: {
    color: colors.accent,
    marginTop: layout.spacing.xxs,
  },

  /* Image picker */
  imageSlotContainer: {
    marginBottom: layout.spacing.lg,
  },
  imagePickerRow: {
    flexDirection: 'row',
    gap: layout.spacing.sm,
    alignItems: 'center',
  },
  imageSlotCard: {
    width: '100%',
    maxWidth: 240,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: layout.radii.sm,
    padding: layout.spacing.sm,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.navItemHoverDark,
  },
  imageSlotPreview: {
    width: '100%',
    height: 120,
    borderRadius: layout.radii.xs,
    overflow: 'hidden',
    backgroundColor: colors.surfaceSubtleLight,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.inputBorderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSlotPreviewImg: {
    width: '100%',
    height: '100%',
  },
  imageSlotPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: layout.spacing.xs,
  },
  imageSlotPlaceholderText: {
    color: colors.textSubtleLight,
    textAlign: 'center',
  },
  imageSlotActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xs,
    marginTop: layout.spacing.xs,
  },
  imageSlotUploadBtn: {
    flex: 1,
    height: 32,
    backgroundColor: colors.slateDark,
    borderRadius: layout.radii.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: layout.spacing.xxs,
  },
  imageSlotUploadText: {
    color: colors.white,
  },
  imageSlotDeleteBtn: {
    height: 32,
    paddingHorizontal: layout.spacing.sm,
    backgroundColor: colors.danger,
    borderRadius: layout.radii.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: layout.spacing.xxs,
  },
  imageSlotDeleteText: {
    color: colors.white,
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
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.secondaryLightBorder,
  },
  categoryTypeLabel: {
    color: colors.textDescLight,
  },
  categoryTypeBadge: {
    paddingVertical: layout.spacing.xxs,
    paddingHorizontal: layout.spacing.sm,
    borderRadius: layout.radii.xs,
    borderWidth: layout.borderWidth.thin,
  },
  categoryTypeBadgeText: {},

  /* Buttons & Footer Grid */
  modalFooterGrid: {
    paddingHorizontal: layout.spacing.xl,
    paddingBottom: layout.spacing.xl,
    paddingTop: layout.spacing.lg,
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: colors.borderLight,
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
    borderWidth: layout.borderWidth.thin,
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
