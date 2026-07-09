import React from 'react';
import { FlatList, Text, useWindowDimensions, View, TouchableOpacity } from 'react-native';
import CartItem from './CartItem';
import styles from './CartView/CartViewStyles';

export default function CartView({ items, isDark, onIncrease, onDecrease, onRemove }) {
  const { width: windowWidth } = useWindowDimensions();
  const isWide = windowWidth >= 768;
  const ic = (dark, light) => (isDark ? dark : light);

  // Calculate total price and total items
  const totalPrice = items.reduce((sum, item) => {
    const numPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
    return sum + numPrice * item.qty;
  }, 0);

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  if (items.length === 0) {
    return (
      <View style={[styles.emptyState, ic(styles.containerDark, styles.containerLight)]}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={[styles.emptyText, ic(styles.emptyTextDark, styles.emptyTextLight)]}>
          Ваша корзина пуста
        </Text>
      </View>
    );
  }

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
          Товаров
        </Text>
        <Text style={[styles.summaryValue, ic(styles.summaryValueDark, styles.summaryValueLight)]}>
          {totalItems}
        </Text>
      </View>

      <View style={styles.summaryDivider} />

      <View style={styles.summaryRow}>
        <Text style={[styles.totalLabel, ic(styles.totalLabelDark, styles.totalLabelLight)]}>
          Итого
        </Text>
        <Text style={[styles.totalPrice, ic(styles.totalPriceDark, styles.totalPriceLight)]}>
          ${totalPrice.toLocaleString()}
        </Text>
      </View>

      <TouchableOpacity style={[styles.checkoutBtn, ic(styles.checkoutBtnDark, styles.checkoutBtnLight)]}>
        <Text style={[styles.checkoutBtnText, ic(styles.checkoutBtnTextDark, styles.checkoutBtnTextLight)]}>
          Оформить заказ
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, ic(styles.containerDark, styles.containerLight)]}>
      <Text style={[styles.cartTitle, ic(styles.textDark, styles.textLight)]}>Корзина</Text>
      
      <View style={isWide ? styles.containerRow : styles.containerCol}>
        <View style={styles.leftColumn}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                isDark={isDark}
                onIncrease={() => onIncrease(item.id)}
                onDecrease={() => onDecrease(item.id)}
                onRemove={() => onRemove(item.id)}
              />
            )}
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
          Belle Beauté
        </Text>
        <Text style={[styles.footerBrandSub, ic(styles.footerBrandSubDark, styles.footerBrandSubLight)]}>
          Материалы и пигменты для профессионалов бьюти-сферы
        </Text>
      </View>
    </View>
  );
}
