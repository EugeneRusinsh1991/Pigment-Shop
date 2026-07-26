import React from 'react';
import { Text } from '../../Text';
import { styles } from './FieldErrorStyles';

export default function FieldError({ error, style }) {
  if (!error) return null;

  return <Text variant="caption" color="error" style={[styles.errorText, style]}>{error}</Text>;
}
