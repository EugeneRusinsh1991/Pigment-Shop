import { useRef, useCallback } from 'react';
import { Animated, Platform } from 'react-native';
import { motion } from '../../../theme/tokens';
import { hapticsService } from '../../../services/haptics/hapticsService';

export function useInteractionAnimation({
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  reduceMotion = false,
  physicsPreset = 'snappy',
  activeOpacity = motion.interaction.opacity.pressed,
  customScaleTo,
  haptic,
  onPress,
  onPressIn,
  onPressOut,
} = {}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const resolvedScaleTo = useCallback(() => {
    if (reduceMotion) return 1;
    if (customScaleTo !== undefined) return customScaleTo;
    if (fullWidth) return motion.interaction.scale.fullWidth;
    if (size === 'circular' || typeof size === 'number') return motion.interaction.scale.circular;
    return motion.interaction.scale[size] || motion.interaction.scale.md;
  }, [size, fullWidth, customScaleTo, reduceMotion]);

  const physicsConfig = motion.interaction.physics[physicsPreset] || motion.interaction.physics.snappy;

  const handlePressIn = useCallback((e) => {
    if (!disabled && !loading) {
      scaleAnim.stopAnimation();
      opacityAnim.stopAnimation();

      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: activeOpacity,
          duration: motion.interaction.opacity.pressInDuration,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(scaleAnim, {
          toValue: resolvedScaleTo(),
          duration: motion.interaction.opacity.pressInDuration,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    }
    if (onPressIn) onPressIn(e);
  }, [disabled, loading, activeOpacity, resolvedScaleTo, onPressIn, scaleAnim, opacityAnim]);

  const handlePressOut = useCallback((e) => {
    if (!disabled && !loading) {
      scaleAnim.stopAnimation();
      opacityAnim.stopAnimation();

      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: motion.interaction.opacity.pressOutDuration,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: physicsConfig.tension,
          friction: physicsConfig.friction,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    }
    if (onPressOut) onPressOut(e);
  }, [disabled, loading, physicsConfig, onPressOut, scaleAnim, opacityAnim]);

  const triggerStatePop = useCallback((intent = 'activate') => {
    if (disabled || loading || reduceMotion) return;

    const targetPopScale = motion.interaction.pop[intent] || motion.interaction.pop.activate;

    scaleAnim.stopAnimation();

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: targetPopScale,
        duration: motion.interaction.pop.duration,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: physicsConfig.tension,
        friction: physicsConfig.friction,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
  }, [disabled, loading, reduceMotion, physicsConfig, scaleAnim]);

  const handlePress = useCallback((e) => {
    if (disabled || loading) return;
    if (haptic) {
      hapticsService.trigger(haptic);
    }
    e?.stopPropagation?.();
    if (onPress) onPress(e);
  }, [disabled, loading, haptic, onPress]);


  return {
    scaleAnim,
    opacityAnim,
    handlePressIn,
    handlePressOut,
    handlePress,
    triggerStatePop,
  };
}
