import React from 'react';
import { FlatList, Text, View } from 'react-native';
import PlaceholderCard from './PlaceholderCard';
import { useCatalog } from '../context/CatalogContext';
import styles from '../AppStyles';

export default function NewArrivalsFooter({ isDark, isWide, t, onCardPress }) {
  const cols = isWide ? 4 : 2;
  const { flatList } = useCatalog();
  const newArrivals = flatList.filter((item) => item.isNew);

  return (
    <View style={styles.footerProductsSection}>
      <Text style={[styles.sectionTitle, isDark ? styles.textDark : styles.textLight, styles.footerTitlePadding]}>
        {t.newArrivals}
      </Text>
      <FlatList
        data={newArrivals}
        keyExtractor={(item) => item.id}
        numColumns={cols}
        key={`prod-grid-${cols}`}
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
