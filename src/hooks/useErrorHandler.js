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

  const errorRules = [
    { keys: ['network', 'fetch'], message: DEFAULT_ERROR_MESSAGES.network },
    { keys: ['timeout'], message: DEFAULT_ERROR_MESSAGES.timeout },
    { keys: ['permission', 'unauthorized'], message: DEFAULT_ERROR_MESSAGES.permission },
    { keys: ['not found', '404'], message: DEFAULT_ERROR_MESSAGES.notFound },
    { keys: ['validation', 'invalid'], message: DEFAULT_ERROR_MESSAGES.validation },
  ];

  const matchedRule = errorRules.find(({ keys }) => keys.some((key) => lowerMessage.includes(key)));
  return matchedRule?.message || DEFAULT_ERROR_MESSAGES.default;
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
