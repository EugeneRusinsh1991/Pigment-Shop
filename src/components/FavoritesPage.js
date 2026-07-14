import { ScrollView, Text, View } from 'react-native';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import useGridLayout from '../hooks/useGridLayout';
import styles from './FavoritesPageStyles';
import { HeartIcon } from './Icons';
import ProductCard from './ProductCard';
import SharedLayoutWrapper from './SharedLayoutWrapper';

function FavoritesEmptyState({ isDark, t }) {
  const ic = (dark, light) => (isDark ? dark : light);
  return (
    <View style={styles.emptyState}>
      <HeartIcon color={isDark ? '#6B7280' : '#9CA3AF'} size={48} style={{ marginBottom: 16 }} />
      <Text style={[styles.emptyTitle, ic(styles.textDark, styles.textLight)]}>{t('favoritesEmpty')}</Text>
      <Text style={[styles.emptyDesc, ic(styles.subtextDark, styles.subtextLight)]}>{t('favoritesEmptyDesc')}</Text>
    </View>
  );
}

function FavoritesList({ favorites, isDark, onToggleFavorite, onProductPress }) {
  return (
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
  );
}

export default function FavoritesPage({ isDark }) {
  const { t } = useTheme();
  const { favorites, toggleFavorite } = useFavoritesContext();
  const { setSelectedProduct, setShowFavorites } = useNavigation();
  const { isWide, gridWidth } = useGridLayout();

  const ic = (dark, light) => (isDark ? dark : light);
  const onProductPress = (p) => { setSelectedProduct(p); setShowFavorites(false); };

  return (
    <SharedLayoutWrapper isDark={isDark}>
      <ScrollView
        style={[styles.container, ic(styles.containerDark, styles.containerLight)]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.content, { alignSelf: 'center', width: gridWidth, maxWidth: '100%' }, !isWide && { paddingHorizontal: 8 }]}> 
          <Text style={[styles.title, ic(styles.textDark, styles.textLight)]}>{t('favoritesTitle')}</Text>

          {favorites.length === 0
            ? <FavoritesEmptyState isDark={isDark} t={t} />
            : <FavoritesList favorites={favorites} isDark={isDark} onToggleFavorite={toggleFavorite} onProductPress={onProductPress} />
          }
        </View>
      </ScrollView>
    </SharedLayoutWrapper>
  );
}
