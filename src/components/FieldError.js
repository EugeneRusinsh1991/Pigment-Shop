import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../theme/tokens';

/**
 * Standardized field-level error display component.
 * Integrates cleanly with the useForm hook's error state.
 *
 * @param {Object} props
 * @param {string} [props.error] - The error message to display
 * @param {Object} [props.style] - Optional extra styles to apply
 */
export default function FieldError({ error, style }) {
  if (!error) return null;

  return <Text style={[styles.errorText, style]}>{error}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
  },
});
