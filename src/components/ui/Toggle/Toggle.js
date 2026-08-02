import React, { useState, useCallback, useMemo } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { Text } from "../Text";
import { calculateHitSlop } from '../../../theme/buttonCommon';
import { motion, buttonTokens } from '../../../theme/tokens';
import styles from './ToggleStyles';
import { useToggleTheme } from './useToggleTheme';
import { useToggleAnimation } from './useToggleAnimation';

function getOptionDimensions(size) {
  const height = size === 'sm' ? buttonTokens.sizes.sm.height : buttonTokens.sizes.md.height;
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

function getOptionStyle(isActive, animated, theme, activeOptionStyle, optionStyle, equalWidthStyle) {
  return [
    styles.option,
    isActive && !animated ? [styles.activeOption, theme?.activeOption, activeOptionStyle] : null,
    optionStyle,
    equalWidthStyle,
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
  const handleLayout = (e) => {
    const layout = e.nativeEvent.layout;
    if (ctx.onOptionMeasured && layout.width > 0) {
      ctx.onOptionMeasured(layout.width);
    }
    ctx.animation?.setOptionLayout && ctx.animation.setOptionLayout(optionValue, layout);
  };
  const handlePress = () => { if ((!isActive || ctx.allowReselect) && ctx.onChange) ctx.onChange(optionValue); };

  const computedOptionStyle = getOptionStyle(isActive, ctx.animated, ctx.theme, ctx.activeOptionStyle, ctx.optionStyle, ctx.equalWidthStyle);
  const computedTextStyle = getOptionTextStyle(isActive, ctx.textSizeStyle, ctx.theme, ctx.textStyle, ctx.activeTextStyle);

  return (
    <TouchableOpacity
      key={key}
      onLayout={handleLayout}
      style={computedOptionStyle}
      hitSlop={ctx.computedHitSlop}
      disabled={ctx.disabled}
      activeOpacity={motion.press.activeOpacity}
      onPress={handlePress}
      accessibilityRole={ctx.role || 'button'}
      accessibilityState={ctx.role === 'switch' || ctx.role === 'radio' ? { checked: isActive } : { selected: isActive }}
    >
      <Text
        variant={ctx.size === 'sm' ? 'label' : 'subtitle2'}
        weight={isActive ? 'bold' : 'medium'}
        style={computedTextStyle}
        numberOfLines={1}
      >
        {optionLabel}
      </Text>
    </TouchableOpacity>
  );
}

function buildToggleContext(props, theme, animation, computedHitSlop, textSizeStyle, size, equalWidthStyle, onOptionMeasured) {
  const { value, onChange, animated, optionStyle, activeOptionStyle, textStyle, activeTextStyle, disabled, role, allowReselect } = props;
  return { value, onChange, animated, theme, optionStyle, activeOptionStyle, textStyle, activeTextStyle, computedHitSlop, disabled, textSizeStyle, animation, size, role, equalWidthStyle, onOptionMeasured, allowReselect };
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
  role = 'button',
  equalWidth = false,
  allowReselect = false,
  ...props
}) {
  const theme = useToggleTheme({ isDarkProp, styleMap: styles });
  const animation = useToggleAnimation({ animated, options, value });
  const { sizeStyle, textSizeStyle, computedHitSlop } = computeToggleSizes(size, hitSlop);

  const [maxMeasuredWidth, setMaxMeasuredWidth] = useState(0);

  const onOptionMeasured = useCallback((measuredWidth) => {
    setMaxMeasuredWidth((prev) => (measuredWidth > prev ? Math.ceil(measuredWidth) : prev));
  }, []);

  const estimatedWidth = useMemo(() => {
    if (!equalWidth || !options.length) return 0;
    const maxChars = Math.max(
      ...options.map((opt) => getOptionLabel(opt).length),
      1
    );
    const charWidth = size === 'sm' ? 8.5 : 10;
    const padding = size === 'sm' ? 24 : 32;
    return Math.ceil(maxChars * charWidth + padding);
  }, [equalWidth, options, size]);

  const effectiveEqualWidth = equalWidth ? Math.max(estimatedWidth, maxMeasuredWidth) : 0;
  const equalWidthStyle = useMemo(
    () => (effectiveEqualWidth ? { width: effectiveEqualWidth, minWidth: effectiveEqualWidth, flexShrink: 0 } : null),
    [effectiveEqualWidth]
  );

  const ctx = buildToggleContext(
    { value, onChange, animated, optionStyle, activeOptionStyle, textStyle, activeTextStyle, disabled, role, allowReselect },
    theme,
    animation,
    computedHitSlop,
    textSizeStyle,
    size,
    equalWidthStyle,
    equalWidth ? onOptionMeasured : undefined
  );

  return (
    <View style={[styles.container, sizeStyle, theme?.container, style]} {...props}>
      {animated && animation?.indicatorStyle && (
        <Animated.View style={[styles.activeIndicator, theme?.activeOption, animation.indicatorStyle]} />
      )}
      {options.map((opt, index) => renderToggleOption(opt, index, ctx))}
    </View>
  );
}
