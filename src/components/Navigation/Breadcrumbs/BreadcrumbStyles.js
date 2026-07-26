import { StyleSheet } from 'react-native';
import { colors } from '@/theme/tokens';

export const createBreadcrumbStyles = (isDark) => StyleSheet.create({
  scroll: {
    flexGrow: 1,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 4,
    flexWrap: 'nowrap',
    minWidth: 0,
  },
  crumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    marginHorizontal: 6,
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
});
