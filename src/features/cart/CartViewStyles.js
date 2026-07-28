import { StyleSheet } from 'react-native';
import { colors, layout, shadow } from '../../theme/tokens';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  pageContent: {
    paddingHorizontal: layout.spacing.md,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: layout.spacing.xl,
  },
  inputGroup: {
    marginBottom: layout.spacing.sm,
  },
  label: {
    marginBottom: layout.spacing.xs,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: layout.radii.sm,
    paddingHorizontal: layout.spacing.md,
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
    height: '100%',
  },
  requiredNote: {
    marginTop: layout.spacing.md,
    textAlign: 'left',
  },
  containerDark: { backgroundColor: colors.backgroundDark },
  containerLight: { backgroundColor: colors.backgroundLight },

  cartTitle: {
    marginBottom: layout.spacing.md,
  },

  containerRow: {
    flex: 1,
    flexDirection: 'row',
    gap: layout.spacing.xl,
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

  list: { paddingVertical: layout.spacing.md },

  emptyState: {
    alignItems: 'center',
    paddingTop: layout.spacing.xxl,
    paddingBottom: layout.spacing.lg,
  },
  emptyIcon: { marginBottom: layout.spacing.md },

  // Summary Panel
  summaryPanel: {
    borderRadius: layout.radii.xl,
    padding: layout.spacing.xl,
    borderWidth: 1,
  },
  summaryPanelDark: { backgroundColor: colors.surfaceNeutralDark, borderColor: colors.borderDarkAlt },
  summaryPanelLight: { backgroundColor: colors.white, borderColor: colors.secondaryLightBorder },

  summaryPanelMobile: {
    marginHorizontal: layout.spacing.none,
    marginVertical: layout.spacing.sm,
  },
  summaryPanelWide: {
    marginTop: layout.spacing.xs,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: layout.spacing.sm,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.secondaryDarkBorder,
    marginVertical: layout.spacing.md,
    opacity: layout.opacity.faint,
  },

  checkoutBtn: {
    borderRadius: layout.radii.full,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: layout.spacing.md,
  },
  checkoutBtnDark: {
    backgroundColor: colors.warmNeutralMid,
  },
  checkoutBtnLight: {
    backgroundColor: colors.dark,
  },
  checkoutBtnTextDark: { color: colors.dark },
  checkoutBtnTextLight: { color: colors.white },
  checkoutBtnSpacing: { marginTop: layout.spacing.md },

  noteInput: {
    borderRadius: layout.spacing.md,
    borderWidth: 1,
    padding: layout.spacing.md,
    minHeight: 80,
    marginTop: layout.spacing.xs,
    marginBottom: layout.spacing.md,
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
    color: colors.textStrongLight,
  },
  noteLabel: {
    marginBottom: layout.spacing.xxs,
  },

  // Footer branding
  footerBranding: {
    alignItems: 'center',
    marginTop: layout.spacing.xxl,
    paddingVertical: layout.spacing.lg,
  },
  footerBrandName: {
    marginBottom: layout.spacing.xxs,
  },
  footerBrandNameDark: { color: colors.white },
  footerBrandNameLight: { color: colors.dark },
  footerBrandSub: {},
  footerBrandSubDark: { color: colors.textMutedDark },
  footerBrandSubLight: { color: colors.secondaryDarkText },
  flexOne: { flex: 1 },
  narrowContent: { alignSelf: 'center', maxWidth: '100%', paddingHorizontal: layout.spacing.sm },
  bottomSpacer: { height: 40 },
});
