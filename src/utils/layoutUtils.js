import { layout as layoutTokens } from '../theme/tokens';

/**
 * Shared layout utilities for computing content grid dimensions.
 * Used by CatalogView, AppShell, and AppHeader to ensure consistent alignment.
 */

// ---------------------------------------------------------------------------
// Unified Grid Tokens — single source of truth for ALL card grids
// ---------------------------------------------------------------------------

/** Number of columns per device tier for the standard (no-sidebar) grid. */
export const GRID_COLS = {
  desktop: 5,
  tablet: 3,
  mobile: 2,
};

/** Number of columns per device tier when a filter sidebar is visible. */
export const GRID_COLS_FILTERED = {
  desktop: 4,
  tablet: 2,
  mobile: 2,
};

/** Inter-card gap (px) used uniformly across every grid. */
export const GRID_GAP = {
  desktop: 8,
  tablet: 8,
  mobile: 4,
};

// ---------------------------------------------------------------------------
// Legacy internal maps (kept for backward-compat — prefer GRID_COLS above)
// ---------------------------------------------------------------------------
const COLS_MAP = {
  desktop: { depth0: GRID_COLS.desktop, depthRest: GRID_COLS.desktop },
  tablet:  { depth0: GRID_COLS.tablet,  depthRest: GRID_COLS.tablet  },
  mobile:  { depth0: GRID_COLS.mobile,  depthRest: GRID_COLS.mobile  },
};

const FILTERED_COLS_MAP = { ...GRID_COLS_FILTERED };

/** @deprecated Use GRID_COLS_FILTERED for card grids. Retained for useCatalogLayout sidebar math. */
export const SIDEBAR_WIDTH = 240;
/** @deprecated Retained for useCatalogLayout sidebar math. */
export const MAIN_PADDING = 32;

/**
 * Returns the device tier for a given window width.
 * @param {number} windowWidth
 * @returns {'mobile'|'tablet'|'desktop'}
 */
export function getDeviceTier(windowWidth) {
  if (windowWidth >= layoutTokens.breakpoints.desktop) return 'desktop';
  if (windowWidth >= layoutTokens.breakpoints.mobile) return 'tablet';
  return 'mobile';
}

/**
 * Returns column count for standard or filtered grid.
 * @param {number} windowWidth
 * @param {boolean} [hasFilterSidebar=false]
 * @returns {number}
 */
export function getGridCols(windowWidth, hasFilterSidebar = false) {
  const device = getDeviceTier(windowWidth);
  if (hasFilterSidebar) {
    return FILTERED_COLS_MAP[device];
  }
  return COLS_MAP[device].depth0;
}

/**
 * Returns the total grid width (px) for the catalog card grid at the given depth.
 * This is the canonical content-area width used for layout alignment across
 * AppShell (header + search) and CatalogView.
 *
 * @param {number} windowWidth - current window width from useWindowDimensions()
 * @param {number} [depth=0]   - catalog depth (0 = root, >0 = subcategory)
 * @param {boolean} [hasFilterSidebar=false] - whether active filter sidebar is shown
 */
export function getContentGridWidth(windowWidth, depth = 0, hasFilterSidebar = false) {
  return Math.min(windowWidth, layoutTokens.maxContentWidth);
}
