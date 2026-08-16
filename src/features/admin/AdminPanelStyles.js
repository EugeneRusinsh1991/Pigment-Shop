/**
 * AdminPanelStyles.js
 */
import { StyleSheet } from 'react-native';
import { colors, layout } from '../../theme/tokens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.spacing.xl,
    backgroundColor: colors.surfaceLight,
    borderBottomWidth: layout.borderWidth.thick,
    borderBottomColor: colors.accent,
    zIndex: layout.zIndices.header,
    position: 'relative',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.sm,
  },
  userMenuContainer: {
    position: 'relative',
    zIndex: layout.zIndices.dropdown,
  },
  headerBackBtn: {
    padding: layout.spacing.xs,
  },
  headerBackText: {
    color: colors.dark,
  },
  headerTitle: {
    color: colors.dark,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xs,
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.md + layout.spacing.xxs,
    backgroundColor: colors.dangerSoftLightBg,
    borderRadius: layout.radii.sm,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.dangerSoftLightBorder,
  },
  logoutText: {
    color: colors.dangerStrong,
  },
  tabBarDesktop: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.surfaceLight,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.borderLight,
    paddingHorizontal: layout.spacing.xl,
    paddingVertical: layout.spacing.xs,
  },
  tabBarMobile: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceLight,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.borderLight,
  },
  toggle: {
    flex: 1,
    width: '100%',
  },
  toggleOption: {
    paddingHorizontal: layout.spacing.xs,
  },
  content: {
    flex: 1,
  },
  bodyWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  sidebarContainer: {
    width: 260,
    flexShrink: 0,
    paddingTop: layout.spacing.xl,
    paddingLeft: layout.spacing.xl,
  },
  bodyContent: {
    flex: 1,
    width: '100%',
  },
  sidebarCard: {
    borderRadius: layout.radii.lg,
    padding: layout.spacing.md,
    borderWidth: layout.borderWidth.thin,
    width: '100%',
  },
  sidebarCardLight: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.secondaryLightBorder,
  },
  sidebarCardDark: {
    backgroundColor: colors.surfaceDark,
    borderColor: colors.borderDark,
  },
  navContainer: {
    flexDirection: 'column',
    gap: layout.spacing.sm,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: layout.spacing.md,
    paddingHorizontal: layout.spacing.md,
    borderRadius: layout.radii.sm,
    gap: layout.spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
    cursor: 'pointer',
  },
  navItemActiveLight: {
    backgroundColor: '#F5F5F5',
    borderLeftColor: colors.accent,
  },
  navItemActiveDark: {
    backgroundColor: '#262626',
    borderLeftColor: colors.accent,
  },
  navItemText: {},
  navItemTextLight: {
    color: colors.textLight,
  },
  navItemTextDark: {
    color: colors.white,
  },
  navItemTextActive: {
    color: colors.accent,
  },
  logoutIcon: {
    marginRight: layout.spacing.xs,
  },
  contentContainer: {
    paddingBottom: layout.spacing.xxl + layout.spacing.sm,
  },
  fixedPaginationFooter: {
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: colors.borderLight,
    backgroundColor: colors.surfaceLight,
    paddingVertical: layout.spacing.xs,
    paddingHorizontal: layout.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

styles.iconColorLight = colors.dark;
styles.iconColorDark = colors.white;
styles.iconColorActive = colors.accent;

export default styles;

