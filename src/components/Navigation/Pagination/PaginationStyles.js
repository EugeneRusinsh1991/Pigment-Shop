import { StyleSheet } from 'react-native';
import { colors } from '@/theme/tokens';

export const createPaginationStyles = (isDark) => StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1330,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomWidth: 0,
    minHeight: 36,
    backgroundColor: isDark ? colors.backgroundDark : colors.backgroundLight,
    borderBottomColor: isDark ? colors.borderDarkAlt : colors.borderLightAlt,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  backButton: {
    paddingVertical: 4,
    minHeight: 44,
    justifyContent: 'center',
    flexShrink: 0,
    marginRight: 16,
  },
  backText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.accent,
  },
  breadcrumbWrapper: {
    paddingVertical: 2,
    flex: 1,
    minHeight: 24,
    minWidth: 0,
    borderBottomColor: isDark ? colors.borderDarkAlt : colors.borderLightAlt,
  },
});
