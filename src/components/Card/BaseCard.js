import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import useCardDimensions from '../../hooks/useCardDimensions';
import InteractiveCard from './InteractiveCard';
import StaticCard from './StaticCard';

import { layout } from '../../theme/tokens';

/**
 * BaseCard — shared card primitive for layout, shadows, and theme.
 *
 * isDark: consumed from ThemeContext automatically; pass explicitly only
 *         when you need to override the context (e.g. admin always-light views).
 *
 * Dimension props (cardWidth, cardHeight etc.) are not managed here —
 * consumers call useCardDimensions directly and pass useDimensions/depth.
 */
const BaseCard = React.forwardRef(({
  isDark: isDarkProp,
  interactive = false,
  depth = 1,
  useDimensions = false,
  overrideWidth,
  lightBgColor,
  darkBgColor,
  borderColor,
  borderRadius = layout.radii.lg,
  padding,
  children,
  style,
  outerStyle,
  activeOpacity = 0.85,
  ...rest
}, ref) => {
  const { isDark: isDarkContext } = useTheme();
  const isDark = isDarkProp ?? isDarkContext;

  const { cardWidth: hookWidth, cardHeight, cardMargin } = useCardDimensions(depth);
  const cardWidth = useDimensions ? (overrideWidth || hookWidth) : undefined;

  if (interactive) {
    return (
      <InteractiveCard
        ref={ref}
        isDark={isDark}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        cardMargin={cardMargin}
        lightBgColor={lightBgColor}
        darkBgColor={darkBgColor}
        borderRadius={borderRadius}
        padding={padding}
        style={style}
        outerStyle={outerStyle}
        activeOpacity={activeOpacity}
        {...rest}
      >
        {children}
      </InteractiveCard>
    );
  }

  return (
    <StaticCard
      ref={ref}
      isDark={isDark}
      lightBgColor={lightBgColor}
      darkBgColor={darkBgColor}
      borderColor={borderColor}
      borderRadius={borderRadius}
      padding={padding}
      style={style}
      {...rest}
    >
      {children}
    </StaticCard>
  );
});

export default BaseCard;
