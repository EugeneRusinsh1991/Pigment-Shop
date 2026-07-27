/**
 * useCatalogLayout.js
 *
 * Encapsulates responsive layout calculations for the catalog page.
 * Computes grid columns, card widths, and responsive breakpoints.
 */
import { useWindowDimensions } from 'react-native';
import { layout } from '../theme/tokens';
import { CARD_MARGIN, getContentGridWidth, getGridCols, MAIN_PADDING, SIDEBAR_WIDTH } from '../utils/layoutUtils';

/**
 * Full-width desktop (>=1024px): 4 columns.
 * Tablet (>=768px): 2 columns.
 * Narrow (mobile): 2 columns.
 */
function computeCols(windowWidth) {
  return getGridCols(windowWidth, true);
}

function computeCardWidth(flatListWidth, cols) {
  return Math.max(140, Math.floor((flatListWidth - CARD_MARGIN * 2 * cols) / cols));
}

export default function useCatalogLayout() {
  const { width: windowWidth } = useWindowDimensions();
  const isNarrow = windowWidth < layout.breakpoints.sm;
  const contentWidth = Math.min(windowWidth, layout.maxContentWidth) - layout.spacing.lg;
  const gridWidth = isNarrow
    ? Math.min(windowWidth, getContentGridWidth(windowWidth, 1))
    : contentWidth - SIDEBAR_WIDTH;
  const cols = computeCols(windowWidth);
  const cardWidth = isNarrow ? computeCardWidth(gridWidth, cols) : computeCardWidth(gridWidth - MAIN_PADDING, cols);

  return { isNarrow, gridWidth, cols, cardWidth };
}
