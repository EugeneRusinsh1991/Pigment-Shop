import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme/tokens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  containerDark: { backgroundColor: colors.backgroundDark },
  containerLight: { backgroundColor: colors.backgroundLight },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  pageContent: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },
  cardSpecific: {
    marginBottom: 16,
    borderWidth: 0,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
  },
  inputGroup: {
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
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
    opacity: 0.7,
  },
  input: {
    fontSize: 16,
    height: '100%',
  },
  saveBtn: {
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  saveBtnDark: {
    backgroundColor: colors.white,
  },
  saveBtnLight: {
    backgroundColor: colors.textStrongLight,
  },
  saveBtnDisabled: {
    opacity: 0.5,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
  saveBtnTextDark: {
    color: colors.black,
  },
  saveBtnTextLight: {
    color: colors.white,
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
  promoSuccessLight: { backgroundColor: colors.successBgLight },
  promoText: { fontSize: 14, fontWeight: '500' },
  promoTextDark: { color: colors.successLight },
  promoTextLight: { color: colors.successDeep },
  promoRemove: { fontSize: 12, fontWeight: '500' },
  requiredNote: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'left',
  },
  saveMessage: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  saveMessageDark: {
    backgroundColor: 'rgba(52, 211, 153, 0.16)',
  },
  saveMessageLight: {
    backgroundColor: colors.successBgLight,
  },
  saveMessageText: {
    fontSize: 14,
    fontWeight: '500',
  },
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
});

export default styles;
