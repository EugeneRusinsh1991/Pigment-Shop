/**
 * Shared layout utilities for computing content grid dimensions.
 * Used by CatalogView, AppShell, and AppHeader to ensure consistent alignment.
 */

const COLS_MAP = {
  desktop: { depth0: 5, depthRest: 5 },
  tablet: { depth0: 3, depthRest: 3 },
  mobile: { depth0: 2, depthRest: 2 },
};

export const SIDEBAR_WIDTH = 240;
export const CARD_MARGIN = 8;
export const MAIN_PADDING = 32;

const CARD_WIDTH_MAP = {
  depth0: { desktop: 250, tablet: 220, mobile: 165 },
  depthRest: { desktop: 250, tablet: 220, mobile: 165 },
};

const CARD_MARGIN_MAP = {
  desktop: 8,
  tablet: 8,
  mobile: 4,
};

/**
 * Returns the device tier for a given window width.
 * @param {number} windowWidth
 * @returns {'mobile'|'tablet'|'desktop'}
 */
export function getDeviceTier(windowWidth) {
  if (windowWidth >= 1024) return 'desktop';
  if (windowWidth >= 768) return 'tablet';
  return 'mobile';
}

/**
 * Returns the total grid width (px) for the catalog card grid at the given depth.
 * This is the canonical content-area width used for layout alignment across
 * AppShell (header + search) and CatalogView.
 *
 * @param {number} windowWidth - current window width from useWindowDimensions()
 * @param {number} [depth=0]   - catalog depth (0 = root, >0 = subcategory)
 */
export function getContentGridWidth(windowWidth, depth = 0) {
  const device = getDeviceTier(windowWidth);
  const depthKey = depth === 0 ? 'depth0' : 'depthRest';
  const cols = COLS_MAP[device][depthKey];
  const cardWidth = CARD_WIDTH_MAP[depthKey][device];
  const margin = CARD_MARGIN_MAP[device];
  return cols * (cardWidth + margin * 2);
}
