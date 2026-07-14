/**
 * CategoryFormStyles.js
 *
 * Styles for the category create/edit form modal.
 * Shares colour tokens with ProductFormStyles.
 */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  /* Modal overlay */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: 560,
    maxHeight: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
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
    borderBottomColor: '#F1E8E4',
  },
  modalTitle: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  modalCloseBtn: {
    fontSize: 20,
    color: '#94a3b8',
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
    borderTopColor: '#F1E8E4',
  },

  /* Section heading */
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 4,
  },

  /* Form fields */
  fieldRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 14,
  },
  fieldGroup: {
    flex: 1,
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 5,
    letterSpacing: 0.3,
  },
  fieldInput: {
    height: 40,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 13,
    color: '#1C1C1C',
    borderWidth: 1,
    borderColor: '#E8EDF5',
    outlineStyle: 'none',
  },
  fieldInputError: {
    borderColor: '#E31B23',
  },
  fieldTextarea: {
    height: 60,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#1C1C1C',
    borderWidth: 1,
    borderColor: '#E8EDF5',
    textAlignVertical: 'top',
    outlineStyle: 'none',
  },
  errorText: {
    color: '#E31B23',
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
    height: 40,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 13,
    color: '#1C1C1C',
    borderWidth: 1,
    borderColor: '#E8EDF5',
    outlineStyle: 'none',
  },
  uploadBtn: {
    height: 40,
    paddingHorizontal: 14,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8EDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBtnText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },

  /* Buttons */
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#F5F7FA',
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  saveBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#1C1C1C',
  },
  saveBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
