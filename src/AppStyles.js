import { Platform, StyleSheet } from 'react-native';

const rootStyles = Platform.OS === 'web' ? { minHeight: '100vh' } : {};

export default StyleSheet.create({
  container: { flex: 1, ...rootStyles },
  containerDark: { backgroundColor: '#0D0D0D' },
  containerLight: { backgroundColor: '#FAF8F6' },
  
  mainContent: { flex: 1, minHeight: 0 },
  mainContentBody: { flex: 1, minHeight: 0 },
  footerContainer: { paddingTop: 16, paddingBottom: 12, flexShrink: 0 },

  breadcrumbBar: {
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  breadcrumbBarDark: {
    backgroundColor: '#0D0D0D',
    borderBottomColor: '#242424',
  },
  breadcrumbBarLight: {
    backgroundColor: '#FAF8F6',
    borderBottomColor: '#f1e8e4',
  },

  // Hero Section Styles
  heroContainer: {
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 24,
    alignItems: 'center',
  },
  heroRight: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  heroRightMobile: {
    height: 180,
  },
  heroRightWide: {
    height: 360,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroBadge: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#E31B23',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  heroBtn: {
    backgroundColor: '#E31B23',
    borderRadius: 50,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  heroBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Category list sections
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 28,
    fontWeight: '600',
  },
  allSectionsLink: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 12,
    fontWeight: '600',
    color: '#E31B23',
  },

  list: {
    paddingBottom: 48,
    paddingHorizontal: 0,
  },

  footerProductsSection: {
    marginTop: 32,
  },
  footerTitlePadding: {
    marginBottom: 24,
    paddingHorizontal: 8,
  },

  textDark: { color: '#FFFFFF' },
  textLight: { color: '#1C1C1C' },
  descDark: { color: '#94a3b8' },
  descLight: { color: '#475569' },
  stickySearchContainer: {
    position: 'sticky',
    top: 0,
    zIndex: 500,
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  stickySearchContainerDark: {
    backgroundColor: '#0D0D0D',
    borderBottomWidth: 1,
    borderBottomColor: '#242424',
  },
  stickySearchContainerLight: {
    backgroundColor: '#FAF8F6',
    borderBottomWidth: 1,
    borderBottomColor: '#f1e8e4',
  },
});
