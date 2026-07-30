import React from 'react';
import { View } from 'react-native';
import { Text, Heading } from '../../Text';
import { Button } from '../../Button';
import { useEmptyStateTheme } from './useEmptyStateTheme';
import { useLanguage } from '../../../../context/LanguageContext';

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

function RetryButton({ onRetry }) {
  const { t } = useLanguage();
  return (
    <Button size="md" variant="primary" onPress={onRetry} title={t('tryAgain')} />
  );
}

function renderIcon(icon, styles) {
  if (!icon) return null;
  return <View style={styles.iconWrapper}>{icon}</View>;
}

function renderTitle(title, titleStyle, styles) {
  if (!title) return null;
  return (
    <Heading level={4} style={[styles.title, titleStyle]}>
      {title}
    </Heading>
  );
}

function renderBody(bodyText, descriptionStyle, styles) {
  if (!bodyText) return null;
  return (
    <Text variant="body2" color="muted" style={[styles.description, descriptionStyle]}>
      {bodyText}
    </Text>
  );
}

function renderAction(action, onRetry, styles) {
  if (action) return <View style={styles.actionWrapper}>{action}</View>;
  if (onRetry) return <View style={styles.actionWrapper}><RetryButton onRetry={onRetry} /></View>;
  return null;
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

  return (
    <View style={[styles.container, style]}>
      {renderIcon(icon, styles)}
      {renderTitle(title, titleStyle, styles)}
      {renderBody(bodyText, descriptionStyle, styles)}
      {renderChildren(children, descriptionStyle, mutedColor)}
      {renderAction(action, onRetry, styles)}
    </View>
  );
}
