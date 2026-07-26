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

function renderToggleOption(opt, index, ctx) {
  const optionValue = getOptionValue(opt);
  const optionLabel = getOptionLabel(opt);
  const isActive = optionValue === ctx.value;
  const key = optionValue ?? index;
  const handleLayout = (e) => ctx.animation?.setOptionLayout && ctx.animation.setOptionLayout(optionValue, e.nativeEvent.layout);
  const handlePress = () => { if (!isActive && ctx.onChange) ctx.onChange(optionValue); };

  return (
    <TouchableOpacity
      key={key}
      onLayout={handleLayout}
      style={getOptionStyle(isActive, ctx.animated, ctx.theme, ctx.activeOptionStyle, ctx.optionStyle)}
      hitSlop={ctx.computedHitSlop}
      disabled={ctx.disabled}
      activeOpacity={0.7}
      onPress={handlePress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
    >
      <Text style={getOptionTextStyle(isActive, ctx.textSizeStyle, ctx.theme, ctx.textStyle, ctx.activeTextStyle)}>
        {optionLabel}
      </Text>
    </TouchableOpacity>
  );
}

function buildToggleContext(props, theme, animation, computedHitSlop, textSizeStyle) {
  const { value, onChange, animated, optionStyle, activeOptionStyle, textStyle, activeTextStyle, disabled } = props;
  return { value, onChange, animated, theme, optionStyle, activeOptionStyle, textStyle, activeTextStyle, computedHitSlop, disabled, textSizeStyle, animation };
}
function computeToggleSizes(size, hitSlop) {
  const sizeStyle = styles[size] || styles.md;
  const textSizeStyle = styles[`text_${size}`] || styles.text_md;
  const { height, width } = getOptionDimensions(size);
  const computedHitSlop = hitSlop !== undefined ? hitSlop : calculateHitSlop(width, height);
  return { sizeStyle, textSizeStyle, computedHitSlop };
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
  const theme = useToggleTheme({ isDarkProp, styleMap: styles });
  const animation = useToggleAnimation({ animated, options, value });
  const { sizeStyle, textSizeStyle, computedHitSlop } = computeToggleSizes(size, hitSlop);
  const ctx = buildToggleContext({ value, onChange, animated, optionStyle, activeOptionStyle, textStyle, activeTextStyle, disabled }, theme, animation, computedHitSlop, textSizeStyle);

  return (
    <View style={[styles.container, sizeStyle, theme?.container, style]} {...props}>
      {animated && animation?.indicatorStyle && (
        <Animated.View style={[styles.activeIndicator, theme?.activeOption, animation.indicatorStyle]} />
      )}
      {options.map((opt, index) => renderToggleOption(opt, index, ctx))}
    </View>
  );
}
