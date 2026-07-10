import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  prodCard: {
    flex: 1,
    margin: 8,
    minWidth: 250,
  },
  imageContainer: {
    height: 260,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
  },
  imageContainerDark: {
    backgroundColor: '#1C1C1C',
  },
  imageContainerLight: {
    backgroundColor: '#FAF8F6',
  },
  prodImage: {
    width: '100%',
    height: '100%',
  },
  prodInfo: {
    paddingHorizontal: 4,
  },
  brandText: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#E87A8E',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  prodTitle: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    marginBottom: 4,
  },
  prodTitleDark: {
    color: '#FFFFFF',
  },
  prodTitleLight: {
    color: '#1C1C1C',
  },
  priceText: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 16,
    fontWeight: '600',
  },
  priceTextDark: {
    color: '#FFFFFF',
  },
  priceTextLight: {
    color: '#1C1C1C',
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  newBadge: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountBadge: {
    backgroundColor: '#E87A8E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  originalPriceText: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 12,
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  favBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  favBtnDark: { backgroundColor: 'rgba(28, 28, 28, 0.7)' },
  favBtnLight: { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
  favIcon: { fontSize: 16 },
  favIconActive: { color: '#E87A8E' },
  favIconInactiveDark: { color: '#FFFFFF' },
  favIconInactiveLight: { color: '#1C1C1C' },
});
