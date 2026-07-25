import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/tokens';

/**
 * Global EmptyState component for empty catalog, cart, favorites, orders, and tables.
 */
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

  const bodyText = description || message;
  const textColor = isDark ? colors.textDark : colors.textLight;
  const mutedColor = isDark ? colors.textMutedDark : colors.textMutedLight;

  return (
    <View style={[styles.container, style]}>
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      {title && (
        <Text style={[styles.title, { color: textColor }, titleStyle]}>
          {title}
        </Text>
      )}
      {bodyText && (
        <Text style={[styles.description, { color: mutedColor }, descriptionStyle]}>
          {bodyText}
        </Text>
      )}
      {children && (
        typeof children === 'string' ? (
          <Text style={[styles.description, { color: mutedColor }, descriptionStyle]}>
            {children}
          </Text>
        ) : (
          children
        )
      )}
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
