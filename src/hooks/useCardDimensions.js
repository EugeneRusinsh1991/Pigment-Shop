import { useWindowDimensions } from 'react-native';

const WIDTH_MAP = {
  depth0: { desktop: 250, tablet: 340, mobile: 165 },
  depthRest: { desktop: 250, tablet: 160, mobile: 165 },
};

const STANDARD_HEIGHTS = { desktop: 340, tablet: 280, mobile: 240 };
const IMG_HEIGHTS = { desktop: 230, tablet: 180, mobile: 135 };

function getDevice(windowWidth) {
  if (windowWidth >= 1024) return 'desktop';
  if (windowWidth >= 768) return 'tablet';
  return 'mobile';
}

function getCardHeight(isProduct, depth, device) {
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
export default function useCardDimensions(depth, isProduct = false) {
  const { width: windowWidth } = useWindowDimensions();
  const device = getDevice(windowWidth);
  const depthKey = depth === 0 ? 'depth0' : 'depthRest';

  return {
    cardWidth: WIDTH_MAP[depthKey][device],
    cardHeight: getCardHeight(isProduct, depth, device),
    imgContainerHeight: IMG_HEIGHTS[device],
    cardMargin: device === 'mobile' ? 4 : 8,
  };
}
