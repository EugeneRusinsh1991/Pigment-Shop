import { useCallback } from 'react';
import { useToast } from '../context/ToastContext';

const DEFAULT_ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  timeout: 'Request timed out. Please try again.',
  permission: 'You do not have permission to perform this action.',
  notFound: 'The requested resource was not found.',
  validation: 'Please check your input and try again.',
  default: 'An error occurred. Please try again.',
};

function getErrorMessage(error, customMessage) {
  if (customMessage) return customMessage;

  const message = error?.message || String(error);
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('network') || lowerMessage.includes('fetch')) {
    return DEFAULT_ERROR_MESSAGES.network;
  }
  if (lowerMessage.includes('timeout')) {
    return DEFAULT_ERROR_MESSAGES.timeout;
  }
  if (lowerMessage.includes('permission') || lowerMessage.includes('unauthorized')) {
    return DEFAULT_ERROR_MESSAGES.permission;
  }
  if (lowerMessage.includes('not found') || lowerMessage.includes('404')) {
    return DEFAULT_ERROR_MESSAGES.notFound;
  }
  if (lowerMessage.includes('validation') || lowerMessage.includes('invalid')) {
    return DEFAULT_ERROR_MESSAGES.validation;
  }

  return DEFAULT_ERROR_MESSAGES.default;
}

export function useErrorHandler() {
  const { showToast } = useToast();

  const handleError = useCallback((error, options = {}) => {
    const { message, fallback, logToConsole = true } = options;
    
    if (logToConsole) {
      console.error('[useErrorHandler]', error);
    }

    const errorMessage = getErrorMessage(error, message || fallback);
    showToast(errorMessage, 'error');
  }, [showToast]);

  const handleAsyncError = useCallback(async (asyncFn, options = {}) => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error, options);
      throw error;
    }
  }, [handleError]);

  const handleValidation = useCallback((errors, customMessage) => {
    const message = customMessage || DEFAULT_ERROR_MESSAGES.validation;
    showToast(message, 'error');
  }, [showToast]);

  return {
    handleError,
    handleAsyncError,
    handleValidation,
  };
}
