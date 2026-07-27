import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { colors, layout } from '../../theme/tokens';
import TextField from '@/components/TextField';
import { FieldError } from '@/components/Feedback';

const defaultStyles = StyleSheet.create({
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: layout.spacing.xs, marginBottom: layout.spacing.xxs },
});

function resolveFieldLabelRowStyles(styles) {
  return {
    row: styles && styles.labelRow ? styles.labelRow : defaultStyles.labelRow,
    text: styles ? styles.fieldLabel : undefined,
  };
}

function FieldLabelRow({ label, labelIcon, styles }) {
  if (!label && !labelIcon) return null;
  const resolvedStyles = resolveFieldLabelRowStyles(styles);
  return (
    <View style={resolvedStyles.row}>
      {labelIcon}
      {label && <Text style={resolvedStyles.text}>{label}</Text>}
    </View>
  );
}

const FOCUSED_BORDER_STYLE = { borderColor: colors.accentBlue, borderWidth: layout.borderWidth.focus };

function buildInputStyle(styles, inputStyle, extraStyle, isFocused, error) {
  return [
    styles ? styles.fieldInput : undefined,
    inputStyle,
    extraStyle,
    isFocused ? FOCUSED_BORDER_STYLE : null,
    error && styles ? styles.fieldInputError : null,
  ];
}

function buildFocusHandlers(setIsFocused, onFocus, onBlur) {
  return {
    handleFocus: (e) => { setIsFocused && setIsFocused(true); onFocus && onFocus(e); },
    handleBlur: (e) => { setIsFocused && setIsFocused(false); onBlur && onBlur(e); },
  };
}

function FieldTextInputCore({ isFocused, setIsFocused, value, onChangeText, placeholder, error, keyboardType, styles, inputStyle, extraStyle, leftIcon, rightIcon, leadingIcon, trailingIcon, ...props }) {
  const inputStyleArr = buildInputStyle(styles, inputStyle, extraStyle, isFocused, error);
  const { handleFocus, handleBlur } = buildFocusHandlers(setIsFocused, props.onFocus, props.onBlur);

  return (
    <TextField
      testID={props.testID}
      dataSet={{ testid: props.testID }}
      value={String(value || '')}
      onChangeText={onChangeText}
      placeholder={placeholder}
      error={!!error}
      keyboardType={keyboardType}
      autoCapitalize="none"
      leadingIcon={leftIcon || leadingIcon}
      trailingIcon={rightIcon || trailingIcon}
      inputStyle={inputStyleArr}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
}

function FieldInputCore({ leftIcon, rightIcon, styles, sharedInputProps }) {
  return <FieldTextInputCore leftIcon={leftIcon} rightIcon={rightIcon} styles={styles} {...sharedInputProps} />;
}

export function FieldInput({ label, labelIcon, value, onChangeText, placeholder, error, keyboardType, styles, style, inputStyle, leftIcon, rightIcon, ...props }) {
  const [isFocused, setIsFocused] = React.useState(false);
  const sharedInputProps = { isFocused, setIsFocused, value, onChangeText, placeholder, error, keyboardType, styles, inputStyle, ...props };
  return (
    <View style={[styles?.fieldGroup, style]}>
      <FieldLabelRow label={label} labelIcon={labelIcon} styles={styles} />
      <FieldInputCore leftIcon={leftIcon} rightIcon={rightIcon} styles={styles} sharedInputProps={sharedInputProps} />
      <FieldError error={error} />
    </View>
  );
}

export function FieldTextarea({ label, labelIcon, value, onChangeText, placeholder, numberOfLines = 2, error, styles, style, inputStyle, ...props }) {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={[styles?.fieldGroup, style]}>
      <FieldLabelRow label={label} labelIcon={labelIcon} styles={styles} />
      <FieldTextInputCore
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        error={error}
        styles={{ fieldInput: styles?.fieldTextarea, fieldInputError: styles?.fieldInputError }}
        inputStyle={inputStyle}
        multiline
        numberOfLines={numberOfLines}
        {...props}
      />
      <FieldError error={error} />
    </View>
  );
}

export { FieldTextarea as FieldTextArea };

export { LanguageTabs } from './LanguageTabs';
export { FormModalLayout } from './FormModalLayout';

