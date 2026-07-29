import { colors, layout } from '@/theme/tokens';
import { StyleSheet } from 'react-native';

export const createBreadcrumbStyles = (isDark) => StyleSheet.create({
  scroll: {
    flexGrow: 1,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.none,
    paddingVertical: layout.spacing.xxs,
    flexWrap: 'nowrap',
    minWidth: 0,
  },
  crumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    marginHorizontal: layout.spacing.xs,
    color: colors.accent,
  },
  crumb: {
    maxWidth: 120,
  },
  crumbActive: {
    color: colors.accent,
  },
  crumbCurrent: {
    color: isDark ? colors.textDescDark : colors.textSubtleDark,
  },
  homeButton: {
    paddingVertical: layout.spacing.xxs,
    paddingHorizontal: layout.spacing.xs,
  },
});

export const createPaginationStyles = (isDark) => StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: layout.maxContentWidth,
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.xxs,
    borderBottomWidth: layout.borderWidth.none,
    minHeight: 36,
    backgroundColor: isDark ? colors.backgroundDark : colors.backgroundLight,
    borderBottomColor: isDark ? colors.borderDark : colors.borderLight,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  backButton: {
    paddingVertical: layout.spacing.xxs,
    minHeight: 44,
    justifyContent: 'center',
    flexShrink: 0,
    marginRight: layout.spacing.lg,
  },
  backText: {
    color: colors.accent,
  },
  breadcrumbWrapper: {
    paddingVertical: layout.spacing.xxs / 2,
    flex: 1,
    minHeight: 24,
    minWidth: 0,
    borderBottomColor: isDark ? colors.borderDark : colors.borderLight,
  },
});
