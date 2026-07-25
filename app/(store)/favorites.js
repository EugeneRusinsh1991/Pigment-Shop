import React from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import FavoritesPage from '../../src/features/favorites/FavoritesPage';
import PageTransition from '../../src/components/PageTransition';

export default function FavoritesRoute() {
  const { isDark } = useTheme();
  return (
    <PageTransition trigger="favorites">
      <FavoritesPage isDark={isDark} />
    </PageTransition>
  );
}
