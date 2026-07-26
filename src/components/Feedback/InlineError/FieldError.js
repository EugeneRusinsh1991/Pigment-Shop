import React from 'react';
import { Text } from '../../Text';
import { useInlineErrorTheme } from './useInlineErrorTheme';

export default function FieldError({ error, style }) {
  const { styles, textColor } = useInlineErrorTheme();

  if (!error) return null;

  return (
    <Text variant="caption" style={[{ color: textColor }, styles.errorText, style]}>
      {error}
    </Text>
  );
}
