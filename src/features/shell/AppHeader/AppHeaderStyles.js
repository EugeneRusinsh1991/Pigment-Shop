import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../theme/tokens';
import { shadow } from '../../../theme/shadows';

export default StyleSheet.create({
  header: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0,
    zIndex: 11000,
  },
  headerDark: {
    backgroundColor: colors.backgroundDark,
    borderBottomColor: colors.borderDarkAlt,
  },
  headerLight: {
    backgroundColor: colors.backgroundLight,
    borderBottomColor: colors.borderLightAlt,
  },
  leftSec: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexShrink: 1,
    minWidth: 0,
  },
  menuBtn: {
    paddingRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBtnText: {
    fontSize: 22,
    lineHeight: 24,
  },
  backBtn: {
    paddingRight: 8,
  },
  backText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    fontWeight: '500',
  },
  logo: {
    fontFamily: fonts.serif,
    fontSize: 22,
    fontWeight: '600',
    color: colors.accent,
  },
  centerSec: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    flexShrink: 0,
  },
  navLink: {},
  navLinkText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    fontWeight: '500',
  },
  rightSec: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexShrink: 1,
    minWidth: 0,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  langContainer: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 42,
    right: 0,
    width: 140,
    borderRadius: 12,
    padding: 6,
    ...shadow.header(),
    elevation: 5,
    zIndex: 9999,
  },
  dropdownDark: {
    backgroundColor: colors.navSurfaceDark,
    borderWidth: 1,
    borderColor: colors.borderDarkAlt,
  },
  dropdownLight: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.navItemHoverDark,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  dropdownItemActiveDark: {
    backgroundColor: colors.borderDarkAlt,
  },
  dropdownItemActiveLight: {
    backgroundColor: colors.backgroundLight,
  },
  dropdownText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: '500',
  },
  cartBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDark: {
    backgroundColor: colors.white,
  },
  badgeLight: {
    backgroundColor: colors.dark,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  badgeTextDark: {
    color: colors.dark,
  },
  badgeTextLight: {
    color: colors.white,
  },
  textDark: { color: colors.white },
  textLight: { color: colors.dark },
  subtextDark: { color: colors.secondaryDarkText },
  subtextLight: { color: colors.secondaryLightText },
  adminBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminBtnDark: {
    borderColor: colors.secondaryDarkBorder,
  },
  adminBtnLight: {
    borderColor: colors.secondaryLightBorder,
  },
  adminBtnText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: -8,
  },
  logoImage: {
    width: 140,
    maxWidth: 140,
    height: 32,
    flexShrink: 1,
    minWidth: 0,
  },
  betaBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1.5,
    marginLeft: -8,
  },
  betaBadgeDark: {
    backgroundColor: colors.dangerDarkShellBg,
    borderColor: colors.dangerDarkShellBorder,
  },
  betaBadgeLight: {
    backgroundColor: colors.dangerSoftLightBg,
    borderColor: colors.dangerBgLight,
  },
  betaText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 14,
  },
  betaTextDark: {
    color: colors.accent,
  },
  betaTextLight: {
    color: colors.accent,
  },
});
