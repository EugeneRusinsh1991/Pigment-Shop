import { StyleSheet } from 'react-native';
import { colors, layout } from '../../theme/tokens';

export const mediaStyles = StyleSheet.create({
  nativeContainer: {
    alignItems: 'center',
    justify: 'center',
    overflow: 'hidden',
  },
  playOverlay: {
    width: 48,
    height: 48,
    borderRadius: layout.radii.xl,
    alignItems: 'center',
    justify: 'center',
    position: 'absolute',
  },
  playTriangle: {
    width: 0,
    height: 0,
    backgroundColor: colors.transparent,
    borderStyle: 'solid',
    borderLeftWidth: 16,
    borderRightWidth: 0,
    borderBottomWidth: 10,
    borderTopWidth: 10,
    borderRightColor: colors.transparent,
    borderBottomColor: colors.transparent,
    borderTopColor: colors.transparent,
    marginLeft: layout.spacing.xxs,
  },
  webMedia: {
    width: '100%',
    height: '100%',
  },
});
