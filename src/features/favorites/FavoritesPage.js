// Favorites page component displaying the user's saved items.
import { ScrollView, View } from 'react-native';
import { Heading } from '../../components/Text';
import { useFavoritesContext } from '../../context/FavoritesContext';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/tokens';
import useGridLayout from '../../hooks/useGridLayout';
import styles from './FavoritesPageStyles';
import Footer from '../shell/components/Footer';
import { HeartIcon } from '@/components/Icons';
import PlaceholderCard, { PlaceholderGrid } from '../catalog/PlaceholderCard';
import { ScrollFadeUp } from '../../components/Motion';


import { EmptyState } from '../../components/Feedback';

function FavoritesEmptyState({ isDark, t }) {
  return (
    <ScrollFadeUp style={styles.emptyState}>
      <EmptyState
        icon={<HeartIcon color={isDark ? colors.textMutedLight : colors.textSubtleLight} size={48} />}
        title={t('favoritesEmpty')}
        description={t('favoritesEmptyDesc')}
      />
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
      contentContainerStyle={[styles.scrollContent, styles.noPaddingBottom]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.flex1}>
        <View style={[styles.content, styles.contentWrapper, { width: gridWidth }]}> 
          <ScrollFadeUp>
            <Heading level={1} style={styles.title} isDark={isDark}>{t('favoritesTitle')}</Heading>
          </ScrollFadeUp>

          {favorites.length === 0
            ? <FavoritesEmptyState isDark={isDark} t={t} />
            : <FavoritesList favorites={favorites} isDark={isDark} onToggleFavorite={toggleFavorite} cols={cols} isWide={isWide} />
          }
        </View>
      </View>
      <View style={styles.footerSpacer} />
      <Footer />
    </ScrollView>
  );
}
