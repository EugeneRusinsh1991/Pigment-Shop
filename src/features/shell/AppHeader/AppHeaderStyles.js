import { StyleSheet } from 'react-native';
import { colors, layout, shadow } from '../../../theme/tokens';

export default StyleSheet.create({
  header: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: layout.borderWidth.none,
    zIndex: layout.zIndices.header,
  },
  headerDark: {
    backgroundColor: colors.backgroundDark,
    borderBottomColor: colors.borderDark,
  },
  headerLight: {
    backgroundColor: colors.backgroundLight,
    borderBottomColor: colors.borderLight,
  },
  innerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 0,
    paddingHorizontal: layout.spacing.sm,
  },
  leftSec: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.lg,
    flexShrink: 1,
    minWidth: 0,
  },
  leftSecMobile: {
    gap: -layout.spacing.xs,
  },
  menuBtn: {
    paddingRight: layout.spacing.xxs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBtnText: {},
  backBtn: {
    paddingRight: layout.spacing.sm,
  },
  backText: {},
  logo: {
    color: colors.accent,
  },
  centerSec: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xl,
    flexShrink: 0,
  },
  navLink: {},
  navLinkText: {},
  rightSec: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.lg,
    flexShrink: 1,
    minWidth: 0,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {},
  langContainer: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 42,
    right: 0,
    width: 140,
    borderRadius: layout.radii.md,
    padding: layout.spacing.xs,
    ...shadow.header(),
    elevation: layout.elevation.md,
    zIndex: layout.zIndices.dropdown,
  },
  dropdownDark: {
    backgroundColor: colors.navSurfaceDark,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.borderDark,
  },
  dropdownLight: {
    backgroundColor: colors.white,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.navItemHoverDark,
  },
  dropdownItem: {
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.md,
    borderRadius: layout.radii.sm,
  },
  dropdownItemActiveDark: {
    backgroundColor: colors.borderDark,
  },
  dropdownItemActiveLight: {
    backgroundColor: colors.backgroundLight,
  },
  dropdownText: {},
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
    borderRadius: layout.radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDark: {
    backgroundColor: colors.white,
  },
  badgeLight: {
    backgroundColor: colors.dark,
  },
  badgeText: {},
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
    paddingVertical: layout.spacing.xs,
    paddingHorizontal: layout.spacing.xs + 4,
    borderRadius: layout.radii.sm,
    borderWidth: layout.borderWidth.thin,
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
  adminBtnText: {},
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
    paddingHorizontal: layout.spacing.xs + 4,
    paddingVertical: layout.spacing.xxs,
    borderRadius: layout.radii.iconBtn,
    borderWidth: layout.borderWidth.focus,
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
  betaText: {},
  betaTextDark: {
    color: colors.accent,
  },
  betaTextLight: {
    color: colors.accent,
  },
});
