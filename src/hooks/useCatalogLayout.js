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
  const { cols, gap } = useUnifiedCardGrid({ hasFilterSidebar: true });
  const isNarrow = windowWidth < layout.breakpoints.sm;

  const contentWidth = Math.min(windowWidth, layout.maxContentWidth) - layout.spacing.lg;
  const gridWidth = isNarrow
    ? Math.min(windowWidth, getContentGridWidth(windowWidth, 1))
    : contentWidth - SIDEBAR_WIDTH;

  const availableWidth = isNarrow ? gridWidth : gridWidth - MAIN_PADDING;
  const cardWidth = Math.max(140, Math.floor((availableWidth - gap * 2 * cols) / cols));

  return { isNarrow, gridWidth, cols, cardWidth, gap };
}
