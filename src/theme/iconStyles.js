import { iconTokens } from './tokens';

export const ICON_SIZES = iconTokens.sizes;

export const getIconTextStyle = (color, size, style) => [
  { color, fontSize: typeof size === 'string' && iconTokens.sizes[size] ? iconTokens.sizes[size] : (size ?? iconTokens.sizes.md) },
  style,
];

