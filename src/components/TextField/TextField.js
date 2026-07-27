import { forwardRef, useCallback, useState } from 'react';
import { Animated, TextInput, View } from 'react-native';
import { Text } from '../../components/Text';
import styles, { getTextFieldStyles } from './TextFieldStyles';
import { useTextFieldAnimation } from './useTextFieldAnimation';
import { useTextFieldTheme } from './useTextFieldTheme';

function getDisplayHelperText(error, helperText) {
  if (typeof error === 'string') return error;
  return helperText;
}

function buildStyleParams({ size, multiline, numberOfLines, fullWidth, width, height, disabled, error, isFocused, isDark }) {
  return { size, multiline, numberOfLines, fullWidth, width, height, disabled, error: !!error, focused: isFocused, isDark };
}

function makeFocusHandler(setFocused, value, externalHandler) {
  return (e) => {
    setFocused(value);
    if (externalHandler) externalHandler(e);
  };
}


function renderLabel(label, dynamicStyles, labelStyle) {
  if (!label) return null;
  return (
    <Text variant="caption" style={[dynamicStyles.label, labelStyle]}>
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
      {leadingIcon ? <View style={styles.leadingIconContainer}>{leadingIcon}</View> : null}
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
      {trailingIcon ? <View style={styles.trailingIconContainer}>{trailingIcon}</View> : null}
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
    leadingIcon: propLeadingIcon,
    trailingIcon: propTrailingIcon,
    leftIcon,
    rightIcon,
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

  const leadingIcon = leftIcon || propLeadingIcon;
  const trailingIcon = rightIcon || propTrailingIcon;

  const displayHelperText = getDisplayHelperText(error, helperText);
  const dynamicStyles = getTextFieldStyles(buildStyleParams({ size, multiline, numberOfLines, fullWidth, width, height, disabled, error, isFocused, isDark: theme.isDark }));

  const handleFocus = useCallback(makeFocusHandler(setIsFocused, true, onFocus), [onFocus]);
  const handleBlur = useCallback(makeFocusHandler(setIsFocused, false, onBlur), [onBlur]);

  const wrapperProps = {
    ref, value, onChangeText, placeholder, theme, disabled, multiline,
    numberOfLines, handleFocus, handleBlur, dynamicStyles, inputStyle,
    animatedContainerStyle, inputWrapperStyle, leadingIcon, trailingIcon, restProps,
  };

  return (
    <View style={[dynamicStyles.container, containerStyle]}>
      {renderLabel(label, dynamicStyles, labelStyle)}
      {renderInputWrapper(wrapperProps)}
      {renderHelperText(displayHelperText, dynamicStyles, helperStyle)}
    </View>
  );
});

export default TextField;
