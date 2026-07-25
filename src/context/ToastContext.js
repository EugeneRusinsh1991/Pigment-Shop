import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Animated } from 'react-native';
import { ToastView } from '../components/ToastView';

const ToastContext = createContext({
  showToast: () => {},
});

export function GlobalToastProvider({ children }) {
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

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastView toast={toast} fadeAnim={fadeAnim} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

