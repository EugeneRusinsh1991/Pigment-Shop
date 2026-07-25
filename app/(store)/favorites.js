import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import FavoritesPage from '@/features/favorites/FavoritesPage';
import PageTransition from '@/components/PageTransition';

export default function FavoritesRoute() {
  const { isDark } = useTheme();
  return (
    <PageTransition trigger="favorites">
      <FavoritesPage isDark={isDark} />
    </PageTransition>
  );
}
