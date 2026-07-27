import { StyleSheet } from 'react-native';
import { colors, layout } from '../../theme/tokens';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: layout.spacing.xl,
  },
  containerDark: { backgroundColor: colors.backgroundDark },
  containerLight: { backgroundColor: colors.backgroundLight },
  content: {
    paddingTop: layout.spacing.lg,
    paddingHorizontal: 0, /* tokens. */
    paddingBottom: layout.spacing.xxl * 2,
  },
  title: {
    marginBottom: layout.spacing.lg,
    paddingHorizontal: layout.spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: layout.spacing.xxl * 2,
  },
  emptyTitle: {
    marginBottom: layout.spacing.sm,
  },
  emptyDesc: {
    textAlign: 'center',
    maxWidth: 300,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  textDark: { color: colors.white },
  textLight: { color: colors.dark },
  subtextDark: { color: colors.textMutedDark },
  subtextLight: { color: colors.textMutedLight },
  noPaddingBottom: {
    paddingBottom: layout.spacing.none,
  },
  flex1: {
    flex: 1,
  },
  contentWrapper: {
    alignSelf: 'center',
    maxWidth: '100%',
    paddingBottom: layout.spacing.xl,
  },
  footerSpacer: {
    height: 40,
  },
});
