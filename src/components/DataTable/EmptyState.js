import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/tokens';

/**
 * Shared EmptyState primitive for tables and lists.
 * Replaces duplicated `.emptyText` rendering across the codebase.
 */
export default function EmptyState({ children, style }) {
  const { isDark } = useTheme();
  
  return (
    <Text style={[
      styles.emptyText, 
      { color: isDark ? colors.textMutedDark : colors.textMutedLight },
      style
    ]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    fontSize: 14,
  },
});
