import { useWindowDimensions } from 'react-native';

const WIDTH_MAP = {
  depth0: { desktop: 250, tablet: 340, mobile: 145 },
  depthRest: { desktop: 250, tablet: 160, mobile: 145 },
};

const STANDARD_HEIGHTS = { desktop: 340, tablet: 280, mobile: 220 };
const IMG_HEIGHTS = { desktop: 230, tablet: 180, mobile: 135 };

/**
 * Custom hook to compute layout dimensions for category and product cards.
 * Uses lookup maps to keep cyclomatic and cognitive complexity minimal.
 *
 * @param {number} depth - The nesting depth (0 or 1)
 * @param {boolean} isProduct - Whether the card is a product card
 * @returns {{ cardWidth: number, cardHeight: number, imgContainerHeight: number }}
 */
export default function useCardDimensions(depth, isProduct = false) {
  const { width: windowWidth } = useWindowDimensions();
  
  let device = 'mobile';
  if (windowWidth >= 1024) {
    device = 'desktop';
  } else if (windowWidth >= 768) {
    device = 'tablet';
  }

  const depthKey = depth === 0 ? 'depth0' : 'depthRest';
  const cardWidth = WIDTH_MAP[depthKey][device];

  const cardHeight = (!isProduct && depth === 0)
    ? 380
    : STANDARD_HEIGHTS[device];

  const imgContainerHeight = IMG_HEIGHTS[device];

  return { cardWidth, cardHeight, imgContainerHeight };
}
