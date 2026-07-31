// Favorites page component displaying the user's saved items.
import { HeartIcon } from '@/components/Icons';
import { View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import useGridLayout from '../../hooks/useGridLayout';
import { colors } from '../../theme/tokens';
import { PlaceholderGrid } from '../catalog/PlaceholderCard';
import AccountLayout from '../profile/components/AccountLayout';
import { useFavoritesContext } from './FavoritesContext';
import { useCatalog } from '../catalog/CatalogContext';
import styles from './FavoritesPageStyles';

import { EmptyState } from '../../components/ui/Feedback';

function FavoritesEmptyState({ isDark, t }) {
  return (
    <View style={styles.emptyState}>
      <EmptyState
        icon={<HeartIcon color={isDark ? colors.textMutedLight : colors.textSubtleLight} size={48} />}
        title={t('favoritesEmpty')}
        description={t('favoritesEmptyDesc')}
      />
    </View>
  );
}

function FavoritesList({ favorites, isDark, onToggleFavorite, cols, gap, loading }) {
  return (
    <PlaceholderGrid
      data={favorites}
      cols={cols}
      gap={gap}
      gridKey="fav-grid"
      isDark={isDark}
      favs={{ isFavorite: () => true, toggleFavorite: onToggleFavorite }}
      loading={loading}
    />
  );
}

export default function FavoritesPage({ isDark }) {
  const { t } = useTheme();
  const { favorites, toggleFavorite } = useFavoritesContext();
  const { cols, cardMargin } = useGridLayout();
  const auth = useAuth();
  const { isLoading } = useCatalog();

  return (
    <AccountLayout title={t('favoritesTitle')} isDark={isDark} auth={auth}>
      {!isLoading && favorites.length === 0
        ? <FavoritesEmptyState isDark={isDark} t={t} />
        : <FavoritesList favorites={favorites} isDark={isDark} onToggleFavorite={toggleFavorite} cols={cols} gap={cardMargin} loading={isLoading} />
      }
    </AccountLayout>
  );
}
