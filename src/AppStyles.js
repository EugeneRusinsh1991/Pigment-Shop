import { Platform, StyleSheet } from 'react-native';
import { colors, fonts, layout } from './theme/tokens';

const rootStyles = Platform.OS === 'web'
  ? { minHeight: '100vh', overflowX: 'hidden', cursor: 'default' }
  : {};

const webBoxBorder = Platform.OS === 'web' ? { boxSizing: 'border-box' } : {};

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    overflow: 'hidden',
    ...rootStyles,
  },
  containerDark: { backgroundColor: colors.backgroundDark },
  containerLight: { backgroundColor: colors.backgroundLight },

  
  mainContent: {
    flex: 1,
    minHeight: 0,
    width: '100%',
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  mainContentBody: {
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 0,
    width: '100%',
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  footerContainer: {
    paddingTop: 16,
    paddingBottom: 12,
    flexShrink: 0,
    width: '100%',
    alignSelf: 'stretch',
  },

  breadcrumbBar: {
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  breadcrumbBarDark: {
    backgroundColor: colors.backgroundDark,
    borderBottomColor: colors.borderDarkAlt,
  },
  breadcrumbBarLight: {
    backgroundColor: colors.backgroundLight,
    borderBottomColor: colors.borderLightAlt,
  },

  // Hero Section Styles
  heroContainer: {
    paddingHorizontal: 8,
    paddingTop: 4,
    paddingBottom: 12,
    gap: 12,
    alignItems: 'center',
  },
  heroRight: {
    width: '100%',
    borderRadius: layout.radii.xl,
    overflow: 'hidden',
  },
  heroRightMobile: {
    height: 220,
  },
  heroRightWide: {
    height: 360,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroBadge: {
    color: colors.accent,
    textAlign: 'center',
  },
  heroBtn: {
    backgroundColor: colors.accent,
    borderRadius: layout.radii.full,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  heroBtnText: {
    color: colors.white,
  },

  // Category list sections
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 12,
    marginBottom: 6,
  },
  sectionTitle: {},
  allSectionsLink: {
    color: colors.accent,
  },

  list: {
    paddingBottom: 32,
    paddingHorizontal: 0,
  },

  footerProductsSection: {
    marginTop: 8,
  },
  footerTitlePadding: {
    marginBottom: 12,
    paddingHorizontal: 8,
  },

  textDark: { color: colors.textDark },
  textLight: { color: colors.textLight },
  descDark: { color: colors.textDescDark },
  descLight: { color: colors.textDescLight },
  stickySearchContainer: {
    ...(Platform.OS === 'web' ? { position: 'sticky' } : { position: 'relative' }),
    top: 0,
    zIndex: 500,
    width: '100%',
    paddingVertical: 4,
    alignItems: 'center',
    overflow: 'visible',
  },
  stickySearchContainerDark: {
    backgroundColor: colors.backgroundDark,
    borderBottomWidth: 0,
    borderBottomColor: colors.borderDarkAlt,
  },
  stickySearchContainerLight: {
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 0,
    borderBottomColor: colors.borderLightAlt,
  },
});
