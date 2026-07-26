import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { useBadgeTheme } from './useBadgeTheme';
import { useBadgeAnimation } from './useBadgeAnimation';

const badgeFontSizes = {
  sm: 10,
  small: 10,
  md: 11,
  medium: 11,
  lg: 12,
  large: 12,
  counter: 10,
};

function extractFontProps(style) {
  if (!style) return { cleanedStyle: style, fontProps: {} };
  const flat = Array.isArray(style) ? Object.assign({}, ...style.flat().filter(Boolean)) : { ...style };
  const fontProps = {};
  const cleanedStyle = { ...flat };
  if (flat.fontSize !== undefined) { fontProps.size = flat.fontSize; delete cleanedStyle.fontSize; }
  if (flat.fontWeight !== undefined) { fontProps.weight = flat.fontWeight; delete cleanedStyle.fontWeight; }
  if (flat.lineHeight !== undefined) { fontProps.lineHeight = flat.lineHeight; delete cleanedStyle.lineHeight; }
  if (flat.fontFamily !== undefined) { fontProps.font = flat.fontFamily; delete cleanedStyle.fontFamily; }
  return { cleanedStyle, fontProps };
}

const Badge = React.forwardRef(({
  variant = 'product',
  status = 'pending',
  size = 'md',
  label,
  value,
  count,
  selected = false,
  animated = false,
  interactive = false,
  isDark: isDarkProp,
  onPress,
  style,
  textStyle: textStyleProp,
  customColor,
  children,
  ...rest
}, ref) => {
  const { containerStyle, textStyle } = useBadgeTheme({
    isDarkProp,
    variant,
    status,
    size,
    selected,
    customColor,
  });

  const { animatedStyle, bind } = useBadgeAnimation({
    animated,
    count: variant === 'counter' ? count : undefined,
    interactive: interactive || Boolean(onPress),
  });

  const displayText = resolveDisplayText({ variant, label, value, count, children });
  const { cleanedStyle, fontProps } = extractFontProps(textStyleProp);
  const resolvedSize = fontProps.size ?? badgeFontSizes[size] ?? 11;

  const combinedContainerStyle = [
    ...containerStyle,
    animatedStyle,
    style,
  ].filter(Boolean);

  if (interactive || onPress) {
    return (
      <Animated.View style={combinedContainerStyle}>
        <TouchableOpacity
          ref={ref}
          onPress={onPress}
          activeOpacity={0.75}
          onPressIn={bind.onPressIn}
          onPressOut={bind.onPressOut}
          {...rest}
        >
          <Text variant="caption" weight="semiBold" {...fontProps} size={resolvedSize} style={[...textStyle, cleanedStyle]}>{displayText}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View ref={ref} style={combinedContainerStyle} {...rest}>
      <Text variant="caption" weight="semiBold" {...fontProps} size={resolvedSize} style={[...textStyle, cleanedStyle]}>{displayText}</Text>
    </Animated.View>
  );
});

function resolveDisplayText({ variant, label, value, count, children }) {
  if (children !== undefined) return children;
  if (variant === 'discount' && value !== undefined) return `-${Math.abs(value)}%`;
  if (variant === 'counter') return count ?? 0;
  return label ?? '';
}

// Sub-primitives for common use cases
const ProductBadge = (props) => <Badge variant="product" {...props} />;
const DiscountBadge = ({ value, ...props }) => <Badge variant="discount" value={value} size="sm" {...props} />;
const StatusBadge = ({ status, label, ...props }) => <Badge variant="status" status={status} label={label} {...props} />;
const CounterBadge = ({ count, ...props }) => <Badge variant="counter" count={count} animated size="counter" {...props} />;
const ChipBadge = ({ selected, onPress, children, ...props }) => (
  <Badge variant="chip" selected={selected} interactive onPress={onPress} {...props}>
    {children}
  </Badge>
);

Badge.Product = ProductBadge;
Badge.Discount = DiscountBadge;
Badge.Status = StatusBadge;
Badge.Counter = CounterBadge;
Badge.Chip = ChipBadge;

export default Badge;
