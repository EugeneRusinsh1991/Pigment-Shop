/**
 * @audit-keep Theme icon size resolver and text style helper
 */
import { iconTokens } from './tokens';

export const ICON_SIZES = iconTokens.sizes;

function resolveIconFontSize(size) {
  if (typeof size === 'string' && iconTokens.sizes[size]) {
    return iconTokens.sizes[size];
  }
  return size ?? iconTokens.sizes.md;
}

export const getIconTextStyle = (color, size, style) => [
  { color, fontSize: resolveIconFontSize(size) },
  style,
];


