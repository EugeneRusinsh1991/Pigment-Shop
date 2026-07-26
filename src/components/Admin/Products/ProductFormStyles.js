/**
 * ProductFormStyles.js
 *
 * Styles for the product create/edit form modal and its fields.
 */
import { StyleSheet } from 'react-native';
import { colors, fonts, layout } from '../../../theme/tokens';
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
    maxWidth: 520,
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
    color: colors.textLight,
  },
  modalCloseBtn: {
    color: colors.textDescDark,
    padding: 4,
  },
  modalBody: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLightAlt,
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
  },
  fieldLabel: {
    color: colors.textDescLight,
    marginBottom: 5,
  },
  fieldInput: {
    height: 40,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: layout.radii.sm,
    paddingHorizontal: 12,
    color: colors.textLight,
    borderWidth: 1,
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
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.textLight,
    borderWidth: 1,
    borderColor: colors.navItemHoverDark,
    textAlignVertical: 'top',
    outlineStyle: 'none',
  },
  fieldSelect: {
    height: 40,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: layout.radii.sm,
    paddingHorizontal: 12,
    color: colors.textLight,
    borderWidth: 1,
    borderColor: colors.navItemHoverDark,
    outlineStyle: 'none',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
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
    marginTop: 2,
  },

  /* Buttons */
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: layout.radii.sm,
    backgroundColor: colors.secondaryLightBg,
  },
  cancelBtnText: {
    color: colors.textDescLight,
  },
  saveBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: layout.radii.sm,
    backgroundColor: colors.textLight,
  },
  saveBtnText: {
    color: colors.textDark,
  },
});
