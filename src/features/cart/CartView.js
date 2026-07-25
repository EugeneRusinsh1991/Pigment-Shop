import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useCartContext } from '../../context/CartContext';
import { useCatalog } from '../../context/CatalogContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { useCartViewForm } from '../../hooks/useCartViewForm';
import { useProfile } from '../../hooks/useProfile';
import { calculateTotals, handleCheckoutProcess } from './cartCheckoutLogic';
import CartViewContent from './CartViewContent';
import { useRouter, Redirect } from 'expo-router';
import { layout } from '../../theme/tokens';

export default function CartView({ isDark: isDarkProp }) {
  const { isDark: isDarkContext } = useTheme();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const isDark = isDarkProp ?? isDarkContext;
  const router = useRouter();
  const [completedOrderParams, setCompletedOrderParams] = useState(null);
  const { items, updateQuantity, removeFromCart, clearCart } = useCartContext();
  const increaseQty = (id) => updateQuantity(id, 1);
  const decreaseQty = (id) => updateQuantity(id, -1);
  const removeItem = (id) => removeFromCart(id);
  const { user } = useAuth();
  const { profile } = useProfile(user);
  const { width: windowWidth } = useWindowDimensions();
  const { flatList } = useCatalog();
  const { note, setNote, customerInfo, ...formHandlers } = useCartViewForm({ user, profile });
  const { email, firstName, lastName, phone, city, setEmail, setFirstName, setLastName, setPhone, setCity } = formHandlers;

  const isWide = windowWidth >= layout.breakpoints.tablet;
  const { totalPrice, totalItems } = calculateTotals(items);

  const handleCheckout = () => {
    handleCheckoutProcess({ user, items, totalItems, totalPrice, note, customerInfo, clearCart, t, showToast, 
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

