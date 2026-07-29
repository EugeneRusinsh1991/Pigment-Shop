/**
 * useGridLayout.js
 *
 * Responsive layout hook for non-catalog pages (product detail, orders,
 * profile, cart, favorites). Delegates column / gap resolution to
 * useUnifiedCardGrid so all grids share identical dimension logic.
 *
 * API is kept backward-compatible: consumers can destructure the same
 * { isWide, gridWidth, cols, cardWidth, cardMargin } they always have.
 */
import { useWindowDimensions } from 'react-native';
import { getContentGridWidth } from '../utils/layoutUtils';
import useUnifiedCardGrid from './useUnifiedCardGrid';

export default function useGridLayout() {
  const { width: windowWidth } = useWindowDimensions();
  const { tier, cols, gap } = useUnifiedCardGrid();

  const isWide = tier !== 'mobile';
  const gridWidth = getContentGridWidth(windowWidth);

  // Derived values kept for consumers that still read them
  const cardMargin = gap;
  const cardWidth = Math.max(
    140,
    Math.floor((gridWidth - gap * 2 * cols) / cols)
  );

  return { isWide, cols, cardWidth, cardMargin, gridWidth };
}
