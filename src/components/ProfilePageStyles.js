import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardSpecific: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    justifyContent: 'center',
  },
  inputContainerDark: {
    borderColor: '#333',
    backgroundColor: '#1E1E1E',
  },
  inputContainerLight: {
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  inputDisabled: {
    opacity: 0.7,
  },
  input: {
    fontSize: 16,
    height: '100%',
  },
  saveBtn: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnDark: {
    backgroundColor: '#FFFFFF',
  },
  saveBtnLight: {
    backgroundColor: '#111827',
  },
  saveBtnDisabled: {
    opacity: 0.5,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveBtnTextDark: {
    color: '#000000',
  },
  saveBtnTextLight: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    marginBottom: 16,
  },
  promoSuccess: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  promoSuccessDark: { backgroundColor: 'rgba(52, 211, 153, 0.1)' },
  promoSuccessLight: { backgroundColor: '#F0FDF4' },
  promoText: { fontSize: 14, fontWeight: '500' },
  promoTextDark: { color: '#34D399' },
  promoTextLight: { color: '#15803D' },
  promoRemove: { fontSize: 12, fontWeight: '500' },
  requiredNote: {
    fontSize: 12,
    marginTop: 12,
    textAlign: 'left',
  },
  saveMessage: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  saveMessageDark: {
    backgroundColor: 'rgba(52, 211, 153, 0.16)',
  },
  saveMessageLight: {
    backgroundColor: '#F0FDF4',
  },
  saveMessageText: {
    fontSize: 14,
    fontWeight: '500',
  },
  saveMessageTextDark: {
    color: '#34D399',
  },
  saveMessageTextLight: {
    color: '#15803D',
  },
});

export default styles;
