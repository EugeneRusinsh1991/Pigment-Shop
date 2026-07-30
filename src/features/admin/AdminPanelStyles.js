/**
 * AdminPanelStyles.js
 */
import { StyleSheet } from 'react-native';
import { colors, layout } from '../../theme/tokens';

export default StyleSheet.create({
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
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.sm,
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
  logoutIcon: {
    marginRight: layout.spacing.xs,
  },
  contentContainer: {
    paddingBottom: layout.spacing.xxl + layout.spacing.sm,
  },
});

