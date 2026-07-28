import { StyleSheet } from 'react-native';
import { layout, buttonTokens, colors } from '../../theme/tokens';

const TOGGLE_PADDING = 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: TOGGLE_PADDING,
    borderRadius: layout.radii.sm,
    backgroundColor: colors.secondaryLightBg,
    position: 'relative',
  },
  containerDark: {
    backgroundColor: colors.secondaryDarkBg,
  },
  sm: {
    height: buttonTokens.sizes.sm.height,
    borderRadius: layout.radii.xs,
  },
  md: {
    height: buttonTokens.sizes.md.height,
    borderRadius: layout.radii.sm,
  },
  option: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: buttonTokens.sizes.sm.paddingHorizontal,
    borderRadius: layout.radii.xs,
    zIndex: 1,
  },
  activeOption: {
    backgroundColor: colors.surfaceLight,
    borderRadius: layout.radii.xs,
  },
  activeOptionDark: {
    backgroundColor: colors.surfaceDark,
  },
  activeIndicator: {
    position: 'absolute',
    top: TOGGLE_PADDING,
    bottom: TOGGLE_PADDING,
    left: TOGGLE_PADDING,
    backgroundColor: colors.surfaceLight,
    borderRadius: layout.radii.xs,
    zIndex: 0,
  },
  activeIndicatorDark: {
    backgroundColor: colors.surfaceDark,
  },
  textBase: {
    color: colors.textMutedLight,
  },
  textBaseDark: {
    color: colors.textMutedDark,
  },
  text_sm: {},
  text_md: {},
  activeText: {
    color: colors.textLight,
  },
  activeTextDark: {
    color: colors.textDark,
  },
});

export default styles;
