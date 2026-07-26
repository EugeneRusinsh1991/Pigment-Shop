import React from 'react';
import { View, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Text } from '../Text';
import { useCardTheme } from './useCardTheme';
import { useCardAnimation } from './useCardAnimation';
import { slotStyles } from './CardStyles';
import { layout } from '../../theme/tokens';
import Flag from '../Flag';

const Card = React.forwardRef(({
  variant = 'grid',
  isDark: isDarkProp,
  interactive = false,
  elevated = false,
  onPress,
  onClick,
  style,
  children,
  ...rest
}, ref) => {
  const isInteractive = interactive || Boolean(onPress || onClick);
  const handlePress = onPress || onClick;

  const { isDark, containerStyle } = useCardTheme({
    isDarkProp,
    variant,
    elevated,
  });

  const { animatedStyle, bind } = useCardAnimation({
    interactive: isInteractive,
  });

  const combinedStyle = [
    ...containerStyle,
    animatedStyle,
    style,
  ];

  const touchableStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
  };

  if (isInteractive) {
    return (
      <Animated.View style={combinedStyle}>
        <TouchableOpacity
          ref={ref}
          activeOpacity={0.85}
          onPress={handlePress}
          style={touchableStyle}
          onMouseEnter={bind.onMouseEnter}
          onMouseLeave={bind.onMouseLeave}
          onPressIn={bind.onPressIn}
          onPressOut={bind.onPressOut}
          {...rest}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <View ref={ref} style={combinedStyle} {...rest}>
      {children}
    </View>
  );
});

const CardImage = ({ src, source, style, alt, ...rest }) => {
  const imageSource = source || (typeof src === 'string' ? { uri: src } : src);
  return (
    <View style={slotStyles.imageContainer}>
      <Image source={imageSource} style={[slotStyles.image, style]} alt={alt} {...rest} />
    </View>
  );
};

const CardContent = ({ style, children, ...rest }) => (
  <View style={[slotStyles.content, style]} {...rest}>
    {children}
  </View>
);

const CardTitle = ({ style, children, numberOfLines = 2, isDark: isDarkProp, ...rest }) => {
  const { titleStyle } = useCardTheme({ isDarkProp });
  return (
    <Text variant="subtitle2" weight="600" style={[...titleStyle, style]} numberOfLines={numberOfLines} {...rest}>
      {children}
    </Text>
  );
};

const CardBadge = ({ label, children, style, variant = 'inactive', ...rest }) => (
  <View style={[slotStyles.badge, style]} {...rest}>
    {label ? <Flag variant={variant}>{label}</Flag> : children}
  </View>
);

const CardPrice = ({ value, style, ...rest }) => (
  <Text variant="subtitle2" weight="bold" style={[{ marginTop: layout.spacing.xxs }, style]} {...rest}>
    {value}
  </Text>
);

const CardActions = ({ style, children, ...rest }) => (
  <View style={[slotStyles.actions, style]} {...rest}>
    {children}
  </View>
);

const CardSkeleton = ({ width = '100%', height = 180, style, isDark: isDarkProp, ...rest }) => {
  const { skeletonStyle } = useCardTheme({ isDarkProp });
  return (
    <View style={[...skeletonStyle, { width, height }, style]} {...rest} />
  );
};

Card.Image = CardImage;
Card.Content = CardContent;
Card.Title = CardTitle;
Card.Badge = CardBadge;
Card.Price = CardPrice;
Card.Actions = CardActions;
Card.Skeleton = CardSkeleton;

export default Card;
