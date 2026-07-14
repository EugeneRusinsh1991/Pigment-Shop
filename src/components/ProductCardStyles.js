import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  prodCard: {
    flex: 1,
    margin: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  prodCardDark: {
    backgroundColor: '#1E1E1E',
  },
  prodCardLight: {
    backgroundColor: '#F3EEEA',
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
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 12,
  },
  prodInfoDark: {
    backgroundColor: '#1E1E1E',
  },
  prodInfoLight: {
    backgroundColor: '#F3EEEA',
  },
  brandText: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#E31B23',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  prodTitle: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    height: 36,
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
  },
  newBadge: {
    backgroundColor: '#E31B23',
    width: 72,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountBadge: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E31B23',
    borderWidth: 1,
    width: 72,
    paddingVertical: 3,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  discountBadgeText: {
    color: '#E31B23',
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
  favIconActive: { color: '#E31B23' },
  favIconInactiveDark: { color: '#FFFFFF' },
  favIconInactiveLight: { color: '#1C1C1C' },
});
