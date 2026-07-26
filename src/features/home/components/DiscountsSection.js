import React, { useMemo } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Text, Heading } from '@/components/Text';
import { PlaceholderGrid } from '@/features/catalog/PlaceholderCard';
import { CountdownTimer } from './FeaturedSections';
import { useCatalog } from '@/context/CatalogContext';
import { getDeviceTier } from '@/utils/layout';
import { useRouter } from 'expo-router';
import styles from '@/AppStyles';
import { ScrollFadeUp } from '@/components/Motion';
import { layout } from '@/theme/tokens';

function DiscountsHeader({ isWide, isDark, title }) {
  const headerStyle = {
    flexDirection: isWide ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: isWide ? 'center' : 'flex-start',
    paddingHorizontal: layout.spacing.sm,
    marginBottom: layout.spacing.lg,
    gap: isWide ? 0 : layout.spacing.sm,
  };
  return (
    <ScrollFadeUp style={headerStyle}>
      <Heading level={2} style={styles.sectionTitle} isDark={isDark}>
        {title}
      </Heading>
      <CountdownTimer isDark={isDark} />
    </ScrollFadeUp>
  );
}

function getColumnCount(tier) {
  if (tier === 'desktop') return 5;
  if (tier === 'tablet') return 3;
  return 2;
}

export default function DiscountsSection({ isDark, isWide, t, onCardPress, favs }) {
  const { width: windowWidth } = useWindowDimensions();
  const router = useRouter();
  const tier = getDeviceTier(windowWidth);
  const cols = getColumnCount(tier);
  const { flatList } = useCatalog();
  
  const discountedProducts = useMemo(() => flatList.filter((item) => item.discountPercent > 0), [flatList]);

  const displayData = useMemo(() => {
    const limit = tier === 'desktop' ? 4 : 5;
    const showNav = discountedProducts.length > limit;
    return showNav
      ? [
          ...discountedProducts.slice(0, limit),
          {
            id: 'nav-card-discounts',
            isNavigationCard: true,
            type: 'discounts',
            text: t.viewAllDiscounts,
            href: { pathname: '/products', params: { onSale: 'true' } },
          },
        ]
      : discountedProducts;
  }, [discountedProducts, tier, t.viewAllDiscounts]);

  return (
    <View style={styles.footerProductsSection}>
      <DiscountsHeader isWide={isWide} isDark={isDark} title={t.discounts} />
      {discountedProducts.length === 0 ? (
        <View style={{ paddingVertical: layout.spacing.xxl, alignItems: 'center' }}>
          <Text variant="body" color="muted" style={{ fontStyle: 'italic', textAlign: 'center' }}>
            {t.emptyDiscounts}
          </Text>
        </View>
      ) : (
        <PlaceholderGrid
          data={displayData}
          cols={cols}
          gridKey="sale-grid"
          isDark={isDark}
          onCardPress={onCardPress}
          favs={favs}
        />
      )}
    </View>
  );
}
