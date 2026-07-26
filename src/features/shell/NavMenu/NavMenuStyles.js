import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/tokens';
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

  panelTitle: {},
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
  closeIcon: {},
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
  utilIcon: { width: 28, textAlign: 'center' },
  utilLabel: { flex: 1, marginLeft: 10 },
  accentDark: { color: colors.accent },
  accentLight: { color: colors.accent },
  mainNavLabel: { color: colors.accent },

  divider: { height: 1, marginHorizontal: 16, marginVertical: 4 },
  sectionSeparator: { height: 1, marginHorizontal: 16, marginVertical: 12 },
  sectionHeading: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    textTransform: 'uppercase',
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
  itemIcon: { width: 28, textAlign: 'center' },
  iconWrapper: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    flex: 1,
    marginLeft: 12,
  },
  chevron: {},
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
