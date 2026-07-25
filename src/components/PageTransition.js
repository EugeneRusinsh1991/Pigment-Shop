import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Platform } from 'react-native';

export default function PageTransition({ trigger, children, style }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(6)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    translateYAnim.setValue(6);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start();
  }, [trigger]);

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

const styles = StyleSheet.create({
  transitionContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
});
