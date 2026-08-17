/**
 * TopCustomersList.js
 *
 * Renders top customers sorted by lifetime value / total spent.
 */
import React, { useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ChevronDownIcon } from '@/components/Icons';
import { Text } from '@/components/ui/Text';
import styles from './AnalyticsStyles';
import { useLanguage } from '../../../context/LanguageContext';
import { colors } from '../../../theme/tokens';

function formatCurrency(val) {
  return `$${val.toLocaleString()}`;
}

export default function TopCustomersList({ orders = [] }) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const topCustomers = useMemo(() => {
    if (!Array.isArray(orders) || orders.length === 0) return [];

    const map = new Map();

    orders.forEach((order) => {
      if (!order) return;

      const name = (order.customerName || order.name || '').trim();
      const email = (order.customerEmail || order.email || '').trim();
      const phone = (order.customerPhone || order.phone || '').trim();
      const userId = (order.userId || '').trim();

      const key = (email || phone || name || userId || 'Guest').toLowerCase();
      const price = Number(order.totalPrice) || 0;

      if (!map.has(key)) {
        map.set(key, {
          id: key,
          name: name || email || phone || 'Anonymous',
          email,
          phone,
          totalSpent: 0,
          ordersCount: 0,
        });
      }

      const existing = map.get(key);
      existing.totalSpent += price;
      existing.ordersCount += 1;
      if (!existing.name && name) existing.name = name;
      if (!existing.email && email) existing.email = email;
      if (!existing.phone && phone) existing.phone = phone;
    });

    return Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent);
  }, [orders]);

  const visibleCustomers = useMemo(() => {
    return isExpanded ? topCustomers.slice(0, 15) : topCustomers.slice(0, 5);
  }, [topCustomers, isExpanded]);

  if (topCustomers.length === 0) {
    return (
      <View style={styles.topProductsEmpty}>
        <Text variant="body2" color="secondary">
          {t('adminAnalyticsNoCustomers') || t('adminAnalyticsNoData')}
        </Text>
      </View>
    );
  }

  return (
    <View>
      {visibleCustomers.map((c, i) => {
        const contact = c.email || c.phone;
        const initial = (c.name || 'U').charAt(0).toUpperCase();

        return (
          <View key={c.id || i} style={styles.customerRow}>
            <View style={styles.customerRank}>
              <Text variant="caption" style={styles.customerRankText}>
                {i + 1}
              </Text>
            </View>

            <View style={styles.customerAvatar}>
              <Text variant="caption" style={styles.customerAvatarText}>
                {initial}
              </Text>
            </View>

            <View style={styles.customerInfo}>
              <Text variant="caption" style={styles.customerName} numberOfLines={1}>
                {c.name}
              </Text>
              <View style={styles.customerMeta}>
                {Boolean(contact && contact !== c.name) && (
                  <Text variant="caption" style={styles.customerMetaText} numberOfLines={1}>
                    {contact}
                  </Text>
                )}
                <View style={styles.customerOrdersBadge}>
                  <Text variant="caption" style={styles.customerOrdersBadgeText}>
                    {c.ordersCount} {t('adminAnalyticsOrdersCount')}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.customerTotalSpent}>
              <Text variant="subtitle2" style={styles.customerSpentText}>
                {formatCurrency(c.totalSpent)}
              </Text>
            </View>
          </View>
        );
      })}

      {topCustomers.length > 5 && (
        <View style={styles.topProductsExpandRow}>
          <TouchableOpacity
            style={styles.topProductsExpandBtn}
            onPress={() => setIsExpanded((prev) => !prev)}
            accessibilityRole="button"
            accessibilityLabel={isExpanded ? t('adminAnalyticsShowLess') : t('adminAnalyticsShowMore')}
          >
            <ChevronDownIcon
              size={16}
              color={colors.accent}
              style={isExpanded ? styles.topProductsExpandIconRotated : undefined}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
