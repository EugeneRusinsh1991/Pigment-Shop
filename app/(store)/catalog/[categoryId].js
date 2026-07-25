import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../../src/context/ThemeContext';
import CatalogView from '../../../src/components/CatalogView';
import PageTransition from '../../../src/components/PageTransition';

export default function CatalogCategoryRoute() {
  const { isDark } = useTheme();
  const { width } = useWindowDimensions();
  const { categoryId } = useLocalSearchParams();
  const isWide = width >= 768;

  return (
    <PageTransition trigger={categoryId}>
      <CatalogView isDark={isDark} isWide={isWide} showNavigation={true} />
    </PageTransition>
  );
}
