import { StyleSheet } from 'react-native';
import { colors, buttonTokens, layout } from '../../theme/tokens';
import commonStyles from '../../theme/commonStyles';

const styles = StyleSheet.create({
  container: commonStyles.container,
  containerDark: commonStyles.containerDark,
  containerLight: commonStyles.containerLight,
  scrollContent: commonStyles.pageScrollContent,
  pageContent: commonStyles.pageContent,
  title: {
    marginBottom: layout.spacing.lg,
    textAlign: 'center',
  },
  cardSpecific: {
    marginBottom: layout.spacing.lg,
    borderWidth: 0,
  },
  label: {
    marginBottom: layout.spacing.xxs,
  },
  value: {},
  inputGroup: {
    marginBottom: layout.spacing.sm,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: layout.radii.sm,
    paddingHorizontal: layout.spacing.md,
    height: 40,
    justifyContent: 'center',
  },
  inputContainerDark: {
    borderColor: colors.outlineDarkBorder,
    backgroundColor: colors.productCardDark,
  },
  inputContainerLight: {
    borderColor: colors.inputBorderLight,
    backgroundColor: colors.inputBgLight,
  },
  inputDisabled: {
    opacity: layout.opacity.subtle,
  },
  input: {
    height: '100%',
  },
  saveBtn: {
    height: buttonTokens.sizes.md.height,
    borderRadius: buttonTokens.sizes.md.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: layout.spacing.xs,
  },
  saveBtnDark: {
    backgroundColor: colors.white,
  },
  saveBtnLight: {
    backgroundColor: colors.textStrongLight,
  },
  saveBtnDisabled: {
    opacity: layout.opacity.disabled,
  },
  saveBtnText: {},
  saveBtnTextDark: {
    color: colors.black,
  },
  saveBtnTextLight: {
    color: colors.white,
  },
  sectionTitle: {
    marginBottom: layout.spacing.sm,
  },
  description: {
    marginBottom: layout.spacing.lg,
  },
  promoSuccess: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: layout.spacing.lg,
    borderRadius: layout.radii.sm,
  },
  promoSuccessDark: { backgroundColor: colors.successSoftDarkBgFaint },
  promoSuccessLight: { backgroundColor: colors.successBgLight },
  promoText: {},
  promoTextDark: { color: colors.successLight },
  promoTextLight: { color: colors.successDeep },
  promoRemove: {},
  requiredNote: {
    marginTop: layout.spacing.sm,
    textAlign: 'left',
  },
  saveMessage: {
    marginTop: layout.spacing.sm,
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.md,
    borderRadius: layout.radii.sm,
  },
  saveMessageDark: {
    backgroundColor: colors.successSoftDarkBgMid,
  },
  saveMessageLight: {
    backgroundColor: colors.successBgLight,
  },
  saveMessageText: {},
  saveMessageTextDark: {
    color: colors.successLight,
  },
  saveMessageTextLight: {
    color: colors.successDeep,
  },
  subtextDark:  { color: colors.textMutedDark },
  subtextLight: { color: colors.textMutedLight },
  textDark: { color: colors.textDark },
  textLight: { color: colors.textLight },
  saveBtnMargin: {
    marginTop: layout.spacing.xs,
  },
  noPaddingBottom: {
    paddingBottom: layout.spacing.none,
  },
  flex1: {
    flex: 1,
  },
});

export default styles;
