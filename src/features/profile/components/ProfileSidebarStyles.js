import { StyleSheet } from 'react-native';
import { colors, layout, typography } from '../../../theme/tokens';

const styles = StyleSheet.create({
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
  userHeader: {
    paddingBottom: layout.spacing.sm,
    marginBottom: layout.spacing.sm,
    borderBottomWidth: layout.borderWidth.thin,
  },
  userHeaderLight: {
    borderBottomColor: colors.secondaryLightBorder,
  },
  userHeaderDark: {
    borderBottomColor: colors.borderDark,
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
  },
  navItemActiveLight: {
    backgroundColor: '#F5F5F5',
    borderLeftColor: colors.accent,
  },
  navItemActiveDark: {
    backgroundColor: '#262626',
    borderLeftColor: colors.accent,
  },
  navItemText: {
    fontSize: typography.sizes.sm,
    fontWeight: '500',
  },
  navItemTextLight: {
    color: colors.textLight,
  },
  navItemTextDark: {
    color: colors.white,
  },
  navItemTextActive: {
    color: colors.accent,
  },
});

styles.iconColorLight = colors.dark;
styles.iconColorDark = colors.white;
styles.iconColorActive = colors.accent;

export default styles;
