import { StyleSheet } from 'react-native';
import { colors, layout, shadow } from '../../../theme/tokens';

export default StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: colors.overlayScrim,
    flexDirection: 'row',
  },
  panel: {
    width: 280,
    height: '100%',
    ...shadow.drawer(),
    elevation: layout.elevation.xl,
  },
  panelDark: { backgroundColor: colors.navSurfaceDark },
  panelLight: { backgroundColor: colors.white },

  panelHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: layout.spacing.lg,
    borderBottomWidth: layout.borderWidth.thin,
    position: 'relative',
  },
  panelHeaderDark: { borderBottomColor: colors.borderDark },
  panelHeaderLight: { borderBottomColor: colors.navItemHoverDark },

  panelTitle: {},
  textDark: { color: colors.white },
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
    paddingVertical: layout.spacing.md,
  },
  utilRowDark: { backgroundColor: colors.navSurfaceDark },
  utilRowLight: { backgroundColor: colors.white },
  utilIcon: { width: 28, textAlign: 'center' },
  utilLabel: { flex: 1, marginLeft: layout.spacing.md },
  accentDark: { color: colors.accent },
  accentLight: { color: colors.accent },
  mainNavLabel: { color: colors.accent },

  divider: { height: 1, marginHorizontal: layout.spacing.lg, marginVertical: layout.spacing.xxs },
  sectionSeparator: { height: 1, marginHorizontal: layout.spacing.lg, marginVertical: layout.spacing.md },
  sectionHeading: {
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.sm,
  },
  dividerDark: { backgroundColor: colors.borderDark },
  dividerLight: { backgroundColor: colors.navItemHoverDark },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.md,
    minHeight: 44,
  },
  itemRowDark: { backgroundColor: colors.navSurfaceDark },
  itemRowLight: { backgroundColor: colors.white },
  selectedRowDark: {
    backgroundColor: colors.accentOverlayDark,
    borderLeftWidth: layout.borderWidth.thick,
    borderLeftColor: colors.accent,
  },
  selectedRowLight: {
    backgroundColor: colors.accentOverlayLight,
    borderLeftWidth: layout.borderWidth.thick,
    borderLeftColor: colors.accent,
  },
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
    paddingTop: layout.spacing.md,
    paddingBottom: layout.spacing.xxl,
    borderTopWidth: layout.borderWidth.thin,
    marginTop: 'auto',
  },
  menuFooterDark: {
    borderTopColor: colors.borderDark,
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
  langRow: { flexDirection: 'row', gap: layout.spacing.md },
  chipWidth: { width: '100%' },
  themeToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.md,
    minHeight: 44,
    borderRadius: layout.radii.sm,
    borderWidth: layout.borderWidth.thin,
    marginBottom: layout.spacing.md,
  },
  themeToggleBtnDark: {
    borderColor: colors.borderDark,
    backgroundColor: colors.surfaceFaintDark,
  },
  themeToggleBtnLight: {
    borderColor: colors.navItemHoverDark,
    backgroundColor: colors.surfaceFaintLight,
  },
  themeIconContainer: { marginRight: layout.spacing.sm },
  menuRowItem: { paddingVertical: layout.spacing.md, minHeight: 44 },
  menuRowLabel: { flex: 1, marginLeft: layout.spacing.md },
  catalogRow: { flexDirection: 'row', alignItems: 'stretch' },
  catalogRowItem: { flex: 2 },
  catalogExpandBtn: {
    flex: 1,
    width: 'auto',
    height: '100%',
    minHeight: 44,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
