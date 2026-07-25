import { useWindowDimensions } from 'react-native';
import { layout } from '../theme/tokens';

const WIDTH_MAP = {
  depth0: { desktop: 250, tablet: 220, mobile: 165 },
  depthRest: { desktop: 250, tablet: 220, mobile: 165 },
};

const STANDARD_HEIGHTS = { desktop: 340, tablet: 280, mobile: 240 };
const IMG_HEIGHTS = { desktop: 230, tablet: 180, mobile: 135 };

function getDevice(windowWidth) {
  if (windowWidth >= layout.breakpoints.desktop) return 'desktop';
  if (windowWidth >= layout.breakpoints.tablet) return 'tablet';
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
    cardMargin: device === 'mobile' ? 4 : 8,
  };
}
