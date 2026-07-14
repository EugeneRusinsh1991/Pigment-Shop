import { useWindowDimensions } from 'react-native';

const WIDE_BREAKPOINT = 768;

/**
 * Computes grid layout dimensions based on window width.
 * Shared by ProductPage and FavoritesPage.
 */
export default function useGridLayout() {
  const { width: windowWidth } = useWindowDimensions();
  const isWide = windowWidth >= WIDE_BREAKPOINT;

  const cols = isWide ? 4 : 2;
  const cardWidth = isWide ? 250 : 165;
  const cardMargin = isWide ? 8 : 4;
  const gridWidth = cols * (cardWidth + cardMargin * 2);

  return { isWide, cols, cardWidth, cardMargin, gridWidth };
}
