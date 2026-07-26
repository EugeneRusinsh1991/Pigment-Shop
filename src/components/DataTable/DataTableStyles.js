import { StyleSheet } from 'react-native';
import { colors, layout, shadows } from '../../theme/tokens';

export const getDataTableStyles = (isDark = false) => {
  return StyleSheet.create({
    tableCard: {
      backgroundColor: isDark ? colors.surfaceDark : colors.surfaceLight,
      borderRadius: layout.radii.md,
      ...shadows.cardLight.web,
      marginBottom: 20,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? colors.borderSlateDark : colors.borderSlateLight,
      backgroundColor: isDark ? colors.surfaceNeutralDark : colors.slateLight,
    },
    thText: {
      color: isDark ? colors.textMutedDark : colors.slateText,
      textTransform: 'uppercase',
    },
    colHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    sortArrow: {},
    rowBase: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
      minHeight: 44,
    },
    rowAlt: {
      backgroundColor: isDark ? colors.surfaceSubtleDark : colors.surfaceSubtleLight,
    },
    cellBase: {
      justifyContent: 'center',
    },
  });
};

export const getRowStyle = (index = 0, isDark = false, customStyle = null) => [
  styles.rowBase,
  index % 2 === 1 && (isDark ? styles.rowAltDark : styles.rowAltLight),
  customStyle,
];

export const getCellStyle = ({ flex, width, align, style }) => [
  styles.cellBase,
  flex ? { flex } : null,
  width ? { width } : null,
  align === 'right' ? { alignItems: 'flex-end' } : null,
  align === 'center' ? { alignItems: 'center' } : null,
  style,
];

export const getHeaderColStyle = (col) => [
  styles.colHeader,
  col.flex ? { flex: col.flex } : null,
  col.width ? { width: col.width } : null,
  col.align === 'right' ? { justifyContent: 'flex-end' } : col.align === 'center' ? { justifyContent: 'center' } : col.align === 'left' ? { justifyContent: 'flex-start' } : null,
  col.style,
];

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
  sortArrow: {},
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

export default styles;
