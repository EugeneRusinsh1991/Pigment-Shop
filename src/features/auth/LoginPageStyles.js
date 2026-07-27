import { StyleSheet } from 'react-native';
import { colors, fonts, buttonTokens, layout } from '../../theme/tokens';
import { shadow } from '../../theme/shadows';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: layout.spacing.xl,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: layout.spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: layout.radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: layout.spacing.md,
  },
  iconContainerDark: { backgroundColor: colors.white },
  iconContainerLight: { backgroundColor: colors.dark },
  icon: {},
  iconDark: { color: colors.dark },
  iconLight: { color: colors.white },
  title: {
    marginBottom: layout.spacing.xs,
  },
  subtitle: {},
  formContainer: {
    width: '100%',
    borderRadius: layout.radii.md,
    paddingHorizontal: layout.spacing.xl,
    paddingVertical: layout.spacing.lg,
    ...shadow.panel(),
    elevation: 2,
    marginBottom: layout.spacing.lg,
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
    marginBottom: layout.spacing.lg,
  },
  googleBtnDark: { borderColor: colors.outlineDarkBorder },
  googleBtnLight: { borderColor: colors.neutralLightMid },
  googleIcon: {
    marginRight: layout.spacing.sm,
    color: colors.googleRed,
  },
  googleBtnText: {},
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerLineDark: { backgroundColor: colors.outlineDarkBorder },
  dividerLineLight: { backgroundColor: colors.neutralLightMid },
  dividerText: {
    marginHorizontal: layout.spacing.md,
  },
  inputGroup: {
    marginBottom: layout.spacing.md,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    marginBottom: layout.spacing.xxs,
  },
  forgotText: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: layout.radii.sm,
    paddingHorizontal: layout.spacing.md,
    height: 44,
  },
  inputContainerDark: { borderColor: colors.outlineDarkBorder, backgroundColor: colors.borderDarkAlt },
  inputContainerLight: { borderColor: colors.neutralLightMid, backgroundColor: colors.inputBgLight },
  inputIcon: {
    marginRight: layout.spacing.sm,
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
    marginTop: layout.spacing.sm,
  },
  loginBtnDark: { backgroundColor: colors.white },
  loginBtnLight: { backgroundColor: colors.dark },
  loginBtnText: {},
  loginBtnTextDark: { color: colors.dark },
  loginBtnTextLight: { color: colors.white },
  errorText: {
    color: colors.accent,
    marginBottom: layout.spacing.md,
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
  noPadding: {
    padding: layout.spacing.none,
  },
  contentPadding: {
    paddingBottom: layout.spacing.xxl,
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    paddingTop: layout.spacing.xl,
    paddingBottom: layout.spacing.none,
  },
  centerContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  iconMargin: {
    marginRight: layout.spacing.sm,
  },
  flex1: {
    flex: 1,
  },
  marginBottom16: {
    marginBottom: layout.spacing.lg,
  },
  marginTop8: {
    marginTop: layout.spacing.sm,
  },
});

export default styles;
