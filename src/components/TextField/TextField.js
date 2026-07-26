import React, { useState, forwardRef } from 'react';
import { View, Text, TextInput, Animated } from 'react-native';
import styles, { getTextFieldStyles } from './TextFieldStyles';
import { useTextFieldTheme } from './useTextFieldTheme';
import { useTextFieldAnimation } from './useTextFieldAnimation';

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

  const computedErrorText = typeof error === 'string' ? error : null;
  const displayHelperText = computedErrorText || helperText;

  const dynamicStyles = getTextFieldStyles({
    size,
    multiline,
    numberOfLines,
    fullWidth,
    width,
    height,
    disabled,
    error: !!error,
    focused: isFocused,
    isDark: theme.isDark,
  });

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <View style={[dynamicStyles.container, containerStyle]}>
      {label ? (
        <Text style={[dynamicStyles.label, labelStyle]}>
          {label}
        </Text>
      ) : null}

      <Animated.View
        style={[
          dynamicStyles.inputWrapper,
          animatedContainerStyle,
          inputWrapperStyle,
        ]}
      >
        {leadingIcon ? (
          <View style={dynamicStyles.leadingIcon}>{leadingIcon}</View>
        ) : null}

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

        {trailingIcon ? (
          <View style={dynamicStyles.trailingIcon}>{trailingIcon}</View>
        ) : null}
      </Animated.View>

      {displayHelperText ? (
        <Text style={[dynamicStyles.helperText, helperStyle]}>
          {displayHelperText}
        </Text>
      ) : null}
    </View>
  );
});

export default TextField;
