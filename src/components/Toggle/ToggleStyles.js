import { StyleSheet } from 'react-native';
import { layout, buttonTokens } from '../../theme/tokens';
import { buttonColors } from '../../theme/buttonCommon';

const TOGGLE_PADDING = 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: TOGGLE_PADDING,
    borderRadius: layout.radii.sm,
    backgroundColor: buttonColors.secondaryLightBg,
    position: 'relative',
  },
  containerDark: {
    backgroundColor: buttonColors.secondaryDarkBg,
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
    backgroundColor: buttonColors.surfaceLight,
    borderRadius: layout.radii.xs,
  },
  activeOptionDark: {
    backgroundColor: buttonColors.surfaceDark,
  },
  activeIndicator: {
    position: 'absolute',
    top: TOGGLE_PADDING,
    bottom: TOGGLE_PADDING,
    left: TOGGLE_PADDING,
    backgroundColor: buttonColors.surfaceLight,
    borderRadius: layout.radii.xs,
    zIndex: 0,
  },
  activeIndicatorDark: {
    backgroundColor: buttonColors.surfaceDark,
  },
  textBase: {
    color: buttonColors.textMutedLight,
  },
  textBaseDark: {
    color: buttonColors.textMutedDark,
  },
  text_sm: {},
  text_md: {},
  activeText: {
    color: buttonColors.textLight,
  },
  activeTextDark: {
    color: buttonColors.textDark,
  },
});

export default styles;
