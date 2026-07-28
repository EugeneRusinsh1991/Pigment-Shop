import { StyleSheet } from 'react-native';
import { colors, buttonTokens, layout, shadow } from '../../theme/tokens';

const styles = StyleSheet.create({
  sidebar: { width: 224, maxWidth: 224, flexShrink: 0, flexGrow: 0, flexBasis: 224, overflow: 'hidden' },
  sidebarDark: { backgroundColor: colors.backgroundDark },
  sidebarLight: { backgroundColor: colors.backgroundLight },
  content: { padding: layout.spacing.lg, gap: layout.spacing.md },

  heading: {
    marginBottom: layout.spacing.lg,
  },
  sectionTitlePrice: {
    marginTop: layout.spacing.md,
    marginBottom: layout.spacing.sm,
  },
  sectionTitle: {
    marginTop: layout.spacing.none,
    marginBottom: layout.spacing.xs,
  },

  priceSection: { gap: layout.spacing.md },
  filterSection: { gap: layout.spacing.xxs },
  optionsGroup: { gap: layout.spacing.xxxs },

  textDark: { color: colors.white },
  textLight: { color: colors.dark },

  priceColumn: { flexDirection: 'column', gap: layout.spacing.sm, marginTop: layout.spacing.sm },
  priceFieldRow: { flexDirection: 'row', alignItems: 'center', gap: layout.spacing.sm },
  priceFieldLabel: {
    width: 32,
  },
  priceInput: {
    width: 90,
    borderRadius: buttonTokens.sizes.sm.borderRadius,
    borderWidth: 1,
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.xs,
  },
  inputDark: { backgroundColor: colors.dark, borderColor: colors.outlineDarkBorder, color: colors.white },
  inputLight: { backgroundColor: colors.white, borderColor: colors.warmNeutralSoft, color: colors.dark },

  checkRow: { flexDirection: 'row', alignItems: 'center', gap: layout.spacing.sm, paddingVertical: layout.spacing.sm, minHeight: 44 },
  checkbox: {
    width: 18, height: 18, borderRadius: layout.radii.xxxs, borderWidth: 1.5, borderColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxActive: { backgroundColor: colors.accent },
  checkMark: { color: colors.white },
  checkLabel: {
  },

  /** Category tree node row */
  categoryRow: { flexDirection: 'row', alignItems: 'center', minHeight: 44 },
  categoryCheckboxWrapper: { flex: 1 },
  expandBtn: { width: 36, height: 44, alignItems: 'center', justifyContent: 'center' },
  expandBtnPlaceholder: { width: 36 },
  expandChevron: {},

  divider: { height: 1, marginVertical: layout.spacing.lg },
  dividerDark: { backgroundColor: colors.borderDarkAlt },
  dividerLight: { backgroundColor: colors.borderLightAlt },

  resetBtn: {
    backgroundColor: colors.dark,
    height: buttonTokens.sizes.md.height,
    borderRadius: buttonTokens.sizes.md.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: layout.spacing.md,
    width: '100%',
  },
  resetText: {
    color: colors.white,
  },
  accentDark: { color: colors.accent },
  accentLight: { color: colors.accent },

  /** Mobile filter toggle button */
  mobileToggleBtn: {
    marginTop: layout.spacing.md,
    marginBottom: layout.spacing.xxs,
    height: buttonTokens.sizes.md.height,
    paddingHorizontal: layout.spacing.lg,
    borderRadius: buttonTokens.sizes.md.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  mobileToggleDark: { borderColor: colors.accent, backgroundColor: colors.dark },
  mobileToggleLight: { borderColor: colors.accent, backgroundColor: colors.dangerBgAlt },
  mobileToggleText: {
  },

  mobileButtonsRow: {
    flexDirection: 'row',
    gap: layout.spacing.md,
    marginTop: layout.spacing.md,
    marginBottom: layout.spacing.xxs,
    marginHorizontal: layout.spacing.lg,
  },
  mobileButton: {
    flex: 1,
    height: buttonTokens.sizes.md.height,
    borderRadius: buttonTokens.sizes.md.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  mobileButtonDark: { borderColor: colors.accent, backgroundColor: colors.dark },
  mobileButtonLight: { borderColor: colors.accent, backgroundColor: colors.dangerBgAlt },
  mobileButtonText: {
  },

  sortDropdown: {
    position: 'absolute',
    top: 54,
    right: layout.spacing.lg,
    width: '46%',
    borderRadius: buttonTokens.sizes.md.borderRadius,
    borderWidth: 1,
    paddingVertical: layout.spacing.xxs,
    ...shadow.chip(),
    elevation: 5,
    zIndex: layout.zIndices.modal,
  },
  sortDropdownDark: {
    backgroundColor: colors.productCardDark,
    borderColor: colors.outlineDarkBorder,
  },
  sortDropdownLight: {
    backgroundColor: colors.white,
    borderColor: colors.secondaryLightBorder,
  },
  sortDropdownItem: {
    height: buttonTokens.sizes.md.height,
    justifyContent: 'center',
    paddingHorizontal: layout.spacing.md,
  },
  sortDropdownItemActiveDark: {
    backgroundColor: colors.outlineDarkBorder,
  },
  sortDropdownItemActiveLight: {
    backgroundColor: colors.slateMid,
  },
  sortDropdownText: {
  },

  scrim: {
    flex: 1,
    backgroundColor: colors.overlayScrim,
    flexDirection: 'row',
  },
  panel: {
    width: '85%',
    height: '100%',
    ...shadow.drawer(),
    elevation: 16,
  },
  panelDark: { backgroundColor: colors.navSurfaceDark },
  panelLight: { backgroundColor: colors.white },

  panelHeader: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: layout.spacing.lg,
    borderBottomWidth: 1,
    position: 'relative',
  },
  panelHeaderDark: { borderBottomColor: colors.borderDarkAlt },
  panelHeaderLight: { borderBottomColor: colors.navItemHoverDark },

  panelTitle: {
  },
  closeBtn: {
    position: 'absolute',
    right: layout.spacing.md,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyBtn: {
    backgroundColor: colors.accent,
    height: buttonTokens.sizes.md.height,
    borderRadius: buttonTokens.sizes.md.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: layout.spacing.lg,
    width: '100%',
  },
  applyBtnText: {
    color: colors.white,
  },
  sidebarMobile: { width: '100%', flex: 1 },
});

export default styles;
