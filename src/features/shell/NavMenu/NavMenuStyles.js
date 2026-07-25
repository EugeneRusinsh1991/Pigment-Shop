import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../theme/tokens';
import { shadow } from '../../../theme/shadows';

export default StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    flexDirection: 'row',
  },
  panel: {
    width: 260,
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
  textDark: { color: colors.slateMid },
  textLight: { color: colors.navTextDark },

  headerLeftBtn: {
    position: 'absolute',
    left: 16,
    padding: 6,
  },
  closeBtn: {
    position: 'absolute',
    right: 16,
    padding: 6,
  },
  closeIcon: { fontSize: 16, fontWeight: '600' },
  logoImage: {
    width: 140,
    height: 32,
  },

  itemList: { flex: 1 },

  utilRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  utilRowDark: { backgroundColor: colors.navSurfaceDark },
  utilRowLight: { backgroundColor: colors.white },
  utilIcon: { fontSize: 20, width: 28, textAlign: 'center' },
  utilLabel: { flex: 1, fontSize: 14, fontWeight: '600', marginLeft: 10 },
  accentDark: { color: colors.accent },
  accentLight: { color: colors.accent },
  mainNavLabel: { color: colors.accent },

  divider: { height: 1, marginHorizontal: 16, marginVertical: 4 },
  sectionSeparator: { height: 1, marginHorizontal: 16, marginVertical: 12 },
  sectionHeading: {
    fontFamily: fonts.sans,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  dividerDark: { backgroundColor: colors.borderDarkAlt },
  dividerLight: { backgroundColor: colors.navItemHoverDark },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemRowDark: { backgroundColor: colors.navSurfaceDark },
  itemRowLight: { backgroundColor: colors.white },
  selectedRowDark: { backgroundColor: 'rgba(227, 27, 35, 0.12)' },
  selectedRowLight: { backgroundColor: 'rgba(227, 27, 35, 0.05)' },
  itemIcon: { fontSize: 20, width: 28, textAlign: 'center' },
  iconWrapper: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    fontFamily: fonts.sans,
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 12,
  },
  chevron: { fontSize: 20, fontWeight: '300' },
  mutedDark: { color: colors.secondaryLightText },
  mutedLight: { color: colors.secondaryDarkText },
  menuFooter: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 28,
    borderTopWidth: 1,
    marginTop: 'auto',
  },
  menuFooterDark: {
    borderTopColor: colors.borderDarkAlt,
    backgroundColor: colors.surfaceNeutralDark,
  },
  menuFooterLight: {
    borderTopColor: colors.navItemHoverDark,
    backgroundColor: colors.surfaceElevatedLight,
  },
});
