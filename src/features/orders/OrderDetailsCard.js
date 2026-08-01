import { StyleSheet, View } from 'react-native';
import Card from '../../components/ui/Card/Card';
import { Heading, Text } from '../../components/ui/Text';
import { colors, layout, primitives } from '../../theme/tokens';
import { formatDateLong } from '../../utils/dateFormatting';
import { OrderItemRow, OrderMetaRow } from './OrderRows';


function OrderItemsHeader({ isDark, t }) {
  return (
    <View style={[styles.itemsHeader, isDark ? styles.itemsHeaderDark : styles.itemsHeaderLight]}>
      <Text variant="caption" weight="bold" color="muted" style={[styles.colProduct, styles.headerText]}>
        {t('orderConfirmationItemProduct')}
      </Text>
      <Text variant="caption" weight="bold" color="muted" style={[styles.colQty, styles.headerText, { textAlign: 'center' }]}>
        {t('orderConfirmationItemQty')}
      </Text>
      <Text variant="caption" weight="bold" color="muted" style={[styles.colPrice, styles.headerText, { textAlign: 'right' }]}>
        {t('orderConfirmationItemPrice')}
      </Text>
      <Text variant="caption" weight="bold" color="muted" style={[styles.colTotal, styles.headerText, { textAlign: 'right' }]}>
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

      <View style={[styles.metaContainer, isDark ? styles.metaContainerDark : styles.metaContainerLight]}>
        <OrderMetaRow
          label={t('orderNumber')}
          value={displayOrderId}
          isOrderId
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
      </View>

      <OrderItemsHeader isDark={isDark} t={t} />

      {/* Items List */}
      <View style={styles.itemsListContainer}>
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
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardSpecific: {
    marginBottom: layout.spacing.xl,
    padding: layout.spacing.lg,
  },
  sectionTitle: {
    marginBottom: layout.spacing.lg,
  },
  metaContainer: {
    borderRadius: layout.radii.sm,
    paddingHorizontal: layout.spacing.md,
    marginBottom: layout.spacing.md,
  },
  metaContainerLight: {
    backgroundColor: primitives.slate[50],
  },
  metaContainerDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  itemsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: layout.spacing.xs,
    borderRadius: layout.radii.xs,
    marginTop: layout.spacing.md,
    marginBottom: layout.spacing.xxs,
  },
  itemsHeaderLight: {
    backgroundColor: primitives.slate[100],
  },
  itemsHeaderDark: {
    backgroundColor: primitives.slate[800],
  },
  headerText: {
    fontSize: 11,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  itemsListContainer: {
    paddingHorizontal: layout.spacing.none,
  },
  colProduct: {
    flex: 3.8,
  },
  colQty: {
    flex: 1.2,
  },
  colPrice: {
    flex: 2,
  },
  colTotal: {
    flex: 2,
  },
});


