import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  rootDark: {
    backgroundColor: '#0D0D0D',
  },
  rootLight: {
    backgroundColor: '#FAF8F6',
  },
  scroll: {
    paddingBottom: 60,
  },
  wideRow: {
    flexDirection: 'row',
    padding: 32,
    gap: 32,
  },
  narrowStack: {
    padding: 16,
  },
  imageArea: {
    height: 380,
    borderRadius: 24,
    overflow: 'hidden',
  },
  imageAreaWide: {
    flex: 1,
    height: 500,
  },
  prodImage: {
    width: '100%',
    height: '100%',
  },
  infoArea: {
    marginTop: 20,
  },
  infoAreaWide: {
    flex: 1,
    marginTop: 0,
  },
  brandText: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E87A8E',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  productName: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 12,
  },
  priceText: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  skuText: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
  },
  stockText: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 24,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 8,
  },
  qtyRowDark: {
    borderColor: '#334155',
  },
  qtyRowLight: {
    borderColor: '#e2e8f0',
  },
  qtyBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: '500',
  },
  qtyVal: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    fontWeight: 'bold',
    minWidth: 30,
    textAlign: 'center',
  },
  cartBtn: {
    backgroundColor: '#1C1C1C',
    borderRadius: 50,
    height: 48,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  goToCartLink: {
    marginTop: 8,
  },
  goToCartText: {
    color: '#E87A8E',
    fontWeight: '600',
    fontSize: 14,
  },
  favBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  favBtnDark: { borderColor: '#333', backgroundColor: '#1C1C1C' },
  favBtnLight: { borderColor: '#e2e8f0', backgroundColor: '#FFFFFF' },
  favIcon: { fontSize: 20 },
  favIconActive: { color: '#E87A8E' },
  favIconInactiveDark: { color: '#FFFFFF' },
  favIconInactiveLight: { color: '#1C1C1C' },
  textDark: { color: '#FFFFFF' },
  textLight: { color: '#1C1C1C' },
  descDark: { color: '#94a3b8' },
  descLight: { color: '#475569' },
});
