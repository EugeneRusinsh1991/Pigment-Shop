import { Platform } from 'react-native';
import { shadows as tokenShadows } from './tokens';

function resolveShadow(tokenShadow) {
  return Platform.select({
    web: tokenShadow.web,
    default: tokenShadow.native,
  });
}

export const shadow = {
  // Minimal — card / list item
  card:          () => resolveShadow(tokenShadows.cardLight),
  // Small — dropdown / popup
  dropdown:      () => resolveShadow(tokenShadows.dropdownLight),
  // Chip — filter/tag surface
  chip:          () => resolveShadow(tokenShadows.chipLight),
  // Panel — login card / subtle lift
  panel:         () => resolveShadow(tokenShadows.panelLight),
  // Media — browser / overlay card
  media:         () => resolveShadow(tokenShadows.mediaLight),
  // Header — app header bar
  header:        () => resolveShadow(tokenShadows.headerLight),
  // Search bar — expanded state
  search:        () => resolveShadow(tokenShadows.searchExpandedLight),
  // Modal / form — large lift
  modal:         () => resolveShadow(tokenShadows.modalLight),
  // Drawer — side panel (horizontal)
  drawer:        () => resolveShadow(tokenShadows.drawerSide),
  // Thumb — slider handle
  thumb:         () => resolveShadow(tokenShadows.thumbLight),
};
