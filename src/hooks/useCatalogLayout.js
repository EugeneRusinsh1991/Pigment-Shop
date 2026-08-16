/**
 * useCatalogLayout.js
 *
 * Encapsulates responsive layout calculations for the catalog page.
 * Delegates column/gap resolution to useUnifiedCardGrid so all grids
 * share identical dimension logic.
 */
import { useWindowDimensions } from 'react-native';
import { layout } from '../theme/tokens';
import useUnifiedCardGrid from './useUnifiedCardGrid';
import { SIDEBAR_WIDTH, MAIN_PADDING, getContentGridWidth } from '../utils/layoutUtils';

/**
 * Hook for computing responsive catalog layout dimensions.
 *
 * @returns {{ isNarrow: boolean, gridWidth: number, cols: number, cardWidth: number, gap: number }}
 */
export default function useCatalogLayout() {
  const { width: windowWidth } = useWindowDimensions();
  const isNarrow = windowWidth < layout.breakpoints.desktop;
  const { tier, cols, gap } = useUnifiedCardGrid({ hasFilterSidebar: !isNarrow });

  const contentWidth = getContentGridWidth(windowWidth);
  const gridWidth = isNarrow ? contentWidth : contentWidth - SIDEBAR_WIDTH;

  const availableWidth = isNarrow ? gridWidth : gridWidth - MAIN_PADDING;
  const cardWidth = Math.max(140, Math.floor((availableWidth - gap * 2 * cols) / cols));

  return { isNarrow, tier, gridWidth, cols, cardWidth, gap };
}
