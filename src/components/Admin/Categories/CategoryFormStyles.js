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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLightAlt,
  },
  modalTitle: {
    fontFamily: fonts.serif,
    fontSize: 20,
    fontWeight: '600',
    color: colors.textLight,
  },
  modalCloseBtn: {
    fontSize: 20,
    color: colors.textDescDark,
    padding: 4,
  },
  modalBody: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLightAlt,
  },
  modalFooterRight: {
    flexDirection: 'row',
    gap: 12,
  },

  /* Subsection divider */
  subSectionDivider: {
    marginTop: 20,
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: colors.secondaryLightBorder,
    paddingTop: 16,
  },
  subSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textLight,
    marginBottom: 12,
  },

  /* Delete confirmation */
  deleteConfirmBox: {
    backgroundColor: colors.dangerBgAlt,
    borderRadius: layout.radii.sm,
    borderWidth: 1,
    borderColor: colors.dangerLight,
    padding: 12,
    marginTop: 8,
  },
  deleteConfirmText: {
    fontSize: 13,
    color: colors.dangerDeep,
    lineHeight: 20,
  },

  /* Section heading */
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textDescDark,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 4,
  },

  /* Form fields */
  fieldRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 14,
  },
  fieldGroup: {
    flex: 1,
    minWidth: 140,
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textDescLight,
    marginBottom: 5,
    letterSpacing: 0.3,
  },
  fieldInput: {
    height: buttonTokens.sizes.md.height,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: buttonTokens.sizes.md.borderRadius,
    paddingHorizontal: 12,
    fontSize: 13,
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
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: colors.textLight,
    borderWidth: 1,
    borderColor: colors.navItemHoverDark,
    textAlignVertical: 'top',
    outlineStyle: 'none',
  },
  errorText: {
    color: colors.accent,
    fontSize: 11,
    marginTop: 2,
  },

  /* Image picker */
  imagePickerRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  imagePickerInput: {
    flex: 1,
    height: buttonTokens.sizes.md.height,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: buttonTokens.sizes.md.borderRadius,
    paddingHorizontal: 12,
    fontSize: 13,
    color: colors.textLight,
    borderWidth: 1,
    borderColor: colors.navItemHoverDark,
    outlineStyle: 'none',
  },
  uploadBtn: {
    height: buttonTokens.sizes.md.height,
    paddingHorizontal: 14,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: buttonTokens.sizes.md.borderRadius,
    borderWidth: 1,
    borderColor: colors.navItemHoverDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBtnText: {
    fontSize: 13,
    color: colors.textDescLight,
    fontWeight: '600',
  },

  /* Category Type non-editable row */
  categoryTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.slateLight,
    borderRadius: layout.radii.sm,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.secondaryLightBorder,
  },
  categoryTypeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textDescLight,
  },
  categoryTypeBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: layout.radii.xs,
    borderWidth: 1,
  },
  categoryTypeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },

  /* Buttons & Footer Grid */
  modalFooterGrid: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderLightAlt,
    gap: 12,
  },
  modalFooterRow: {
    flexDirection: 'row',
    gap: 12,
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
    fontSize: 13,
    fontWeight: '600',
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
    fontSize: 13,
    fontWeight: '600',
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
    fontSize: 13,
    fontWeight: '700',
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
    fontSize: 13,
    fontWeight: '600',
    color: colors.textDark,
  },
  deleteBtnTextActive: {
    color: colors.textDark,
  },
});
