// @audit-keep
import React, { useRef, useEffect, useState } from 'react';
import { Animated, Platform } from 'react-native';
import { Text } from '../../Text';
import { useInlineErrorTheme } from './useInlineErrorTheme';
import { motion } from '../../../../theme/tokens';

export default function FieldError({ error, style }) {
  const { styles, textColor } = useInlineErrorTheme();
  const [visible, setVisible] = useState(!!error);
  const opacity = useRef(new Animated.Value(error ? 1 : 0)).current;
  const translateY = useRef(new Animated.Value(error ? 0 : motion.fieldError.slideOffset)).current;

  useEffect(() => {
    if (error) {
      setVisible(true);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: motion.fieldError.duration,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: motion.fieldError.duration,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: motion.fieldError.duration,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(translateY, {
          toValue: motion.fieldError.slideOffset,
          duration: motion.fieldError.duration,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start(() => setVisible(false));
    }
  }, [error]);

  if (!visible) return null;

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }], overflow: 'hidden' }}>
      <Text variant="caption" style={[{ color: textColor }, styles.errorText, style]}>
        {error}
      </Text>
    </Animated.View>
  );
}
