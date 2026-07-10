import React from 'react';
import { Text, View } from 'react-native';
import { PlaceholderGrid } from './PlaceholderCard';
import { CountdownTimer } from './FeaturedSections';
import { useCatalog } from '../context/CatalogContext';
import styles from '../AppStyles';

export default function DiscountsSection({ isDark, isWide, t, onCardPress, favs }) {
  const cols = isWide ? 4 : 2;
  const { flatList } = useCatalog();
  const discountedProducts = flatList.filter((item) => item.discountPercent > 0);

  return (
    <View style={styles.footerProductsSection}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginBottom: 16,
      }}>
        <Text style={[styles.sectionTitle, isDark ? styles.textDark : styles.textLight]}>
          {t.discounts}
        </Text>
        <CountdownTimer isDark={isDark} t={t} />
      </View>
      <PlaceholderGrid
        data={discountedProducts}
        cols={cols}
        gridKey="sale-grid"
        isDark={isDark}
        onCardPress={onCardPress}
        favs={favs}
      />
    </View>
  );
}

