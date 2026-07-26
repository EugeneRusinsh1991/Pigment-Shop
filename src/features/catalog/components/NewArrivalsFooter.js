import React, { useMemo } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Text, Heading } from '@/components/Text';
import { PlaceholderGrid } from '@/features/catalog/PlaceholderCard';
import { useCatalog } from '@/context/CatalogContext';
import { getDeviceTier } from '@/utils/layout';
import { useRouter } from 'expo-router';
import styles from '@/AppStyles';
import { ScrollFadeUp } from '@/components/Motion';

function getColsAndLimit(tier) {
  if (tier === 'desktop') {
    return { cols: 5, limit: 4 };
  }
  if (tier === 'tablet') {
    return { cols: 3, limit: 5 };
  }
  return { cols: 2, limit: 5 };
}

function getDisplayData(newArrivals, limit, viewAllNewText, onNavPress) {
  const showNav = newArrivals.length > limit;
  if (!showNav) {
    return newArrivals;
  }
  return [
    ...newArrivals.slice(0, limit),
    {
      id: 'nav-card-new',
      isNavigationCard: true,
      type: 'new',
      text: viewAllNewText,
      href: onNavPress,
    },
  ];
}

function EmptyArrivalsMessage({ isDark, text }) {
  return (
    <View style={{ paddingVertical: 32, alignItems: 'center' }}>
      <Text variant="body" color="muted" style={{ fontStyle: 'italic', textAlign: 'center' }}>
        {text}
      </Text>
    </View>
  );
}

export default function NewArrivalsFooter({ isDark, isWide, t, onCardPress, favs }) {
  const { width: windowWidth } = useWindowDimensions();
  const router = useRouter();
  const { cols, limit } = getColsAndLimit(getDeviceTier(windowWidth));
  const { flatList } = useCatalog();
  
  const newArrivals = useMemo(() => flatList.filter((item) => item.isNew), [flatList]);

  const displayData = useMemo(() => {
    const navHref = { pathname: '/products', params: { isNew: 'true' } };
    return getDisplayData(newArrivals, limit, t.viewAllNew, navHref);
  }, [newArrivals, limit, t.viewAllNew]);

  return (
    <View style={styles.footerProductsSection}>
      <ScrollFadeUp>
        <Heading level={2} style={[styles.sectionTitle, styles.footerTitlePadding]} isDark={isDark}>
          {t.newArrivals}
        </Heading>
      </ScrollFadeUp>
      {newArrivals.length === 0 ? (
        <EmptyArrivalsMessage isDark={isDark} text={t.emptyNewArrivals} />
      ) : (
        <PlaceholderGrid
          data={displayData}
          cols={cols}
          gridKey="prod-grid"
          isDark={isDark}
          onCardPress={onCardPress}
          favs={favs}
        />
      )}
    </View>
  );
}

