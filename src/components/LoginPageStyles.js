import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconContainerDark: { backgroundColor: '#FFFFFF' },
  iconContainerLight: { backgroundColor: '#1C1C1C' },
  icon: { fontSize: 20, fontWeight: 'bold' },
  iconDark: { color: '#1C1C1C' },
  iconLight: { color: '#FFFFFF' },
  title: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
  },
  formContainer: {
    width: '100%',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 24,
  },
  formContainerDark: { backgroundColor: '#1C1C1C', borderWidth: 1, borderColor: '#2A2A2A' },
  formContainerLight: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F0F0F0' },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 24,
  },
  googleBtnDark: { borderColor: '#333' },
  googleBtnLight: { borderColor: '#E5E5E5' },
  googleIcon: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DB4437',
  },
  googleBtnText: {
    fontSize: 14,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerLineDark: { backgroundColor: '#333' },
  dividerLineLight: { backgroundColor: '#E5E5E5' },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  forgotText: {
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  inputContainerDark: { borderColor: '#333', backgroundColor: '#242424' },
  inputContainerLight: { borderColor: '#E5E5E5', backgroundColor: '#F9FAFB' },
  inputIcon: {
    marginRight: 8,
    fontSize: 16,
    color: '#888',
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: '100%',
    outlineStyle: 'none',
  },
  loginBtn: {
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginBtnDark: { backgroundColor: '#FFFFFF' },
  loginBtnLight: { backgroundColor: '#1C1C1C' },
  loginBtnText: {
    fontSize: 15,
    fontWeight: '600',
  },
  loginBtnTextDark: { color: '#1C1C1C' },
  loginBtnTextLight: { color: '#FFFFFF' },
  errorText: {
    color: '#E31B23',
    fontSize: 13,
    marginBottom: 16,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
  },
  footerLink: {
    fontWeight: '600',
  },
  textDark: { color: '#FFFFFF' },
  textLight: { color: '#1C1C1C' },
  subtextDark: { color: '#A0A0A0' },
  subtextLight: { color: '#6B7280' },
});

export default styles;
