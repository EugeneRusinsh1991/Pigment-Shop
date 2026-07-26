import { StyleSheet } from 'react-native';
import { colors, layout } from '../../../theme/tokens';
import { shadow } from '../../../theme/shadows';

export default StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: colors.overlayScrim,
    flexDirection: 'row',
  },
  panel: {
    width: 260,
    height: '100%',
    ...shadow.drawer(),
    elevation: layout.elevation.xl,
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

  panelTitle: {},
  textDark: { color: colors.slateMid },
  textLight: { color: colors.navTextDark },

  headerLeftBtn: {
    position: 'absolute',
    left: layout.spacing.lg,
    padding: layout.spacing.xs,
  },
  closeBtn: {
    position: 'absolute',
    right: layout.spacing.lg,
    padding: layout.spacing.xs,
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
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: 13,
  },
  utilRowDark: { backgroundColor: colors.navSurfaceDark },
  utilRowLight: { backgroundColor: colors.white },
  utilIcon: { width: 28, textAlign: 'center' },
  utilLabel: { flex: 1, marginLeft: 10 },
  accentDark: { color: colors.accent },
  accentLight: { color: colors.accent },
  mainNavLabel: { color: colors.accent },

  divider: { height: 1, marginHorizontal: layout.spacing.lg, marginVertical: layout.spacing.xxs },
  sectionSeparator: { height: 1, marginHorizontal: layout.spacing.lg, marginVertical: layout.spacing.md },
  sectionHeading: {
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.sm,
    textTransform: 'uppercase',
  },
  dividerDark: { backgroundColor: colors.borderDarkAlt },
  dividerLight: { backgroundColor: colors.navItemHoverDark },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.md,
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
    marginLeft: layout.spacing.md,
  },
  chevron: {},
  mutedDark: { color: colors.secondaryLightText },
  mutedLight: { color: colors.secondaryDarkText },
  menuFooter: {
    paddingHorizontal: layout.spacing.lg,
    paddingTop: layout.spacing.lg,
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
  catalogContainer: { paddingVertical: layout.spacing.sm },
  treeNodeRow: { flexDirection: 'row', alignItems: 'stretch' },
  treeNodeWrapper: { width: '100%' },
  langColumn: { flex: 1, flexDirection: 'column', gap: layout.spacing.sm },
  langRow: { flexDirection: 'row', gap: 10 },
  chipWidth: { width: '100%' },
  menuRowItem: { paddingVertical: layout.spacing.md, minHeight: 44 },
  menuRowLabel: { flex: 1, marginLeft: layout.spacing.md },
  catalogRow: { flexDirection: 'row', alignItems: 'center' },
  catalogRowItem: { flex: 1 },
});
