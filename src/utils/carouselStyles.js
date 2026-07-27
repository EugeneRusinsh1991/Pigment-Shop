import globalStyles from '@/theme/appStyles';
import { colors, layout } from '@/theme/tokens';

export function getBreakoutStyle(isWide, windowWidth) {
  if (isWide) return {};
  return { width: windowWidth, alignSelf: 'center', borderRadius: layout.radii.none };
}

export function getCarouselBaseStyle(isWide, windowWidth) {
  const breakoutStyle = getBreakoutStyle(isWide, windowWidth);
  const responsiveStyle = isWide ? globalStyles.heroRightWide : globalStyles.heroRightMobile;
  return [globalStyles.heroRight, responsiveStyle, breakoutStyle];
}

export function getPlaceholderStyle(isWide, isDark, windowWidth) {
  const baseStyle = getCarouselBaseStyle(isWide, windowWidth);
  const backgroundColor = isDark ? colors.borderDarkAlt : colors.borderSlateLight;
  return [baseStyle, { backgroundColor }];
}
