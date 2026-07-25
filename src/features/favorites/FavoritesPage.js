// Favorites page component displaying the user's saved items.
import { ScrollView, Text, View } from 'react-native';
import { useFavoritesContext } from '../../context/FavoritesContext';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import useGridLayout from '../../hooks/useGridLayout';
import styles from './FavoritesPageStyles';
import Footer from '../../components/Footer';
import { HeartIcon } from '@/components/Icons';
import PlaceholderCard, { PlaceholderGrid } from '../../components/PlaceholderCard';
import ScrollFadeUp from '../../components/ScrollFadeUp';


function FavoritesEmptyState({ isDark, t }) {
  const ic = (dark, light) => (isDark ? dark : light);
  return (
    <ScrollFadeUp style={styles.emptyState}>
      <HeartIcon color={isDark ? '#6B7280' : '#9CA3AF'} size={48} style={{ marginBottom: 16 }} />
      <Text style={[styles.emptyTitle, ic(styles.textDark, styles.textLight)]}>{t('favoritesEmpty')}</Text>
      <Text style={[styles.emptyDesc, ic(styles.subtextDark, styles.subtextLight)]}>{t('favoritesEmptyDesc')}</Text>
    </ScrollFadeUp>
  );
}

function FavoritesList({ favorites, isDark, onToggleFavorite, cols, isWide }) {
  const favs = {
    isFavorite: () => true,
    toggleFavorite: onToggleFavorite,
  };

  if (!isWide) {
    return (
      <View style={styles.grid}>
        {favorites.map((item) => (
          <PlaceholderCard
            key={item.id}
            item={item}
            isDark={isDark}
            isLeaf={true}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </View>
    );
  }

  return (
    <PlaceholderGrid
      data={favorites}
      cols={cols}
      gridKey="fav-grid"
      isDark={isDark}
      favs={{ isFavorite: () => true, toggleFavorite: favs.toggleFavorite }}
    />
  );
}

export default function FavoritesPage({ isDark }) {
  const { t } = useTheme();
  const { favorites, toggleFavorite } = useFavoritesContext();
  const router = useRouter();
  const { isWide, gridWidth, cols } = useGridLayout();

  const ic = (dark, light) => (isDark ? dark : light);

  return (
    <ScrollView
      style={[styles.container, ic(styles.containerDark, styles.containerLight)]}
      contentContainerStyle={[styles.scrollContent, { paddingBottom: 0 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1 }}>
        <View style={[styles.content, { alignSelf: 'center', width: gridWidth, maxWidth: '100%', paddingBottom: 24 }]}> 
          <ScrollFadeUp>
            <Text style={[styles.title, ic(styles.textDark, styles.textLight)]}>{t('favoritesTitle')}</Text>
          </ScrollFadeUp>

          {favorites.length === 0
            ? <FavoritesEmptyState isDark={isDark} t={t} />
            : <FavoritesList favorites={favorites} isDark={isDark} onToggleFavorite={toggleFavorite} cols={cols} isWide={isWide} />
          }
        </View>
      </View>
      <View style={{ height: 40 }} />
      <Footer />
    </ScrollView>
  );
}
