import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Heading } from '../../components/Text';
import Card from '../../components/Card/Card';
import { colors, layout } from '../../theme/tokens';
import { OrderMetaRow, OrderItemRow } from './OrderRows';
import { formatDateLong } from '../../utils/dateFormatting';


function OrderItemsHeader({ isDark, t }) {
  return (
    <View style={[styles.itemsHeader, isDark ? styles.borderDark : styles.borderLight, { marginTop: 24 }]}>
      <Text variant="label" weight="medium" style={[styles.colProduct]}>
        {t('orderConfirmationItemProduct')}
      </Text>
      <Text variant="label" weight="medium" style={[styles.colQty, { textAlign: 'center' }]}>
        {t('orderConfirmationItemQty')}
      </Text>
      <Text variant="label" weight="medium" style={[styles.colPrice, { textAlign: 'right' }]}>
        {t('orderConfirmationItemPrice')}
      </Text>
      <Text variant="label" weight="medium" style={[styles.colTotal, { textAlign: 'right' }]}>
        {t('orderConfirmationItemTotal')}
      </Text>
    </View>
  );
}

export default function OrderDetailsCard({ isDark, orderId, items = [], totalPrice = 0, flatList, lang, t }) {
  const displayOrderId = String(orderId).slice(-5).toUpperCase();
  const displayDate = formatDateLong(new Date(), lang);

  return (
    <Card
      isDark={isDark}
      style={styles.cardSpecific}
    >
      <Heading level={3} style={styles.sectionTitle}>
        {t('orderConfirmationTitle')}
      </Heading>

      <OrderMetaRow
        label={t('orderNumber')}
        value={displayOrderId}
        isDark={isDark}
      />

      <OrderMetaRow
        label={t('orderDate')}
        value={displayDate}
        isDark={isDark}
      />

      <OrderMetaRow
        label={t('cartTotal')}
        value={`$${parseFloat(totalPrice).toFixed(2)}`}
        isPrice
        isLast
        isDark={isDark}
      />

      <OrderItemsHeader isDark={isDark} t={t} />

      {/* Items List */}
      {items.map((item, idx) => (
        <OrderItemRow
          key={idx}
          item={item}
          flatList={flatList}
          lang={lang}
          isDark={isDark}
          isLast={idx === items.length - 1}
        />
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  cardSpecific: {
    marginBottom: 20,
  },
  itemsHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
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
});

