import { Redirect, useRouter } from 'expo-router';
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { useCartLogic } from '../../hooks/useCartLogic';
import { useCheckoutLogic } from '../../hooks/useCheckoutLogic';
import { layout } from '../../theme/tokens';
import { useCatalog } from '../catalog/CatalogContext';
import { useProfile } from '../profile/useProfile';
import { useCartContext } from './CartContext';
import CartViewContent from './CartViewContent';
import { useCartViewForm } from './useCartViewForm';

export default function CartView({ isDark: isDarkProp }) {
  const { isDark: isDarkContext } = useTheme();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const isDark = isDarkProp ?? isDarkContext;
  const router = useRouter();
  const [completedOrderParams, setCompletedOrderParams] = useState(null);
  const { user } = useAuth();
  const { profile } = useProfile(user);
  const { width: windowWidth } = useWindowDimensions();
  const { flatList } = useCatalog();
  const { note, setNote, customerInfo, ...formHandlers } = useCartViewForm({ user, profile });
  const { email, firstName, lastName, phone, city, setEmail, setFirstName, setLastName, setPhone, setCity } = formHandlers;
  const { items, clearCart } = useCartContext();

  // Use new hooks for cart logic
  const { increaseQty, decreaseQty, removeItem } = useCartLogic();
  const { handleCheckoutProcess: checkoutProcess, calculateTotals } = useCheckoutLogic({ 
    user, 
    items, 
    clearCart, 
    t 
  });

  const isWide = windowWidth >= layout.breakpoints.mobile;
  const { totalPrice, totalItems } = calculateTotals();

  const handleCheckout = () => {
    checkoutProcess({ 
      note, 
      customerInfo, 
      openScreen: (screen, params) => {
        if (screen === 'orderConfirmation') {
          setCompletedOrderParams({
            orderId: params.orderId,
            items: JSON.stringify(params.items),
            totalPrice: params.totalPrice
          });
        }
      }
    });
  };

  if (completedOrderParams) {
    return <Redirect href={{ pathname: '/order-confirmation', params: completedOrderParams }} />;
  }

  const content = (
    <CartViewContent
      items={items}
      isDark={isDark}
      t={t}
      isWide={isWide}
      totalItems={totalItems}
      totalPrice={totalPrice}
      note={note}
      onNoteChange={setNote}
      onCheckout={handleCheckout}
      email={email}
      firstName={firstName}
      lastName={lastName}
      phone={phone}
      city={city}
      onEmailChange={setEmail}
      onFirstNameChange={setFirstName}
      onLastNameChange={setLastName}
      onPhoneChange={setPhone}
      onCityChange={setCity}
      increaseQty={increaseQty}
      decreaseQty={decreaseQty}
      removeItem={removeItem}
      flatList={flatList}
    />
  );

  return content;
}

