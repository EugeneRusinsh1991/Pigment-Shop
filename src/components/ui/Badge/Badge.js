import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { badgeTokens, motion } from '../../../theme/tokens';
import { Text } from '../Text';
import { useBadgeAnimation } from './useBadgeAnimation';
import { useBadgeTheme } from './useBadgeTheme';
import BadgeStyles from './BadgeStyles';

const fontPropMap = {
  fontSize: 'size', // font prop mapper
  fontWeight: 'weight', // font prop mapper
  lineHeight: 'lineHeight', // font prop mapper
  fontFamily: 'font', // font prop mapper
};

function extractFontProps(style) {
  if (!style) return { cleanedStyle: style, fontProps: {} };

  const flat = Array.isArray(style)
    ? Object.assign({}, ...style.flat().filter(Boolean))
    : { ...style };

  const fontProps = {};
  const cleanedStyle = { ...flat };

  for (const [styleKey, propKey] of Object.entries(fontPropMap)) {
    if (flat[styleKey] !== undefined) {
      fontProps[propKey] = flat[styleKey];
      delete cleanedStyle[styleKey];
    }
  }

  return { cleanedStyle, fontProps };
}

function BadgeContent({ textStyle, cleanedStyle, fontProps, resolvedSize, displayText }) {
  return (
    <Text variant="label" weight="medium" {...fontProps} size={resolvedSize} style={[...textStyle, cleanedStyle]}>{displayText}</Text>
  );
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

  const isInteractive = interactive || Boolean(onPress);
  const { animatedStyle, bind } = useBadgeAnimation({
    animated,
    count: variant === 'counter' ? count : undefined,
    interactive: isInteractive,
  });

  const displayText = resolveDisplayText({ variant, label, value, count, children });
  const { cleanedStyle, fontProps } = extractFontProps(textStyleProp);
  const resolvedSize = fontProps.size;
  const mergedContainerStyle = [...containerStyle, animatedStyle, style].filter(Boolean);
  const contentProps = { textStyle, cleanedStyle, fontProps, resolvedSize, displayText };

  if (isInteractive) {
    return (
      <Animated.View style={mergedContainerStyle}>
        <TouchableOpacity
          ref={ref}
          onPress={onPress}
          activeOpacity={motion.press.activeOpacity}
          onPressIn={bind.onPressIn}
          onPressOut={bind.onPressOut}
          {...rest}
        >
          <BadgeContent {...contentProps} />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View ref={ref} style={mergedContainerStyle} {...rest}>
      <BadgeContent {...contentProps} />
    </Animated.View>
  );
});

function resolveDisplayText({ variant, label, value, count, children }) {
  return (
    resolveChildren(children)
    ?? resolveDiscountText(variant, value)
    ?? resolveCounterText(variant, count)
    ?? resolveLabelText(label)
  );
}

function resolveChildren(children) {
  return children;
}

function resolveDiscountText(variant, value) {
  if (variant !== 'discount' || value === undefined) return undefined;
  return `-${Math.abs(value)}%`;
}

function resolveCounterText(variant, count) {
  if (variant !== 'counter') return undefined;
  return count ?? 0;
}

function resolveLabelText(label) {
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
