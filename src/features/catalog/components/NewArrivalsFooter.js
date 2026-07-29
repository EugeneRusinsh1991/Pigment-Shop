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

function getDisplayData(newArrivals, limit, viewAllNewText, onNavPress) {
  const showNav = newArrivals.length > limit;
  if (!showNav) return newArrivals;
  return [
    ...newArrivals.slice(0, limit),
    { id: 'nav-card-new', isNavigationCard: true, type: 'new', text: viewAllNewText, href: onNavPress },
  ];
}

function EmptyArrivalsMessage({ isDark, text }) {
  return (
    <View style={localStyles.emptyContainer}>
      <Text variant="body1" color="muted" style={localStyles.emptyText}>{text}</Text>
    </View>
  );
}

export default function NewArrivalsFooter({ isDark, isWide, t: propT, onCardPress, favs }) {
  const { t: langT } = useLanguage();
  const t = propT || langT;
  const { cols, gap, tier } = useUnifiedCardGrid();
  const limit = tier === 'desktop' ? 4 : 5;
  const router = useRouter();
  const { flatList } = useCatalog();
  
  const newArrivals = useMemo(() => flatList.filter((item) => item.isNew), [flatList]);

  const displayData = useMemo(() => {
    const navHref = { pathname: '/products', params: { isNew: 'true' } };
    return getDisplayData(newArrivals, limit, t('viewAllNew'), navHref);
  }, [newArrivals, limit, t]);

  return (
    <View style={styles.footerProductsSection}>
      <ScrollFadeUp>
        <Heading level={2} style={[styles.sectionTitle, styles.footerTitlePadding]} isDark={isDark}>
          {t('newArrivals')}
        </Heading>
      </ScrollFadeUp>
      {newArrivals.length === 0 ? (
        <EmptyArrivalsMessage isDark={isDark} text={t('emptyNewArrivals')} />
      ) : (
        <PlaceholderGrid
          data={displayData}
          cols={cols}
          gap={gap}
          gridKey="prod-grid"
          isDark={isDark}
          onCardPress={onCardPress}
          favs={favs}
        />
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  emptyContainer: { paddingVertical: layout.spacing.xxl, alignItems: 'center' },
  emptyText: { fontStyle: 'italic', textAlign: 'center' },
});
