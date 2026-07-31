import { StyleSheet } from 'react-native';
import { colors, fonts, layout } from './tokens';

function getContentStyle(isMobile) {
  return {
    paddingHorizontal: isMobile ? layout.spacing.lg : layout.spacing.xl,
    paddingVertical: isMobile ? layout.spacing.sm : layout.spacing.lg,
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    width: '100%',
  };
}

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  containerDark: { backgroundColor: colors.backgroundDark },
  containerLight: { backgroundColor: colors.backgroundLight },
  content: {
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.sm,
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: layout.spacing.lg,
  },
  pageScrollContent: {
    flexGrow: 1,
    paddingBottom: layout.spacing.xl,
  },
  pageContent: {
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.spacing.lg,
  },
  // Deprecated text styles: prefer using Text/Heading primitives from src/components/Text
  title: {
    marginBottom: layout.spacing.md,
    textAlign: 'center',
  },
  card: {
    borderRadius: layout.radii.md,
    padding: layout.spacing.xl,
    borderWidth: layout.borderWidth.thin,
  },
  cardDark: {
    backgroundColor: colors.surfaceDark,
    borderColor: colors.borderDark,
  },
  cardLight: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.borderLight,
  },
  flex1: { flex: 1 },
  contentWrapper: { alignSelf: 'center', width: '100%' },
  bottomSpacer: { height: layout.spacing.xxl + layout.spacing.sm },
});
