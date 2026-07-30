import { ScrollFadeUp } from '@/components/ui/Motion';
import { Heading, Text } from '@/components/ui/Text';
import { useLanguage } from '@/context/LanguageContext';
import { useCatalog } from '@/features/catalog/CatalogContext';
import { PlaceholderGrid } from '@/features/catalog/PlaceholderCard';
import useUnifiedCardGrid from '@/hooks/useUnifiedCardGrid';
import styles from '@/theme/appStyles';
import { layout } from '@/theme/tokens';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { CountdownTimer } from './FeaturedSections';

function DiscountsHeader({ isWide, isDark, title }) {
  const headerStyle = {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: layout.spacing.sm,
    marginBottom: layout.spacing.lg,
    gap: layout.spacing.xs,
  };
  return (
    <ScrollFadeUp style={headerStyle}>
      <Heading level={2} style={styles.sectionTitle} isDark={isDark}>
        {title}
      </Heading>
      <CountdownTimer isDark={isDark} showLabel={false} />
    </ScrollFadeUp>
  );
}

export default function DiscountsSection({ isDark, isWide, t: propT, onCardPress, favs }) {
  const { t: langT } = useLanguage();
  const t = typeof propT === 'function' ? propT : langT;
  const { cols, gap, tier } = useUnifiedCardGrid();
  const router = useRouter();
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
            text: t('viewAllDiscounts'),
            href: { pathname: '/products', params: { onSale: 'true' } },
          },
        ]
      : discountedProducts;
  }, [discountedProducts, tier, t]);

  return (
    <View style={styles.footerProductsSection}>
      <DiscountsHeader isWide={isWide} isDark={isDark} title={t('discounts')} />
      {discountedProducts.length === 0 ? (
        <View style={localStyles.emptyContainer}>
          <Text variant="body1" color="muted" style={localStyles.emptyText}>
            {t('emptyDiscounts')}
          </Text>
        </View>
      ) : (
        <PlaceholderGrid
          data={displayData}
          cols={cols}
          gap={gap}
          gridKey="sale-grid"
          isDark={isDark}
          onCardPress={onCardPress}
          favs={favs}
        />
      )}
    </View>
  );
}
const localStyles = StyleSheet.create({
  emptyContainer: {
    paddingVertical: layout.spacing.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
