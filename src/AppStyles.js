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
    paddingTop: layout.spacing.lg,
    paddingBottom: layout.spacing.md,
    flexShrink: 0,
    width: '100%',
    alignSelf: 'stretch',
  },

  breadcrumbBar: {
    borderBottomWidth: 1,
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.sm,
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
    paddingHorizontal: layout.spacing.sm,
    paddingTop: layout.spacing.xxs,
    paddingBottom: layout.spacing.md,
    gap: layout.spacing.md,
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
    paddingHorizontal: layout.spacing.xxl,
    paddingVertical: layout.spacing.md + layout.spacing.xxs,
  },
  heroBtnText: {
    color: colors.white,
  },

  // Category list sections
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.spacing.sm,
    marginTop: layout.spacing.md,
    marginBottom: layout.spacing.xs,
  },
  sectionTitle: {},
  allSectionsLink: {
    color: colors.accent,
  },

  list: {
    paddingBottom: layout.spacing.xxl,
    paddingHorizontal: 0,
  },

  footerProductsSection: {
    marginTop: layout.spacing.sm,
  },
  footerTitlePadding: {
    marginBottom: layout.spacing.md,
    paddingHorizontal: layout.spacing.sm,
  },

  textDark: { color: colors.textDark },
  textLight: { color: colors.textLight },
  descDark: { color: colors.textDescDark },
  descLight: { color: colors.textDescLight },
  stickySearchContainer: {
    ...(Platform.OS === 'web' ? { position: 'sticky' } : { position: 'relative' }),
    top: 0,
    zIndex: layout.zIndices.header,
    width: '100%',
    paddingVertical: layout.spacing.xxs,
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
