import React from 'react';
import { Text, View } from 'react-native';
import { PlaceholderGrid } from './PlaceholderCard';
import { useCatalog } from '../context/CatalogContext';
import styles from '../AppStyles';

export default function NewArrivalsFooter({ isDark, isWide, t, onCardPress, favs }) {
  const cols = isWide ? 4 : 2;
  const { flatList } = useCatalog();
  const newArrivals = flatList.filter((item) => item.isNew);

  return (
    <View style={styles.footerProductsSection}>
      <Text style={[styles.sectionTitle, isDark ? styles.textDark : styles.textLight, styles.footerTitlePadding]}>
        {t.newArrivals}
      </Text>
      <PlaceholderGrid
        data={newArrivals}
        cols={cols}
        gridKey="prod-grid"
        isDark={isDark}
        onCardPress={onCardPress}
        favs={favs}
      />
    </View>
  );
}

