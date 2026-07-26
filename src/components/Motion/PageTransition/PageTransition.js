import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useTransitionTheme } from './useTransitionTheme';

export function PageTransition({ trigger, children, style }) {
  const { fadeAnim, translateYAnim } = useTransitionTheme(trigger);

  return (
    <Animated.View
      style={[
        styles.transitionContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim }],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}

export default PageTransition;

const styles = StyleSheet.create({
  transitionContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
});
