import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme/tokens';
import { shadow } from '../../theme/shadows';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  pageContent: {
    paddingHorizontal: 12,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  inputGroup: {
    marginBottom: 8,
  },
  label: {
    marginBottom: 6,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
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
  input: {
    fontSize: 15,
    height: '100%',
  },
  requiredNote: {
    fontSize: 12,
    marginTop: 10,
    textAlign: 'left',
  },
  containerDark: { backgroundColor: colors.backgroundDark },
  containerLight: { backgroundColor: colors.backgroundLight },

  cartTitle: {
    marginBottom: 12,
  },

  containerRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 24,
  },
  wideContainer: {
    justifyContent: 'space-between',
  },
  containerCol: {
    flex: 1,
    flexDirection: 'column',
  },
  leftColumn: {
    flex: 1.8,
  },
  rightColumn: {
    flex: 1.2,
  },

  list: { paddingVertical: 12 },

  emptyState: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 16,
  },
  emptyIcon: { fontSize: 48, marginBottom: 12 },

  // Summary Panel
  summaryPanel: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
  },
  summaryPanelDark: { backgroundColor: colors.surfaceNeutralDark, borderColor: colors.borderDarkAlt },
  summaryPanelLight: { backgroundColor: colors.white, borderColor: colors.secondaryLightBorder },

  summaryPanelMobile: {
    marginHorizontal: 0,
    marginVertical: 8,
  },
  summaryPanelWide: {
    marginTop: 6,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.secondaryDarkBorder,
    marginVertical: 12,
    opacity: 0.2,
  },

  checkoutBtn: {
    borderRadius: 50,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  checkoutBtnDark: {
    backgroundColor: colors.warmNeutralMid,
  },
  checkoutBtnLight: {
    backgroundColor: colors.dark,
  },
  checkoutBtnTextDark: { color: colors.dark },
  checkoutBtnTextLight: { color: colors.white },

  noteInput: {
    fontFamily: fonts.sans,
    fontSize: 14,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    minHeight: 80,
    marginTop: 6,
    marginBottom: 12,
    textAlignVertical: 'top',
  },
  noteInputDark: {
    backgroundColor: colors.dark,
    borderColor: colors.secondaryDarkBorder,
    color: colors.white,
  },
  noteInputLight: {
    backgroundColor: colors.slateLight,
    borderColor: colors.secondaryLightBorder,
    color: colors.navTextDark,
  },
  noteLabel: {
    marginBottom: 4,
  },

  // Footer branding
  footerBranding: {
    alignItems: 'center',
    marginTop: 32,
    paddingVertical: 16,
  },
  footerBrandName: {
    fontFamily: fonts.serif,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  footerBrandNameDark: { color: colors.white },
  footerBrandNameLight: { color: colors.dark },
  footerBrandSub: {
    fontFamily: fonts.sans,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  footerBrandSubDark: { color: colors.slateText },
  footerBrandSubLight: { color: colors.secondaryDarkText },
});
