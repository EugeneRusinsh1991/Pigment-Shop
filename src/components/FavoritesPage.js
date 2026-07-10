import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import ProductCard from './ProductCard';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';

export default function FavoritesPage({ isDark }) {
  const { t } = useTheme();
  const { favorites, toggleFavorite } = useFavoritesContext();
  const { setSelectedProduct, setShowFavorites } = useNavigation();
  const onToggleFavorite = toggleFavorite;
  const onProductPress = (p) => { setSelectedProduct(p); setShowFavorites(false); };
  const { width: windowWidth } = useWindowDimensions();
  const isWide = windowWidth >= 768;
  const ic = (dark, light) => (isDark ? dark : light);

  const cols = isWide ? 4 : 2;
  const cardWidth = 250;
  const gridWidth = cols * (cardWidth + 16);

  return (
    <ScrollView style={[styles.container, ic(styles.containerDark, styles.containerLight)]} showsVerticalScrollIndicator={false}>
      <View style={[styles.content, { alignSelf: 'center', width: gridWidth, maxWidth: '100%' }]}>
        <Text style={[styles.title, ic(styles.textDark, styles.textLight)]}>{t('favoritesTitle')}</Text>

        {favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🤍</Text>
            <Text style={[styles.emptyTitle, ic(styles.textDark, styles.textLight)]}>{t('favoritesEmpty')}</Text>
            <Text style={[styles.emptyDesc, ic(styles.subtextDark, styles.subtextLight)]}>{t('favoritesEmptyDesc')}</Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {favorites.map((product) => (
              <ProductCard
                key={product.id}
                item={product}
                isDark={isDark}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
                onPress={() => onProductPress(product)}
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  containerDark: { backgroundColor: '#0D0D0D' },
  containerLight: { backgroundColor: '#FAF8F6' },
  content: {
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 64,
  },
  title: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 32,
    fontWeight: '500',
    marginBottom: 32,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 300,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  textDark: { color: '#FFFFFF' },
  textLight: { color: '#1C1C1C' },
  subtextDark: { color: '#A0A0A0' },
  subtextLight: { color: '#6B7280' },
});
