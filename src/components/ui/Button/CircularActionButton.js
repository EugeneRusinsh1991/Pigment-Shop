import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { IconButton } from './IconButton';
import { buttonTokens, colors } from '../../../theme/tokens';
import { usePopAnimation } from './usePopAnimation';
import { HeartIcon, CartIcon } from '../../Icons';

export function CircularActionButton({
  icon,
  size = 'md',
  variant = 'transparent',
  onPress,
  disabled,
  loading,
  style,
  isDark,
  ...props
}) {
  const dim = typeof size === 'number' ? size : buttonTokens.circular[size] || buttonTokens.circular.md;
  const radius = dim / 2;
  
  const { scaleAnim, handlePressIn, handlePressOut, handlePress } = usePopAnimation({
    onPress,
    disabled,
    loading
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

export function FavoriteActionButton({ isFavorite, onToggle, isDark, size = 'sm', style, variant, ...props }) {
  const prevFav = useRef(isFavorite);
  const dim = typeof size === 'number' ? size : buttonTokens.circular[size] || buttonTokens.circular.md;
  const radius = dim / 2;
  
  const { scaleAnim, handlePressIn, handlePressOut, handlePress, triggerPop } = usePopAnimation({
    onPress: onToggle,
  });

  useEffect(() => {
    if (isFavorite && !prevFav.current) {
      triggerPop();
    }
    prevFav.current = isFavorite;
  }, [isFavorite, triggerPop]);

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

export function CartActionButton({ onAddToCart, size = 'sm', style, variant = 'solid', isDark, ...props }) {
  const dim = typeof size === 'number' ? size : buttonTokens.circular[size] || buttonTokens.circular.md;
  const radius = dim / 2;
  
  const { scaleAnim, handlePressIn, handlePressOut, handlePress, triggerPop } = usePopAnimation({
    onPress: (e) => {
      triggerPop();
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
