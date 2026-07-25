import { Alert } from 'react-native';
import { checkoutService } from '../../services/checkoutService';

function showAlert(title, message, showToast) {
  if (showToast) {
    showToast(message || title, 'error');
  } else if (typeof window !== 'undefined' && window.alert) {
    window.alert(message || title);
  } else {
    Alert.alert(title, message);
  }
}

export function calculateTotals(items) {
  const totalPrice = items.reduce((sum, item) => {
    const numPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
    return sum + numPrice * item.qty;
  }, 0);

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return { totalPrice, totalItems };
}

export async function handleCheckoutProcess({ user, items, totalItems, totalPrice, note, customerInfo, clearCart, t, openScreen, showToast }) {
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
  } else {
    if (result.code === 'INCOMPLETE_PROFILE') {
      showAlert(
        t('cartIncompleteProfileTitle') || 'Incomplete Profile',
        t('cartIncompleteProfileMsg') || 'Your profile contains incomplete required information. You must complete your profile before placing an order.',
        showToast
      );
    } else {
      showAlert(t('cartErrorTitle'), t('cartErrorAlert'), showToast);
    }
  }
}

