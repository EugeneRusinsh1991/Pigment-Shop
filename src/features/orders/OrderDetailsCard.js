import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BaseCard from '../../components/BaseCard';
import { colors, layout } from '../../theme/tokens';
import { OrderMetaRow, OrderItemRow } from './OrderRows';
import { formatDateLong } from '../../utils/dateFormatting';


function OrderItemsHeader({ isDark, subtextStyle, t }) {
  return (
    <View style={[styles.itemsHeader, isDark ? styles.borderDark : styles.borderLight, { marginTop: 24 }]}>
      <Text style={[styles.columnHeader, styles.colProduct, subtextStyle]}>
        {t('orderConfirmationItemProduct')}
      </Text>
      <Text style={[styles.columnHeader, styles.colQty, subtextStyle, { textAlign: 'center' }]}>
        {t('orderConfirmationItemQty')}
      </Text>
      <Text style={[styles.columnHeader, styles.colPrice, subtextStyle, { textAlign: 'right' }]}>
        {t('orderConfirmationItemPrice')}
      </Text>
      <Text style={[styles.columnHeader, styles.colTotal, subtextStyle, { textAlign: 'right' }]}>
        {t('orderConfirmationItemTotal')}
      </Text>
    </View>
  );
}

export default function OrderDetailsCard({ isDark, orderId, items = [], totalPrice = 0, flatList, lang, t }) {
  const displayOrderId = String(orderId).slice(-5).toUpperCase();
  const displayDate = formatDateLong(new Date(), lang);

  const textStyle = isDark ? styles.textDark : styles.textLight;
  const subtextStyle = isDark ? styles.subtextDark : styles.subtextLight;

  return (
    <BaseCard
      isDark={isDark}
      padding={24}
      borderRadius={layout.radii.md}
      style={styles.cardSpecific}
    >
      <Text style={[styles.sectionTitle, textStyle]}>
        {t('orderConfirmationTitle')}
      </Text>

      <OrderMetaRow
        label={t('orderNumber')}
        value={displayOrderId}
        isDark={isDark}
        textStyle={textStyle}
        subtextStyle={subtextStyle}
      />

      <OrderMetaRow
        label={t('orderDate')}
        value={displayDate}
        isDark={isDark}
        textStyle={textStyle}
        subtextStyle={subtextStyle}
      />

      <OrderMetaRow
        label={t('cartTotal')}
        value={`$${parseFloat(totalPrice).toFixed(2)}`}
        isPrice
        isLast
        isDark={isDark}
        textStyle={textStyle}
        subtextStyle={subtextStyle}
      />

      <OrderItemsHeader isDark={isDark} subtextStyle={subtextStyle} t={t} />

      {/* Items List */}
      {items.map((item, idx) => (
        <OrderItemRow
          key={idx}
          item={item}
          flatList={flatList}
          lang={lang}
          isDark={isDark}
          isLast={idx === items.length - 1}
          textStyle={textStyle}
          subtextStyle={subtextStyle}
        />
      ))}
    </BaseCard>
  );
}

const styles = StyleSheet.create({
  cardSpecific: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  borderDark: {
    borderBottomColor: '#2A2A2A',
  },
  borderLight: {
    borderBottomColor: '#F1F5F9',
  },
  itemsHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
  },
  columnHeader: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  colProduct: {
    flex: 4,
  },
  colQty: {
    flex: 1,
  },
  colPrice: {
    flex: 1.5,
  },
  colTotal: {
    flex: 1.5,
  },
  textDark:    { color: colors.textDark },
  textLight:   { color: colors.textLight },
  subtextDark: { color: colors.textMutedDark },
  subtextLight: { color: colors.textMutedLight },
});

