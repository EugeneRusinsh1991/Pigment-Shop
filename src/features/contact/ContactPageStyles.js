import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme/tokens';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  containerDark: { backgroundColor: colors.backgroundDark },
  containerLight: { backgroundColor: colors.backgroundLight },
  content: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 0,
    paddingBottom: 64,
  },
  title: {
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  textDark: { color: colors.white },
  textLight: { color: colors.dark },
  subtextDark: { color: colors.textMutedDark },
  subtextLight: { color: colors.textMutedLight },

  // Contact sections
  socialRow: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 32,
    width: '100%',
  },
  socialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
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
    marginBottom: 16,
  },
  questionLabel: {
    marginBottom: 10,
  },
  textarea: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
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
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
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
  textDark: { color: colors.textDark },
  textLight: { color: colors.textLight },
});
