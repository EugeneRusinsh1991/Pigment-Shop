import React, { useState, forwardRef, useCallback } from 'react';
import { View, TextInput, Animated } from 'react-native';
import { Text } from '../../components/Text';
import styles, { getTextFieldStyles } from './TextFieldStyles';
import { useTextFieldTheme } from './useTextFieldTheme';
import { useTextFieldAnimation } from './useTextFieldAnimation';

function getDisplayHelperText(error, helperText) {
  if (typeof error === 'string') return error;
  return helperText;
}

function renderLabel(label, dynamicStyles, labelStyle) {
  if (!label) return null;
  return (
    <Text variant="label" style={[dynamicStyles.label, labelStyle]}>
      {label}
    </Text>
  );
}

function renderHelperText(displayHelperText, dynamicStyles, helperStyle) {
  if (!displayHelperText) return null;
  return (
    <Text variant="caption" color="muted" style={[dynamicStyles.helperText, helperStyle]}>
      {displayHelperText}
    </Text>
  );
}

function renderInputWrapper({ ref, value, onChangeText, placeholder, theme, disabled, multiline, numberOfLines, handleFocus, handleBlur, dynamicStyles, inputStyle, animatedContainerStyle, inputWrapperStyle, leadingIcon, trailingIcon, restProps }) {
  return (
    <Animated.View style={[dynamicStyles.inputWrapper, animatedContainerStyle, inputWrapperStyle]}>
      {leadingIcon ? <View style={dynamicStyles.leadingIcon}>{leadingIcon}</View> : null}
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.placeholderColor}
        editable={!disabled}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[dynamicStyles.input, inputStyle]}
        {...restProps}
      />
      {trailingIcon ? <View style={dynamicStyles.trailingIcon}>{trailingIcon}</View> : null}
    </Animated.View>
  );
}

const TextField = forwardRef(function TextField(
  {
    value,
    onChangeText,
    label,
    placeholder,
    helperText,
    error = false,
    size = 'md',
    multiline = false,
    numberOfLines = 3,
    leadingIcon,
    trailingIcon,
    disabled = false,
    isDark: isDarkProp,
    animated = true,
    fullWidth = true,
    width,
    height,
    containerStyle,
    inputWrapperStyle,
    inputStyle,
    labelStyle,
    helperStyle,
    onFocus,
    onBlur,
    ...restProps
  },
  ref
) {
  const [isFocused, setIsFocused] = useState(false);

  const theme = useTextFieldTheme({
    isDarkProp,
    disabled,
    error: !!error,
    styleMap: styles,
  });

  const { animatedContainerStyle } = useTextFieldAnimation({
    focused: isFocused,
    animated,
  });

  const displayHelperText = getDisplayHelperText(error, helperText);

  const styleParams = { size, multiline, numberOfLines, fullWidth, width, height, disabled, error: !!error, focused: isFocused, isDark: theme.isDark };
  const dynamicStyles = getTextFieldStyles(styleParams);

  const handleFocus = useCallback((e) => { setIsFocused(true); if (onFocus) onFocus(e); }, [onFocus]);
  const handleBlur = useCallback((e) => { setIsFocused(false); if (onBlur) onBlur(e); }, [onBlur]);

  return (
    <View style={[dynamicStyles.container, containerStyle]}>
      {renderLabel(label, dynamicStyles, labelStyle)}
      {renderInputWrapper({ ref, value, onChangeText, placeholder, theme, disabled, multiline, numberOfLines, handleFocus, handleBlur, dynamicStyles, inputStyle, animatedContainerStyle, inputWrapperStyle, leadingIcon, trailingIcon, restProps })}
      {renderHelperText(displayHelperText, dynamicStyles, helperStyle)}
    </View>
  );
});

export default TextField;
