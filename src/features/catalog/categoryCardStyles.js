import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme/tokens';

export default StyleSheet.create({
  catCard: {
    flex: 1,
    borderRadius: 20,
    margin: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  catCardDark: {
    backgroundColor: colors.productCardDark,
  },
  catCardLight: {
    backgroundColor: colors.backgroundLight,
  },
  catImage: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  catContent: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
  catLabel: {
    fontFamily: fonts.serif,
    fontSize: 26,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
  },
  catDesc: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.overlayLight,
    lineHeight: 16,
  },
  arrowCircle: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowCircleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  bannerCard: {
    width: '100%',
    marginHorizontal: 0,
    marginVertical: 8,
  },
  bannerContent: {
    bottom: 20,
    left: 20,
    right: 20,
  },
  bannerLabel: {
    fontSize: 22,
    lineHeight: 28,
  },
  bannerDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
});
