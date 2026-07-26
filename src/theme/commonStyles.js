import { StyleSheet } from 'react-native';
import { colors, fonts, layout } from './tokens';

function getContentStyle(isMobile) {
  return {
    paddingHorizontal: isMobile ? 8 : 24,
    paddingVertical: isMobile ? 8 : 16,
    maxWidth: 1330,
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
    paddingHorizontal: 8,
    paddingVertical: 8,
    maxWidth: 1330,
    alignSelf: 'center',
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  // Deprecated text styles: prefer using Text/Heading primitives from src/components/Text
  title: {
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    borderRadius: layout.radii.md,
    padding: 24,
    borderWidth: 1,
  },
  cardDark: {
    backgroundColor: colors.surfaceDark,
    borderColor: colors.borderDark,
  },
  cardLight: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.borderLight,
  },
});
