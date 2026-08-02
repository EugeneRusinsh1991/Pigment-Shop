import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { IconButton } from './IconButton';
import { buttonTokens, colors, hapticTokens } from '../../../theme/tokens';
import { useInteractionAnimation } from './useInteractionAnimation';
import { HeartIcon, CartIcon } from '../../Icons';

export function CircularActionButton({
  icon,
  size = 'md',
  variant = 'transparent',
  onPress,
  disabled,
  loading,
  haptic,
  style,
  isDark,
  ...props
}) {
  const dim = typeof size === 'number' ? size : buttonTokens.circular[size] || buttonTokens.circular.md;
  const radius = dim / 2;
  
  const { scaleAnim, handlePressIn, handlePressOut, handlePress } = useInteractionAnimation({
    size: 'circular',
    onPress,
    disabled,
    loading,
    haptic,
  });

  return (
    <Animated.View style={[{ width: dim, height: dim, borderRadius: radius, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', transform: [{ scale: scaleAnim }] }, style]}>
      <IconButton
        icon={icon}
        size={dim}
        variant={variant}
        isDark={isDark}
        animated={false}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        {...props}
      />
    </Animated.View>
  );
}

export function FavoriteActionButton({ isFavorite, onToggle, isDark, size = 'sm', style, variant, haptic = hapticTokens.impactLight, ...props }) {
  const prevFav = useRef(isFavorite);
  const dim = typeof size === 'number' ? size : buttonTokens.circular[size] || buttonTokens.circular.md;
  const radius = dim / 2;
  
  const { scaleAnim, handlePressIn, handlePressOut, handlePress, triggerStatePop } = useInteractionAnimation({
    size: 'circular',
    onPress: onToggle,
    haptic,
  });

  useEffect(() => {
    if (prevFav.current !== isFavorite) {
      if (isFavorite) {
        triggerStatePop('activate');
      } else {
        triggerStatePop('deactivate');
      }
    }
    prevFav.current = isFavorite;
  }, [isFavorite, triggerStatePop]);

  const activeColor = colors.accent;
  const inactiveColor = isDark ? colors.white : colors.dark;
  const heartColor = isFavorite ? activeColor : inactiveColor;
  
  return (
    <Animated.View style={[{ width: dim, height: dim, borderRadius: radius, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', transform: [{ scale: scaleAnim }] }, style]}>
      <IconButton
        icon={<HeartIcon filled={isFavorite} color={heartColor} size={Math.round(dim * 0.45)} />}
        size={dim}
        variant={variant || 'glass'}
        isDark={isDark}
        animated={false}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...props}
      />
    </Animated.View>
  );
}

export function CartActionButton({ onAddToCart, size = 'sm', style, variant = 'solid', isDark, haptic = hapticTokens.impactMedium, ...props }) {
  const dim = typeof size === 'number' ? size : buttonTokens.circular[size] || buttonTokens.circular.md;
  const radius = dim / 2;
  
  const { scaleAnim, handlePressIn, handlePressOut, handlePress, triggerStatePop } = useInteractionAnimation({
    size: 'circular',
    haptic,
    onPress: (e) => {
      triggerStatePop('activate');
      if (onAddToCart) onAddToCart(e);
    },
  });


  return (
    <Animated.View style={[{ width: dim, height: dim, borderRadius: radius, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', transform: [{ scale: scaleAnim }] }, style]}>
      <IconButton
        icon={<CartIcon color={colors.white} size={Math.round(dim * 0.45)} />}
        size={dim}
        variant={variant}
        isDark={isDark}
        animated={false}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={variant === 'solid' ? { backgroundColor: colors.accent, width: dim, height: dim, borderRadius: radius } : undefined}
        {...props}
      />
    </Animated.View>
  );
}
