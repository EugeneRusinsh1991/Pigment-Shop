import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, layout, shadows } from '../theme/tokens';
import { useTheme } from './ThemeContext';

const ToastContext = createContext({
  showToast: () => {},
});

export function GlobalToastProvider({ children }) {
  const { isDark } = useTheme();
  const [toast, setToast] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef(null);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setToast({ message, type });
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    timeoutRef.current = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setToast(null);
      });
    }, duration);
  }, [fadeAnim]);

  let toastBg = isDark ? colors.surfaceDark : colors.surfaceLight;
  let textColor = isDark ? colors.textDark : colors.textLight;
  let borderColor = isDark ? colors.borderDark : colors.borderLight;

  if (toast?.type === 'error') {
    toastBg = isDark ? colors.dangerDarkShellBg : colors.dangerBgLight;
    textColor = isDark ? colors.textDark : colors.dangerDeep;
    borderColor = colors.dangerMid;
  } else if (toast?.type === 'success') {
    toastBg = isDark ? colors.navSurfaceDark : colors.successBgLight;
    textColor = isDark ? colors.successLight : colors.successDeep;
    borderColor = colors.successMid;
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast ? (
        <Animated.View
          style={[
            styles.container,
            {
              backgroundColor: toastBg,
              borderColor,
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
          <Text style={[styles.text, { color: textColor }]}>{toast.message}</Text>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: layout.radii.md,
    borderWidth: 1,
    maxWidth: '90%',
    zIndex: layout.zIndices.toast,
    ...shadows.dropdownLight.web,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
