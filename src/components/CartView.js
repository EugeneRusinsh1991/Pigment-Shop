import React from 'react';
import { FlatList, Text, useWindowDimensions, View, TouchableOpacity } from 'react-native';
import CartItem from './CartItem';
import styles from './CartView/CartViewStyles';
import { CartIcon } from './Icons';
import { useCartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCatalog } from '../context/CatalogContext';

function showAlert(title, message) {
  if (typeof window !== 'undefined' && window.alert) {
    window.alert(message || title);
  } else {
    Alert.alert(title, message);
  }
}

function getCleanItems(items) {
  return items.map(item => {
    const cleanItem = { ...item };
    Object.keys(cleanItem).forEach(key => {
      if (cleanItem[key] === undefined) delete cleanItem[key];
    });
    return cleanItem;
  });
}

export default function CartView({ isDark }) {
  const { t } = useTheme();
  const { items, increaseQty, decreaseQty, removeItem, clearCart } = useCartContext();
  const { user } = useAuth();
  const onIncrease = increaseQty;
  const onDecrease = decreaseQty;
  const onRemove = removeItem;

  const { width: windowWidth } = useWindowDimensions();
  const isWide = windowWidth >= 768;
  const ic = (dark, light) => (isDark ? dark : light);
  const { flatList } = useCatalog();

  // Calculate total price and total items
  const totalPrice = items.reduce((sum, item) => {
    const numPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
    return sum + numPrice * item.qty;
  }, 0);

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  if (items.length === 0) {
    return (
      <View style={[styles.emptyState, ic(styles.containerDark, styles.containerLight)]}>
        <CartIcon color={isDark ? '#FFFFFF' : '#1C1C1C'} size={48} style={{ marginBottom: 12 }} />
        <Text style={[styles.emptyText, ic(styles.emptyTextDark, styles.emptyTextLight)]}>
          {t('cartEmpty')}
        </Text>
      </View>
    );
  }

  const handleCheckout = async () => {
    if (!user) {
      showAlert(t('cartAuthRequired'), t('cartLoginRequired'));
      return;
    }

    try {
      const orderData = {
        userId: user.uid,
        items: getCleanItems(items),
        totalItems,
        totalPrice,
        createdAt: serverTimestamp(),
        status: 'Новый заказ'
      };

      await addDoc(collection(db, 'orders'), orderData);
      clearCart();
      showAlert(t('cartSuccessAlert'), t('cartSuccessMsg'));
    } catch (error) {
      console.error("Error creating order: ", error);
      showAlert(t('cartErrorTitle'), t('cartErrorAlert'));
    }
  };

  // Render the Order Summary Panel
  const renderSummary = () => (
    <View
      style={[
        styles.summaryPanel,
        ic(styles.summaryPanelDark, styles.summaryPanelLight),
        isWide ? styles.summaryPanelWide : styles.summaryPanelMobile,
      ]}
    >
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, ic(styles.summaryLabelDark, styles.summaryLabelLight)]}>
          {t('cartItemsCount')}
        </Text>
        <Text style={[styles.summaryValue, ic(styles.summaryValueDark, styles.summaryValueLight)]}>
          {totalItems}
        </Text>
      </View>

      <View style={styles.summaryDivider} />

      <View style={styles.summaryRow}>
        <Text style={[styles.totalLabel, ic(styles.totalLabelDark, styles.totalLabelLight)]}>
          {t('cartTotal')}
        </Text>
        <Text style={[styles.totalPrice, ic(styles.totalPriceDark, styles.totalPriceLight)]}>
          ${totalPrice.toLocaleString()}
        </Text>
      </View>

      <TouchableOpacity 
        style={[styles.checkoutBtn, ic(styles.checkoutBtnDark, styles.checkoutBtnLight)]}
        onPress={handleCheckout}
      >
        <Text style={[styles.checkoutBtnText, ic(styles.checkoutBtnTextDark, styles.checkoutBtnTextLight)]}>
          {t('cartCheckoutBtn')}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, ic(styles.containerDark, styles.containerLight)]}>
      <Text style={[styles.cartTitle, ic(styles.textDark, styles.textLight)]}>{t('cartTitle')}</Text>
      
      <View style={isWide ? styles.containerRow : styles.containerCol}>
        <View style={styles.leftColumn}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const matched = flatList.find((p) => p.id === item.id);
              const displayItem = matched ? { ...item, label: matched.label } : item;
              return (
                <CartItem
                  item={displayItem}
                  isDark={isDark}
                  onIncrease={() => onIncrease(item.id)}
                  onDecrease={() => onDecrease(item.id)}
                  onRemove={() => onRemove(item.id)}
                />
              );
            }}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.rightColumn}>
          {renderSummary()}
        </View>
      </View>

      {/* Footer Branding */}
      <View style={styles.footerBranding}>
        <Text style={[styles.footerBrandName, ic(styles.footerBrandNameDark, styles.footerBrandNameLight)]}>
          {t('appName')}
        </Text>
        <Text style={[styles.footerBrandSub, ic(styles.footerBrandSubDark, styles.footerBrandSubLight)]}>
          {t('cartFooterSub')}
        </Text>
      </View>
    </View>
  );
}
