import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { layout } from '@/theme/tokens';
import CatalogView from '@/features/catalog/CatalogView';
import { PageTransition } from '@/components/ui/Motion';

export default function CatalogCategoryRoute() {
  const { isDark } = useTheme();
  const { width } = useWindowDimensions();
  const { categoryId } = useLocalSearchParams();
  const isWide = width >= layout.breakpoints.mobile;

  return (
    <PageTransition trigger={categoryId}>
      <CatalogView isDark={isDark} isWide={isWide} showNavigation={true} />
    </PageTransition>
  );
}
