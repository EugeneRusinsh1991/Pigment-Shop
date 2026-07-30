import { Platform, StyleSheet } from 'react-native';
import { colors, fonts, layout, shadow } from './tokens';

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
    borderBottomWidth: layout.borderWidth.thin,
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.sm,
  },
  breadcrumbBarDark: {
    backgroundColor: colors.backgroundDark,
    borderBottomColor: colors.borderDark,
  },
  breadcrumbBarLight: {
    backgroundColor: colors.backgroundLight,
    borderBottomColor: colors.borderLight,
  },

  // Hero Section Styles
  heroContainer: {
    paddingHorizontal: layout.spacing.lg,
    paddingTop: layout.spacing.xxs,
    paddingBottom: layout.spacing.lg,
    gap: layout.spacing.lg,
    alignItems: 'center',
  },
  heroRight: {
    width: '100%',
    borderRadius: layout.radii.xl,
    overflow: 'hidden',
  },
  heroRightMobile: {
    height: layout.cardHeights.heroRightMobile,
  },
  heroRightWide: {
    height: layout.cardHeights.heroRightWide,
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
    marginBottom: layout.spacing.sm,
  },
  sectionTitle: {},
  allSectionsLink: {
    color: colors.accent,
  },

  list: {
    paddingBottom: layout.spacing.xxl,
    paddingHorizontal: layout.spacing.none,
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
    top: layout.spacing.none,
    zIndex: layout.zIndices.header,
    width: '100%',
    paddingVertical: layout.spacing.xs,
    alignItems: 'center',
    overflow: 'visible',
  },
  stickySearchContainerDark: {
    backgroundColor: colors.backgroundDark,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.borderDark,
    ...shadow.header(),
  },
  stickySearchContainerLight: {
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.borderLight,
    ...shadow.header(),
  },
  searchInner: {
    width: '100%',
    minWidth: 0,
    overflow: 'visible',
    paddingHorizontal: layout.spacing.sm,
  },
});
