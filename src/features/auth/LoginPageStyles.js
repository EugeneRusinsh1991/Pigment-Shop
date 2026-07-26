import { StyleSheet } from 'react-native';
import { colors, fonts, buttonTokens } from '../../theme/tokens';
import { shadow } from '../../theme/shadows';

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
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconContainerDark: { backgroundColor: colors.white },
  iconContainerLight: { backgroundColor: colors.dark },
  icon: {},
  iconDark: { color: colors.dark },
  iconLight: { color: colors.white },
  title: {
    marginBottom: 6,
  },
  subtitle: {},
  formContainer: {
    width: '100%',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    ...shadow.panel(),
    elevation: 2,
    marginBottom: 16,
  },
  formContainerDark: { backgroundColor: colors.dark, borderWidth: 1, borderColor: colors.borderDark },
  formContainerLight: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.borderLight },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: buttonTokens.sizes.lg.height,
    paddingHorizontal: buttonTokens.sizes.lg.paddingHorizontal,
    borderRadius: buttonTokens.sizes.lg.borderRadius,
    borderWidth: 1,
    marginBottom: 16,
  },
  googleBtnDark: { borderColor: colors.outlineDarkBorder },
  googleBtnLight: { borderColor: colors.neutralLightMid },
  googleIcon: {
    marginRight: 8,
    color: colors.googleRed,
  },
  googleBtnText: {},
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerLineDark: { backgroundColor: colors.outlineDarkBorder },
  dividerLineLight: { backgroundColor: colors.neutralLightMid },
  dividerText: {
    marginHorizontal: 12,
  },
  inputGroup: {
    marginBottom: 12,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    marginBottom: 4,
  },
  forgotText: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  inputContainerDark: { borderColor: colors.outlineDarkBorder, backgroundColor: colors.borderDarkAlt },
  inputContainerLight: { borderColor: colors.neutralLightMid, backgroundColor: colors.inputBgLight },
  inputIcon: {
    marginRight: 8,
    color: colors.textSubtleLight,
  },
  input: {
    flex: 1,
    height: '100%',
    outlineStyle: 'none',
  },
  loginBtn: {
    height: buttonTokens.sizes.lg.height,
    borderRadius: buttonTokens.sizes.lg.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginBtnDark: { backgroundColor: colors.white },
  loginBtnLight: { backgroundColor: colors.dark },
  loginBtnText: {},
  loginBtnTextDark: { color: colors.dark },
  loginBtnTextLight: { color: colors.white },
  errorText: {
    color: colors.accent,
    marginBottom: 12,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {},
  footerLink: {},
  textDark: { color: colors.white },
  textLight: { color: colors.dark },
  subtextDark: { color: colors.textMutedDark },
  subtextLight: { color: colors.textMutedLight },
});

export default styles;
