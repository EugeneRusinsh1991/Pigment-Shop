import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useToast } from '../context/ToastContext';
import { checkoutService } from '../services/checkoutService';

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
  const calculateTotals = useCallback(() => {
    const totalPrice = items.reduce((sum, item) => {
      const numPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
      return sum + numPrice * item.qty;
    }, 0);

    const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

    return { totalPrice, totalItems };
  }, [items]);

  /**
   * Validate checkout form data
   * @param {Object} customerInfo - Customer information
   * @returns {Object} { isValid, errors }
   */
  const validateCheckoutForm = useCallback((customerInfo) => {
    const errors = {};
    
    if (!customerInfo.email || !customerInfo.email.includes('@')) {
      errors.email = 'Valid email is required';
    }
    
    if (!customerInfo.firstName || customerInfo.firstName.trim().length < 2) {
      errors.firstName = 'First name is required (min 2 characters)';
    }
    
    if (!customerInfo.lastName || customerInfo.lastName.trim().length < 2) {
      errors.lastName = 'Last name is required (min 2 characters)';
    }
    
    if (!customerInfo.phone || customerInfo.phone.trim().length < 5) {
      errors.phone = 'Phone number is required';
    }
    
    if (!customerInfo.city || customerInfo.city.trim().length < 2) {
      errors.city = 'City is required';
    }
    
    const isValid = Object.keys(errors).length === 0;
    
    return { isValid, errors };
  }, []);

  /**
   * Process checkout with validation and error handling
   * @param {Object} params - Checkout parameters
   * @returns {Promise<boolean>} Success status
   */
  const handleCheckoutProcess = useCallback(async (params) => {
    const { note, customerInfo, openScreen } = params;
    
    // Validate form
    const { isValid, errors } = validateCheckoutForm(customerInfo);
    if (!isValid) {
      const firstError = Object.values(errors)[0];
      showToast(firstError, 'error');
      return false;
    }
    
    // Validate cart
    if (items.length === 0) {
      showToast('Your cart is empty', 'error');
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
        clearCart();
        
        if (openScreen) {
          openScreen('orderConfirmation', {
            orderId: result.data,
            items,
            totalPrice,
          });
        }
        
        return true;
      } else {
        if (result.code === 'INCOMPLETE_PROFILE') {
          showAlert(
            t('cartIncompleteProfileTitle') || 'Incomplete Profile',
            t('cartIncompleteProfileMsg') || 'Your profile contains incomplete required information. You must complete your profile before placing an order.'
          );
        } else {
          showAlert(
            t('cartErrorTitle') || 'Checkout Failed',
            result.error?.message || t('cartErrorAlert') || 'An error occurred during checkout'
          );
        }
        return false;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      showAlert(
        t('cartErrorTitle') || 'Checkout Failed',
        error.message || t('cartErrorAlert') || 'An unexpected error occurred'
      );
      return false;
    }
  }, [items, user, clearCart, t, showToast, showAlert, calculateTotals, validateCheckoutForm]);

  return {
    // Functions
    handleCheckoutProcess,
    calculateTotals,
    validateCheckoutForm,
    
    // Data
    items,
  };
}
