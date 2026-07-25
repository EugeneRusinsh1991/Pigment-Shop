import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme/tokens';
import { shadow } from '../../theme/shadows';

const styles = StyleSheet.create({
  sidebar: { width: 224, maxWidth: 224, flexShrink: 0, flexGrow: 0, flexBasis: 224, overflow: 'hidden' },
  sidebarDark: { backgroundColor: colors.backgroundDark },
  sidebarLight: { backgroundColor: colors.backgroundLight },
  content: { padding: 16, gap: 14 },

  heading: {
    fontFamily: fonts.sans,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  sectionTitlePrice: {
    fontFamily: fonts.sans,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: fonts.sans,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 0,
    marginBottom: 6,
  },

  priceSection: { gap: 12 },
  filterSection: { gap: 4 },
  optionsGroup: { gap: 2 },

  textDark: { color: colors.white },
  textLight: { color: colors.dark },

  priceColumn: { flexDirection: 'column', gap: 8, marginTop: 8 },
  priceFieldRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  priceFieldLabel: {
    fontFamily: fonts.sans,
    fontSize: 12,
    fontWeight: '500',
    width: 32,
  },
  priceInput: {
    fontFamily: fonts.sans,
    width: 90,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 13,
  },
  inputDark: { backgroundColor: colors.dark, borderColor: colors.outlineDarkBorder, color: colors.white },
  inputLight: { backgroundColor: colors.white, borderColor: colors.warmNeutralSoft, color: colors.dark },

  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, minHeight: 44 },
  checkbox: {
    width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxActive: { backgroundColor: colors.accent },
  checkMark: { color: colors.white, fontSize: 11, fontWeight: '700' },
  checkLabel: {
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: '500',
  },

  /** Category tree node row */
  categoryRow: { flexDirection: 'row', alignItems: 'center', minHeight: 44 },
  expandBtn: { width: 36, height: 44, alignItems: 'center', justifyContent: 'center' },
  expandBtnPlaceholder: { width: 36 },
  expandChevron: { fontSize: 11, lineHeight: 18 },

  divider: { height: 1, marginVertical: 16 },
  dividerDark: { backgroundColor: colors.borderDarkAlt },
  dividerLight: { backgroundColor: colors.borderLightAlt },

  resetBtn: {
    backgroundColor: colors.dark,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    width: '100%',
  },
  resetText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  accentDark: { color: colors.accent },
  accentLight: { color: colors.accent },

  /** Mobile filter toggle button */
  mobileToggleBtn: {
    marginTop: 12,
    marginBottom: 4,
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  mobileToggleDark: { borderColor: colors.accent, backgroundColor: colors.dark },
  mobileToggleLight: { borderColor: colors.accent, backgroundColor: colors.dangerBgAlt },
  mobileToggleText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    fontWeight: '600',
  },

  mobileButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    marginBottom: 4,
    marginHorizontal: 16,
  },
  mobileButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  mobileButtonDark: { borderColor: colors.accent, backgroundColor: colors.dark },
  mobileButtonLight: { borderColor: colors.accent, backgroundColor: colors.dangerBgAlt },
  mobileButtonText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    fontWeight: '600',
  },

  sortDropdown: {
    position: 'absolute',
    top: 54,
    right: 16,
    width: '46%',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 4,
    ...shadow.chip(),
    elevation: 5,
    zIndex: 2000,
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
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  sortDropdownItemActiveDark: {
    backgroundColor: colors.outlineDarkBorder,
  },
  sortDropdownItemActiveLight: {
    backgroundColor: colors.slateMid,
  },
  sortDropdownText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: '500',
  },

  scrim: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
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
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    position: 'relative',
  },
  panelHeaderDark: { borderBottomColor: colors.borderDarkAlt },
  panelHeaderLight: { borderBottomColor: colors.navItemHoverDark },

  panelTitle: {
    fontFamily: fonts.sans,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  closeBtn: {
    position: 'absolute',
    right: 12,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyBtn: {
    backgroundColor: colors.accent,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    width: '100%',
  },
  applyBtnText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  sidebarMobile: { width: '100%', flex: 1 },
});

export default styles;
