import React from 'react';
import { View } from 'react-native';
import { Text, Heading } from '../../Text';
import { useTheme } from '../../../context/ThemeContext';
import { colors } from '../../../theme/tokens';
import { styles } from './EmptyStateStyles';

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
      {action && <View style={styles.actionWrapper}>{action}</View>}
    </View>
  );
}
