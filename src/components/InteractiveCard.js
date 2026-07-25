import React from 'react';
import { StyleSheet, TouchableOpacity, Animated, View } from 'react-native';
import ScrollFadeUp from './ScrollFadeUp';
import CardShadow from './CardShadow';
import useHoverAnimation from '../hooks/useHoverAnimation';
import { colors } from '../theme/tokens';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const InteractiveCard = React.forwardRef(({
  isDark,
  cardWidth,
  cardHeight,
  cardMargin,
  lightBgColor,
  darkBgColor,
  borderRadius,
  padding,
  children,
  style,
  outerStyle,
  activeOpacity,
  ...rest
}, ref) => {
  const { hoverAnim, translateY, bind } = useHoverAnimation();
  const defaultLightBg = lightBgColor || colors.productCardLight;
  const defaultDarkBg = darkBgColor || colors.productCardDark;

  const computedOuterStyle = {
    width: cardWidth,
    minWidth: cardWidth,
    height: cardHeight,
    flex: 0,
    flexGrow: 0,
    margin: cardMargin,
    overflow: 'visible',
    ...outerStyle,
  };

  const innerStyle = {
    ...StyleSheet.flatten(style),
    flex: 1,
    width: '100%',
    height: '100%',
    transform: [{ translateY }],
    borderRadius,
    overflow: 'visible',
  };

  return (
    <ScrollFadeUp ref={ref} style={computedOuterStyle}>
      <AnimatedTouchableOpacity
        style={innerStyle}
        activeOpacity={activeOpacity}
        {...rest}
        onMouseEnter={(e) => { bind.onMouseEnter(e); rest.onMouseEnter?.(e); }}
        onMouseLeave={(e) => { bind.onMouseLeave(e); rest.onMouseLeave?.(e); }}
        onPressIn={(e) => { bind.onPressIn(e); rest.onPressIn?.(e); }}
        onPressOut={(e) => { bind.onPressOut(e); rest.onPressOut?.(e); }}
      >
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: cardWidth,
          height: cardHeight,
          borderRadius,
          backgroundColor: isDark ? defaultDarkBg : defaultLightBg
        }} />
        <CardShadow hoverAnim={hoverAnim} isDark={isDark} lightBgColor={defaultLightBg} style={{ width: cardWidth, height: cardHeight, borderRadius }} />
        {children}
      </AnimatedTouchableOpacity>
    </ScrollFadeUp>
  );
});

export default InteractiveCard;
