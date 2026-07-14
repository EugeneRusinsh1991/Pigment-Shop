import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';
import { useCatalog } from '../context/CatalogContext';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../hooks/useProfile';
import { calculateTotals, handleCheckoutProcess } from './CartView/cartCheckoutLogic';
import CartViewContent from './CartView/CartViewContent';
import SharedLayoutWrapper from './SharedLayoutWrapper';

export default function CartView({ isDark }) {
  const [note, setNote] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [city, setCity] = React.useState('');
  const { t } = useTheme();
  const { items, increaseQty, decreaseQty, removeItem, clearCart } = useCartContext();
  const { user } = useAuth();
  const { profile } = useProfile(user);
  const { width: windowWidth } = useWindowDimensions();
  const isWide = windowWidth >= 768;
  const ic = (dark, light) => (isDark ? dark : light);
  const { flatList } = useCatalog();

  const { totalPrice, totalItems } = calculateTotals(items);

  React.useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setPhone(profile.phone || '');
      setCity(profile.city || '');
    } else {
      setEmail('');
      setFirstName('');
      setLastName('');
      setPhone('');
      setCity('');
    }
  }, [user, profile]);

  const customerInfo = { email, firstName, lastName, phone, city };

  const handleCheckout = () => {
    handleCheckoutProcess({ user, items, totalItems, totalPrice, note, customerInfo, clearCart, t });
  };

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

  return <SharedLayoutWrapper isDark={isDark}>{content}</SharedLayoutWrapper>;
}

