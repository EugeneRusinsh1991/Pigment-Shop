import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useToast } from '../context/ToastContext';
import { calculateTotals as calculateCartTotals } from '../features/cart/cartCheckoutLogic';
import { checkoutService } from '../services/checkoutService';

function getIncompleteProfileContent(tValues) {
  return {
    title: tValues('cartIncompleteProfileTitle') || 'Incomplete Profile',
    message: tValues('cartIncompleteProfileMsg') || 'Your profile contains incomplete required information. You must complete your profile before placing an order.',
  };
}

function getGenericCheckoutFailureContent(result, tValues) {
  return {
    title: tValues('cartErrorTitle') || 'Checkout Failed',
    message: result.error?.message || tValues('cartErrorAlert') || 'An error occurred during checkout',
  };
}

function getFailureAlertContent(result, tValues) {
  return result.code === 'INCOMPLETE_PROFILE'
    ? getIncompleteProfileContent(tValues)
    : getGenericCheckoutFailureContent(result, tValues);
}

/**
 * useCheckoutLogic Hook
 * 
 * Encapsulates checkout process with validation and error handling.
 * Extracted from cartCheckoutLogic.js for better separation of concerns.
 * 
 * @param {Object} params - Checkout parameters
 * @returns {Object} Checkout functions and state
 */
export function useCheckoutLogic({ user, items, clearCart, t }) {
  const { showToast } = useToast();

  /**
   * Display error message via Toast or Alert fallback
   * @param {string} title - Error title
   * @param {string} message - Error message
   */
  const showAlert = useCallback((title, message) => {
    if (showToast) {
      showToast(message || title, 'error');
    } else if (typeof window !== 'undefined' && window.alert) {
      window.alert(message || title);
    } else {
      Alert.alert(title, message);
    }
  }, [showToast]);

  /**
   * Calculate cart totals
   * @returns {Object} { totalPrice, totalItems }
   */
  const calculateTotals = useCallback(() => calculateCartTotals(items), [items]);

  const validationRules = [
    {
      field: 'email',
      message: 'Valid email is required',
      validate: (value) => Boolean(value && value.includes('@')),
    },
    {
      field: 'firstName',
      message: 'First name is required (min 2 characters)',
      validate: (value) => Boolean(value && value.trim().length >= 2),
    },
    {
      field: 'lastName',
      message: 'Last name is required (min 2 characters)',
      validate: (value) => Boolean(value && value.trim().length >= 2),
    },
    {
      field: 'phone',
      message: 'Phone number is required',
      validate: (value) => Boolean(value && value.trim().length >= 5),
    },
    {
      field: 'city',
      message: 'City is required',
      validate: (value) => Boolean(value && value.trim().length >= 2),
    },
  ];

  const validateCart = useCallback(() => {
    if (items.length === 0) {
      showToast('Your cart is empty', 'error');
      return false;
    }
    return true;
  }, [items, showToast]);

  const handleSuccessfulCheckout = useCallback((result, openScreen, itemsToUse, totalPrice) => {
    clearCart();

    if (openScreen) {
      openScreen('orderConfirmation', {
        orderId: result.data,
        items: itemsToUse,
        totalPrice,
      });
    }

    return true;
  }, [clearCart]);

  const handleCheckoutFailure = useCallback((result, tValues) => {
    const { title, message } = getFailureAlertContent(result, tValues);
    showAlert(title, message);
    return false;
  }, [showAlert]);

  const handleCheckoutError = useCallback((error, tValues) => {
    console.error('Checkout error:', error);
    showAlert(
      tValues('cartErrorTitle') || 'Checkout Failed',
      error.message || tValues('cartErrorAlert') || 'An unexpected error occurred'
    );
    return false;
  }, [showAlert]);

  /**
   * Validate checkout form data
   * @param {Object} customerInfo - Customer information
   * @returns {Object} { isValid, errors }
   */
  const validateCheckoutForm = useCallback((customerInfo) => {
    const errors = validationRules.reduce((result, { field, message, validate }) => {
      if (!validate(customerInfo[field])) {
        result[field] = message;
      }
      return result;
    }, {});

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }, [validationRules]);

  /**
   * Process checkout with validation and error handling
   * @param {Object} params - Checkout parameters
   * @returns {Promise<boolean>} Success status
   */
  const handleCheckoutProcess = useCallback(async (params) => {
    const { note, customerInfo, openScreen } = params;

    const { isValid, errors } = validateCheckoutForm(customerInfo);
    if (!isValid) {
      const firstError = Object.values(errors)[0];
      showToast(firstError, 'error');
      return false;
    }

    if (!validateCart()) {
      return false;
    }

    const { totalPrice, totalItems } = calculateTotals();

    try {
      const result = await checkoutService.processCheckout({
        user,
        items,
        totalItems,
        totalPrice,
        note,
        customerInfo,
      });

      if (result.success) {
        return handleSuccessfulCheckout(result, openScreen, items, totalPrice);
      }

      return handleCheckoutFailure(result, t);
    } catch (error) {
      return handleCheckoutError(error, t);
    }
  }, [items, user, t, showToast, showAlert, calculateTotals, validateCheckoutForm, validateCart, handleSuccessfulCheckout, handleCheckoutFailure, handleCheckoutError]);

  return {
    // Functions
    handleCheckoutProcess,
    calculateTotals,
    validateCheckoutForm,
    
    // Data
    items,
  };
}
