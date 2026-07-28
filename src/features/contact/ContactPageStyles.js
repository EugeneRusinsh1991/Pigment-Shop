import { StyleSheet } from 'react-native';
import { buttonTokens, colors, layout } from '../../theme/tokens';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: layout.spacing.xl,
  },
  containerDark: { backgroundColor: colors.backgroundDark },
  containerLight: { backgroundColor: colors.backgroundLight },
  content: {
    flex: 1,
    paddingTop: layout.spacing.lg,
    paddingHorizontal: layout.spacing.none,
    paddingBottom: layout.spacing.xxl * 2,
  },
  title: {
    marginBottom: layout.spacing.xl,
    paddingHorizontal: layout.spacing.sm,
  },
  textDark: { color: colors.white },
  textLight: { color: colors.dark },
  subtextDark: { color: colors.textMutedDark },
  subtextLight: { color: colors.textMutedLight },

  // Contact sections
  socialRow: {
    flexDirection: 'column',
    gap: layout.spacing.md,
    marginBottom: layout.spacing.xxl,
    width: '100%',
  },
  socialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: layout.spacing.sm,
    paddingVertical: layout.spacing.md,
    paddingHorizontal: layout.spacing.lg,
    borderRadius: layout.radii.full,
    borderWidth: layout.borderWidth.thin,
  },
  socialItemDark: {
    borderColor: colors.borderDark,
    backgroundColor: colors.dark,
  },
  socialItemLight: {
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
  },
  socialIcon: {},
  socialLabel: {},

  // Question textarea
  questionSection: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    marginBottom: layout.spacing.lg,
  },
  questionLabel: {
    marginBottom: layout.spacing.sm,
  },
  textarea: {
    borderRadius: layout.radii.md,
    borderWidth: layout.borderWidth.thin,
    padding: layout.spacing.md,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  textareaDark: {
    backgroundColor: colors.productCardDark,
    borderColor: colors.outlineDarkBorder,
    color: colors.white,
  },
  textareaLight: {
    backgroundColor: colors.inputBgLight,
    borderColor: colors.inputBorderLight,
    color: colors.dark,
  },
  submitBtn: {
    height: buttonTokens.sizes.lg.height,
    borderRadius: layout.radii.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: layout.spacing.lg,
  },
  submitBtnEnabled: {
    backgroundColor: colors.accent,
  },
  submitBtnDisabledDark: {
    backgroundColor: colors.neutralDarkFaint,
  },
  submitBtnDisabledLight: {
    backgroundColor: colors.inputBorderLight,
  },
  submitBtnText: {},
  submitBtnTextEnabled: {
    color: colors.white,
  },
  submitBtnTextDisabledDark: {
    color: colors.neutralDarkMid,
  },
  submitBtnTextDisabledLight: {
    color: colors.textSubtleLight,
  },
  noPaddingBottom: {
    paddingBottom: layout.spacing.none,
  },
  flex1: {
    flex: 1,
  },
  contentPadding: {
    paddingBottom: layout.spacing.xl,
  },
  footerSpacer: {
    height: 40,
  },
  feedbackText: {
    marginTop: layout.spacing.md,
    textAlign: 'center',
  },
  submitBtnTopMargin: {
    marginTop: layout.spacing.lg,
  },
  svgInline: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
});
