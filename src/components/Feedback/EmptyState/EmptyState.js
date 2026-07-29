import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Heading } from '../../Text';
import { useEmptyStateTheme } from './useEmptyStateTheme';

/**
 * Global EmptyState component for empty catalog, cart, favorites, orders, and tables.
 */
function renderChildren(children, descriptionStyle, mutedColor) {
  if (!children) return null;
  if (typeof children === 'string') {
    return <Text variant="body1" color="muted" style={[descriptionStyle]}>{children}</Text>;
  }
  return children;
}

function RetryButton({ onRetry, styles }) {
  return (
    <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
      <Text variant="body2" style={styles.retryText}>Try Again</Text>
    </TouchableOpacity>
  );
}

export default function EmptyState({
  title,
  description,
  message,
  icon,
  action,
  onRetry,
  children,
  style,
  titleStyle,
  descriptionStyle,
}) {
  const { mutedColor, styles } = useEmptyStateTheme();
  const bodyText = description || message;
  const resolvedAction = action || (onRetry ? <RetryButton onRetry={onRetry} styles={styles} /> : null);

  return (
    <View style={[styles.container, style]}>
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      {title && (
        <Heading level={4} style={[styles.title, titleStyle]}>
          {title}
        </Heading>
      )}
      {bodyText && (
        <Text variant="body2" color="muted" style={[styles.description, descriptionStyle]}>
          {bodyText}
        </Text>
      )}
      {renderChildren(children, descriptionStyle, mutedColor)}
      {resolvedAction && <View style={styles.actionWrapper}>{resolvedAction}</View>}
    </View>
  );
}
