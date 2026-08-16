/**
 * ProductFormStyles.js
 *
 * Styles for the product create/edit form modal and its fields.
 */
import { StyleSheet } from 'react-native';
import { colors, layout, shadow } from '../../../theme/tokens';

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
    maxWidth: 520,
    maxHeight: '90%',
    backgroundColor: colors.surfaceLight,
    borderRadius: layout.radii.md,
    ...shadow.modal(),
    elevation: layout.elevation.xl,
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
    paddingVertical: layout.radii.lg,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: layout.spacing.md,
    paddingHorizontal: layout.spacing.xl,
    paddingBottom: layout.spacing.xl,
    paddingTop: layout.spacing.md,
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: colors.borderLight,
  },

  /* Form fields */
  fieldRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layout.spacing.lg,
    marginBottom: layout.radii.iconBtn,
  },
  fieldGroup: {
    flex: 1,
    minWidth: 140,
  },
  fieldLabel: {
    color: colors.textDescLight,
    marginBottom: layout.spacing.xs - 1,
  },
  fieldInput: {
    height: 40,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: layout.radii.sm,
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
    height: 72,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: layout.radii.sm,
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm + 2,
    color: colors.textLight,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.navItemHoverDark,
    textAlignVertical: 'top',
    outlineStyle: 'none',
  },
  fieldSelect: {
    height: 40,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: layout.radii.sm,
    paddingHorizontal: layout.spacing.md,
    color: colors.textLight,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.navItemHoverDark,
    outlineStyle: 'none',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.sm + 2,
    marginBottom: layout.radii.iconBtn,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: layout.radii.xs,
    borderWidth: layout.borderWidth.thick,
    borderColor: colors.slateStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxActive: {
    backgroundColor: colors.textLight,
    borderColor: colors.textLight,
  },
  checkMark: {
    color: colors.textDark,
  },
  checkLabel: {
    color: colors.textDescLight,
  },
  errorText: {
    color: colors.accent,
    marginTop: layout.spacing.xxs,
  },

  /* Buttons */
  cancelBtn: {
    paddingVertical: layout.spacing.sm + 2,
    paddingHorizontal: layout.radii.lg,
    borderRadius: layout.radii.sm,
    backgroundColor: colors.secondaryLightBg,
  },
  cancelBtnText: {
    color: colors.textDescLight,
  },
  saveBtn: {
    paddingVertical: layout.spacing.sm + 2,
    paddingHorizontal: layout.spacing.xl,
    borderRadius: layout.radii.sm,
    backgroundColor: colors.textLight,
  },
  saveBtnText: {
    color: colors.textDark,
  },

  /* Added for tokenization */
  imageFieldsGroup: { gap: layout.spacing.sm, marginBottom: layout.spacing.md },
  imageFieldRow: { flexDirection: 'row', alignItems: 'center', gap: layout.spacing.sm },
  uploadBtn: {
    backgroundColor: colors.slateDark,
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.md,
    borderRadius: layout.radii.sm,
  },
  uploadBtnText: {
    color: colors.white,
  },
  deleteSection: {
    marginTop: layout.spacing.xl,
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: colors.borderLight,
    paddingTop: layout.spacing.xl,
  },

  /* Product Media Picker */
  imagePickerContainer: {
    marginBottom: layout.radii.iconBtn,
  },
  imageSlotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layout.spacing.md,
  },
  imageSlotCard: {
    flex: 1,
    minWidth: 130,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: layout.radii.sm,
    padding: layout.spacing.sm,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.navItemHoverDark,
  },
  imageSlotCardError: {
    borderColor: colors.accent,
  },
  imageSlotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.xs,
  },
  imageSlotLabel: {
    color: colors.textDescLight,
    fontWeight: '500',
  },
  imageSlotPreview: {
    width: '100%',
    height: 100,
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
});
