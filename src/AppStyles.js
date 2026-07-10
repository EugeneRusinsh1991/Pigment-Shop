import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1 },
  containerDark: { backgroundColor: '#0D0D0D' },
  containerLight: { backgroundColor: '#FAF8F6' },
  
  mainContent: { flex: 1 },

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
    paddingVertical: 48,
    gap: 32,
    alignItems: 'center',
  },
  heroRow: {
    flexDirection: 'row',
  },
  heroStack: {
    flexDirection: 'column',
  },
  heroLeft: {
    flex: 1.2,
    alignItems: 'flex-start',
  },
  heroRight: {
    flex: 0.8,
    width: '100%',
    height: 300,
    borderRadius: 24,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroBadge: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#E87A8E',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  heroTitle: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 44,
    fontWeight: '600',
    lineHeight: 52,
    marginBottom: 16,
  },
  heroSub: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 32,
  },
  heroBtn: {
    backgroundColor: '#1C1C1C',
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
    marginTop: 32,
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
    color: '#E87A8E',
  },

  list: {
    paddingBottom: 48,
    paddingHorizontal: 0,
  },

  footerProductsSection: {
    marginTop: 48,
  },
  footerTitlePadding: {
    marginBottom: 24,
    paddingHorizontal: 8,
  },

  textDark: { color: '#FFFFFF' },
  textLight: { color: '#1C1C1C' },
  descDark: { color: '#94a3b8' },
  descLight: { color: '#475569' },
});
