import React from 'react';
import { Animated } from 'react-native';
import { Text } from '../../Text';
import { useToastTheme } from './useToastTheme';
import { styles } from './ToastStyles';

export function ToastView({ toast, fadeAnim }) {
  const theme = useToastTheme(toast?.type);

  if (!toast) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.bg,
          borderColor: theme.border,
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        },
      ]}
      pointerEvents="none"
    >
      <Text variant="body" style={[styles.text, { color: theme.text }]}>{toast.message}</Text>
    </Animated.View>
  );
}
