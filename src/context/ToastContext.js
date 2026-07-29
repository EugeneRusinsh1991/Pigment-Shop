import React, { createContext, useContext } from 'react';
import { ToastView, useToastAnimation } from '../components/ui/Feedback/Toast';

const ToastContext = createContext({
  showToast: () => {},
});

export function GlobalToastProvider({ children }) {
  const { toast, fadeAnim, showToast } = useToastAnimation();

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

