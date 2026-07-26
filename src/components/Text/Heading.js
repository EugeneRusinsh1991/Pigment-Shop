import React from 'react';
import Text from './Text';

/**
 * Specialized Heading sub-primitive component for titles and section headers.
 * Maps level (1, 2, 3, 4) to corresponding heading variants (h1, h2, h3, h4).
 */
export function Heading({
  level = 2,
  color = 'primary',
  align,
  weight,
  font,
  size,
  lineHeight,
  isDark,
  style,
  children,
  ...rest
}) {
  const variantMap = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
  };

  const variant = variantMap[level] || 'h2';

  return (
    <Text
      variant={variant}
      color={color}
      align={align}
      weight={weight}
      font={font}
      size={size}
      lineHeight={lineHeight}
      isDark={isDark}
      style={style}
      {...rest}
    >
      {children}
    </Text>
  );
}

export default Heading;
