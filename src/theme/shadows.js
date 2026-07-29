import { Platform } from 'react-native';

export const shadows = {
  cardLight: {
    web: { boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)' },
    native: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  },
  dropdownLight: {
    web: { boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)' },
    native: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4 },
  },
  chipLight: {
    web: { boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' },
    native: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  },
  panelLight: {
    web: { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)' },
    native: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12 },
  },
  mediaLight: {
    web: { boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)' },
    native: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 16 },
  },
  headerLight: {
    web: { boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)' },
    native: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.1, shadowRadius: 12 },
  },
  searchExpandedLight: {
    web: { boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.18)' },
    native: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.18, shadowRadius: 12 },
  },
  modalLight: {
    web: { boxShadow: '0px 16px 40px rgba(0, 0, 0, 0.15)' },
    native: { shadowColor: '#000', shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.15, shadowRadius: 40 },
  },
  drawerSide: {
    web: { boxShadow: '4px 0px 12px rgba(0, 0, 0, 0.25)' },
    native: { shadowColor: '#000', shadowOffset: { width: 4, height: 0 }, shadowOpacity: 0.25, shadowRadius: 12 },
  },
  thumbLight: {
    web: { boxShadow: '0px 1px 1.5px rgba(0, 0, 0, 0.2)' },
    native: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.5 },
  },
  cardHover: {
    web: { boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.15)' },
    native: { shadowColor: '#000000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 10 },
  },
};

function resolveShadow(tokenShadow) {
  return Platform.select({
    web: tokenShadow.web,
    default: tokenShadow.native,
  });
}

export const shadow = {
  card:     () => resolveShadow(shadows.cardLight),
  dropdown: () => resolveShadow(shadows.dropdownLight),
  chip:     () => resolveShadow(shadows.chipLight),
  panel:    () => resolveShadow(shadows.panelLight),
  media:    () => resolveShadow(shadows.mediaLight),
  header:   () => resolveShadow(shadows.headerLight),
  search:   () => resolveShadow(shadows.searchExpandedLight),
  modal:    () => resolveShadow(shadows.modalLight),
  drawer:   () => resolveShadow(shadows.drawerSide),
  thumb:    () => resolveShadow(shadows.thumbLight),
};
