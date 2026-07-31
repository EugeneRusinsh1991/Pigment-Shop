import { StyleSheet } from 'react-native';
import { buttonTokens, colors, layout, shadow } from '../../theme/tokens';

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
  priceInputContainer: {
    flex: 1,
    minWidth: 0,
  },
  priceInput: {
    flex: 1,
    minWidth: 0,
    borderRadius: buttonTokens.sizes.sm.borderRadius,
    borderWidth: layout.borderWidth.thin,
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.xs,
  },
  inputDark: { backgroundColor: colors.dark, borderColor: colors.outlineDarkBorder, color: colors.white },
  inputLight: { backgroundColor: colors.white, borderColor: colors.warmNeutralSoft, color: colors.dark },

  checkRow: { flexDirection: 'row', alignItems: 'center', gap: layout.spacing.sm, paddingVertical: layout.spacing.sm, minHeight: 44 },
  checkbox: {
    width: 18, height: 18, borderRadius: layout.radii.xxxs, borderWidth: layout.borderWidth.focus, borderColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxActive: { backgroundColor: colors.accent },
  checkboxInactive: { backgroundColor: colors.accentOverlayLight },
  checkMark: { color: colors.white },
  checkLabel: {
  },

  /** Category tree node row */
  categoryRow: { flexDirection: 'row', alignItems: 'center', minHeight: 44 },
  categoryCheckboxWrapper: { flex: 1 },
  expandBtn: { width: 36, height: 44, alignItems: 'center', justifyContent: 'center' },
  expandBtnPlaceholder: { width: 36 },
  expandChevron: {},

  divider: { height: 1, marginVertical: layout.spacing.xl },
  dividerDark: { backgroundColor: colors.borderDark },
  dividerLight: { backgroundColor: colors.borderLight },

  resetBtn: {
    backgroundColor: colors.accent,
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
    borderWidth: layout.borderWidth.thin,
  },
  mobileToggleDark: { borderColor: colors.accent, backgroundColor: colors.accent },
  mobileToggleLight: { borderColor: colors.accent, backgroundColor: colors.accent },
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
    borderWidth: layout.borderWidth.thin,
  },
  mobileButtonDark: { borderColor: colors.accent, backgroundColor: colors.accent },
  mobileButtonLight: { borderColor: colors.accent, backgroundColor: colors.accent },
  mobileButtonText: {
  },

  sortDropdown: {
    position: 'absolute',
    top: layout.spacing.lg * 2 + 6,
    right: layout.spacing.lg,
    width: '46%',
    borderRadius: buttonTokens.sizes.md.borderRadius,
    borderWidth: layout.borderWidth.thin,
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
    borderBottomWidth: layout.borderWidth.thin,
    position: 'relative',
  },
  panelHeaderDark: { borderBottomColor: colors.borderDark },
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
