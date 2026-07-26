import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { calculateHitSlop } from '../../theme/buttonCommon';
import styles from './ToggleStyles';
import { useToggleTheme } from './useToggleTheme';
import { useToggleAnimation } from './useToggleAnimation';

function getOptionDimensions(size) {
  const height = size === 'sm' ? 36 : 44;
  return { width: 0, height };
}

function getOptionValue(opt) {
  if (typeof opt === 'object' && opt !== null) return opt.value;
  return opt;
}

function getOptionLabel(opt) {
  if (typeof opt === 'object' && opt !== null) return opt.label ?? String(opt.value);
  return String(opt);
}

function getOptionStyle(isActive, animated, theme, activeOptionStyle, optionStyle) {
  return [
    styles.option,
    isActive && !animated ? [styles.activeOption, theme?.activeOption, activeOptionStyle] : null,
    optionStyle,
  ];
}

function getOptionTextStyle(isActive, textSizeStyle, theme, textStyle, activeTextStyle) {
  return [
    styles.textBase,
    textSizeStyle,
    theme?.text,
    textStyle,
    isActive ? [styles.activeText, theme?.activeText, activeTextStyle] : null,
  ];
}

export default function Toggle({
  options = [],
  value,
  onChange,
  size = 'md',
  isDark: isDarkProp,
  style,
  optionStyle,
  activeOptionStyle,
  textStyle,
  activeTextStyle,
  hitSlop,
  disabled = false,
  animated = true,
  ...props
}) {
  const theme = useToggleTheme({
    isDarkProp,
    styleMap: styles,
  });

  const animation = useToggleAnimation({
    animated,
    options,
    value,
  });

  const sizeStyle = styles[size] || styles.md;
  const textSizeStyle = styles[`text_${size}`] || styles.text_md;
  const { height, width } = getOptionDimensions(size);
  const computedHitSlop = hitSlop !== undefined ? hitSlop : calculateHitSlop(width, height);

  return (
    <View style={[styles.container, sizeStyle, theme?.container, style]} {...props}>
      {animated && animation?.indicatorStyle && (
        <Animated.View
          style={[
            styles.activeIndicator,
            theme?.activeOption,
            animation.indicatorStyle,
          ]}
        />
      )}
      {options.map((opt, index) => {
        const optionValue = getOptionValue(opt);
        const optionLabel = getOptionLabel(opt);
        const isActive = optionValue === value;
        const key = optionValue ?? index;

        return (
          <TouchableOpacity
            key={key}
            onLayout={(e) => animation?.setOptionLayout && animation.setOptionLayout(optionValue, e.nativeEvent.layout)}
            style={getOptionStyle(isActive, animated, theme, activeOptionStyle, optionStyle)}
            hitSlop={computedHitSlop}
            disabled={disabled}
            activeOpacity={0.7}
            onPress={() => {
              if (!isActive && onChange) onChange(optionValue);
            }}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <Text style={getOptionTextStyle(isActive, textSizeStyle, theme, textStyle, activeTextStyle)}>
              {optionLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
