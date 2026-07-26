import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/Text';
import { colors } from '../../theme/tokens';
import TextField from '../TextField';
import FieldError from '../FieldError';


const DEFAULT_LABEL_ROW_STYLE = { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 };

function resolveFieldLabelRowStyles(styles) {
  return {
    row: styles ? styles.labelRow || DEFAULT_LABEL_ROW_STYLE : DEFAULT_LABEL_ROW_STYLE,
    text: styles ? styles.fieldLabel : undefined,
  };
}

function FieldLabelRow({ label, labelIcon, styles }) {
  if (!label && !labelIcon) return null;
  const s = resolveFieldLabelRowStyles(styles);
  return (
    <View style={s.row}>
      {labelIcon}
      {label && <Text style={s.text}>{label}</Text>}
    </View>
  );
}

const FOCUSED_BORDER_STYLE = { borderColor: colors.accentBlue, borderWidth: 1.5 };

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
    <View style={styles?.fieldGroup ?? style}>
      <FieldLabelRow label={label} labelIcon={labelIcon} styles={styles} />
      <FieldInputCore leftIcon={leftIcon} rightIcon={rightIcon} styles={styles} sharedInputProps={sharedInputProps} />
      <FieldError error={error} />
    </View>
  );
}

export function FieldTextarea({ label, labelIcon, value, onChangeText, placeholder, numberOfLines = 2, error, styles, style, inputStyle, ...props }) {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={styles?.fieldGroup || style}>
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

