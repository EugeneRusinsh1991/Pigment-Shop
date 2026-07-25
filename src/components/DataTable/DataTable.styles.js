import { StyleSheet } from 'react-native';
import { colors, layout, shadows } from '../../theme/tokens';

export const styles = StyleSheet.create({
  tableCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: layout.radii.md,
    ...shadows.cardLight.web,
    marginBottom: 20,
    overflow: 'hidden',
  },
  tableCardDark: {
    backgroundColor: colors.surfaceDark,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSlateLight,
    backgroundColor: colors.slateLight,
  },
  headerDark: {
    borderBottomColor: colors.borderSlateDark,
    backgroundColor: colors.surfaceNeutralDark,
  },
  thText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.slateText,
    textTransform: 'uppercase',
  },
  thTextDark: {
    color: colors.textMutedDark,
  },
  colHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortArrow: {
    fontSize: 10,
  },
  rowBase: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    minHeight: 44,
  },
  rowAltLight: {
    backgroundColor: colors.surfaceSubtleLight,
  },
  rowAltDark: {
    backgroundColor: colors.surfaceSubtleDark,
  },
  cellBase: {
    justifyContent: 'center',
  },
});
