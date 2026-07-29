// Favorites page component displaying the user's saved items.
import { HeartIcon } from '@/components/Icons';
import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { ScrollFadeUp } from '../../components/ui/Motion';
import { Heading } from '../../components/ui/Text';
import { useTheme } from '../../context/ThemeContext';
import useGridLayout from '../../hooks/useGridLayout';
import { colors } from '../../theme/tokens';
import PlaceholderCard, { PlaceholderGrid } from '../catalog/PlaceholderCard';
import Footer from '../shell/components/Footer';
import { useFavoritesContext } from './FavoritesContext';
import styles from './FavoritesPageStyles';


import { EmptyState } from '../../components/ui/Feedback';

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

function FavoritesList({ favorites, isDark, onToggleFavorite, cols, gap, isWide }) {
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
      gap={gap}
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
  const { isWide, gridWidth, cols, cardMargin } = useGridLayout();

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
            : <FavoritesList favorites={favorites} isDark={isDark} onToggleFavorite={toggleFavorite} cols={cols} gap={cardMargin} isWide={isWide} />
          }
        </View>
      </View>
      <View style={styles.footerSpacer} />
      <Footer />
    </ScrollView>
  );
}
