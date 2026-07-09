import React from 'react';
import { FlatList, Text, View } from 'react-native';
import PlaceholderCard from './PlaceholderCard';
import { CountdownTimer } from './FeaturedSections';
import { useCatalog } from '../context/CatalogContext';
import styles from '../AppStyles';

export default function DiscountsSection({ isDark, isWide, t, onCardPress }) {
  const cols = isWide ? 4 : 2;
  const { flatList } = useCatalog();
  const discountedProducts = flatList.filter((item) => item.discountPercent > 0);

  return (
    <View style={styles.footerProductsSection}>
      <Text style={[styles.sectionTitle, isDark ? styles.textDark : styles.textLight, styles.footerTitlePadding]}>
        {t.discounts}
      </Text>
      <CountdownTimer isDark={isDark} t={t} />
      <FlatList
        data={discountedProducts}
        keyExtractor={(item) => item.id}
        numColumns={cols}
        key={`sale-grid-${cols}`}
        renderItem={({ item }) => (
          <PlaceholderCard
            item={item}
            onPress={() => onCardPress(item)}
            isDark={isDark}
            isLeaf={true}
          />
        )}
        scrollEnabled={false}
      />
    </View>
  );
}
