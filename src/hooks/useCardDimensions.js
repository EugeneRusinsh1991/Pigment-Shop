import { useWindowDimensions } from 'react-native';
import { layout } from '../theme/tokens';
import { GRID_GAP } from '../utils/layoutUtils';

const WIDTH_MAP = {
  depth0: { desktop: 250, tablet: 220, mobile: 165 },
  depthRest: { desktop: 250, tablet: 220, mobile: 165 },
};

const STANDARD_HEIGHTS = layout.cardHeights.grid;
const IMG_HEIGHTS = layout.cardHeights.gridImage;

function getDevice(windowWidth) {
  if (windowWidth >= layout.breakpoints.desktop) return 'desktop';
  if (windowWidth >= layout.breakpoints.mobile) return 'tablet';
  return 'mobile';
}

function getCardHeight(depth, device) {
  return STANDARD_HEIGHTS[device];
}

/**
 * Custom hook to compute layout dimensions for category and product cards.
 * Uses lookup maps to keep cyclomatic and cognitive complexity minimal.
 *
 * @param {number} depth - The nesting depth (0 or 1)
 * @param {boolean} isProduct - Whether the card is a product card
 * @returns {{ cardWidth: number, cardHeight: number, imgContainerHeight: number, cardMargin: number }}
 */
export default function useCardDimensions(depth) {
  const { width: windowWidth } = useWindowDimensions();
  const device = getDevice(windowWidth);
  const depthKey = depth === 0 ? 'depth0' : 'depthRest';

  return {
    cardWidth: WIDTH_MAP[depthKey][device],
    cardHeight: getCardHeight(depth, device),
    imgContainerHeight: IMG_HEIGHTS[device],
    cardMargin: GRID_GAP[device],
  };
}
