import { Platform } from 'react-native';
import { colors } from './tokens';

const shadowColor = colors.black;

function makeShadow(web, height, opacity, radius, width = 0) {
  return Platform.select({
    web: { boxShadow: web },
    default: { shadowColor, shadowOffset: { width, height }, shadowOpacity: opacity, shadowRadius: radius },
  });
}

export const shadow = {
  // Minimal — card / list item
  card:          () => makeShadow('0px 2px 8px rgba(0,0,0,0.05)', 2, 0.05, 8),
  // Small — dropdown / popup
  dropdown:      () => makeShadow('0px 2px 4px rgba(0,0,0,0.08)', 2, 0.08, 4),
  // Chip — filter/tag surface
  chip:          () => makeShadow('0px 2px 4px rgba(0,0,0,0.10)', 2, 0.10, 4),
  // Panel — login card / subtle lift
  panel:         () => makeShadow('0px 4px 12px rgba(0,0,0,0.05)', 4, 0.05, 12),
  // Media — browser / overlay card
  media:         () => makeShadow('0px 4px 16px rgba(0,0,0,0.12)', 4, 0.12, 16),
  // Header — app header bar
  header:        () => makeShadow('0px 6px 12px rgba(0,0,0,0.10)', 6, 0.10, 12),
  // Search bar — expanded state
  search:        () => makeShadow('0px 6px 12px rgba(0,0,0,0.18)', 6, 0.18, 12),
  // Modal / form — large lift
  modal:         () => makeShadow('0px 16px 40px rgba(0,0,0,0.15)', 16, 0.15, 40),
  // Drawer — side panel (horizontal)
  drawer:        () => makeShadow('4px 0px 12px rgba(0,0,0,0.25)', 0, 0.25, 12, 4),
  // Thumb — slider handle
  thumb:         () => makeShadow('0px 1px 1.5px rgba(0,0,0,0.20)', 1, 0.20, 1.5),
};
