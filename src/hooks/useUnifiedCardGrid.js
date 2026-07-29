/**
 * useUnifiedCardGrid.js
 *
 * Single hook for responsive card-grid dimensions across ALL pages.
 * Variations are limited to `cols` (via hasFilterSidebar) — gap and
 * proportion logic are identical everywhere.
 */
import { useWindowDimensions } from 'react-native';
import { getDeviceTier, GRID_COLS, GRID_COLS_FILTERED, GRID_GAP } from '../utils/layoutUtils';

/**
 * @param {object}  [options]
 * @param {boolean} [options.hasFilterSidebar=false] - pass true on catalog pages with sidebar
 * @returns {{ tier: string, cols: number, gap: number, itemWidthPct: string }}
 */
export default function useUnifiedCardGrid({ hasFilterSidebar = false } = {}) {
  const { width: windowWidth } = useWindowDimensions();
  const tier = getDeviceTier(windowWidth);
  const colsMap = hasFilterSidebar ? GRID_COLS_FILTERED : GRID_COLS;
  const cols = colsMap[tier];
  const gap = GRID_GAP[tier];
  const itemWidthPct = `${(100 / cols).toFixed(4)}%`;

  return { tier, cols, gap, itemWidthPct };
}
