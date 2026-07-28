/**
 * AdminPanelStyles.js
 */
import { StyleSheet } from 'react-native';
import { colors, layout } from '../../theme/tokens';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.warmNeutralLight,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.spacing.xl,
    backgroundColor: colors.surfaceLight,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.borderLightAlt,
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
    backgroundColor: colors.secondaryLightBg,
    borderRadius: layout.radii.sm,
  },
  logoutText: {
    color: colors.secondaryLightText,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceLight,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.borderLightAlt,
    paddingHorizontal: layout.spacing.xl,
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

