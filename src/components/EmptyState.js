import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Heading } from './Text';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/tokens';

/**
 * Global EmptyState component for empty catalog, cart, favorites, orders, and tables.
 */
function useEmptyStateColors(isDark) {
  return {
    textColor: isDark ? colors.textDark : colors.textLight,
    mutedColor: isDark ? colors.textMutedDark : colors.textMutedLight,
  };
}

function renderChildren(children, descriptionStyle, mutedColor) {
  if (!children) return null;
  if (typeof children === 'string') {
    return <Text variant="body" color="muted" style={descriptionStyle}>{children}</Text>;
  }
  return children;
}

export default function EmptyState({
  title,
  description,
  message,
  icon,
  action,
  children,
  style,
  titleStyle,
  descriptionStyle,
}) {
  const { isDark } = useTheme();
  const { textColor, mutedColor } = useEmptyStateColors(isDark);
  const bodyText = description || message;

  return (
    <View style={[styles.container, style]}>
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      {title && (
        <Heading level={3} style={titleStyle}>
          {title}
        </Heading>
      )}
      {bodyText && (
        <Text variant="body" color="muted" style={descriptionStyle}>
          {bodyText}
        </Text>
      )}
      {renderChildren(children, descriptionStyle, mutedColor)}
      {action && <View style={styles.actionWrapper}>{action}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justify: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  iconWrapper: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 360,
  },
  actionWrapper: {
    marginTop: 20,
  },
});
