import { StyleSheet } from 'react-native';
import { colors, fonts, layout } from '../../theme/tokens';

const badgeSizes = {
  sm: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: layout.radii.xs,
  },
  small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: layout.radii.xs,
  },
  md: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: layout.radii.full,
  },
  medium: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: layout.radii.full,
  },
  lg: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: layout.radii.full,
  },
  large: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: layout.radii.full,
  },
  counter: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    paddingVertical: 0,
    borderRadius: layout.radii.full,
  },
};

const statusColorMap = {
  pending: {
    bgLight: colors.warningBgMid,
    textLight: colors.warningDarkAlt,
    borderLight: colors.warningMid,
    bgDark: colors.warningSoftDarkBg,
    textDark: colors.warningLight,
    borderDark: colors.warningSoftDarkBorder,
  },
  processing: {
    bgLight: colors.infoBgMid,
    textLight: colors.infoDeep,
    borderLight: colors.infoLight,
    bgDark: colors.infoSoftDarkBg,
    textDark: colors.infoLight,
    borderDark: colors.infoSoftDarkBorder,
  },
  completed: {
    bgLight: colors.successBgAlt,
    textLight: colors.successStrong,
    borderLight: colors.successMid,
    bgDark: colors.successSoftDarkBg,
    textDark: colors.successLight,
    borderDark: colors.successSoftDarkBorder,
  },
  cancelled: {
    bgLight: colors.dangerBgLight,
    textLight: colors.dangerStrong,
    borderLight: colors.dangerLight,
    bgDark: colors.dangerSoftDarkBgAlt,
    textDark: colors.dangerLight,
    borderDark: colors.dangerSoftDarkBorderAlt,
  },
  active: {
    bgLight: colors.successBgSoft,
    textLight: colors.successDark,
    borderLight: colors.successMid,
    bgDark: colors.successSoftDarkBg,
    textDark: colors.successLight,
    borderDark: colors.successSoftDarkBorder,
  },
  inactive: {
    bgLight: colors.slateMid,
    textLight: colors.slateText,
    borderLight: colors.borderLight,
    bgDark: colors.surfaceDark,
    textDark: colors.textMutedDark,
    borderDark: colors.borderDark,
  },
  categoryHolder: {
    bgLight: colors.purpleBgLight,
    textLight: colors.purpleDeep,
    borderLight: colors.purpleLight,
    bgDark: colors.purpleSoftDarkBg,
    textDark: colors.purpleLight,
    borderDark: colors.purpleSoftDarkBorder,
  },
  productHolder: {
    bgLight: colors.infoBgLight,
    textLight: colors.infoDeep,
    borderLight: colors.infoLight,
    bgDark: colors.blueSoftDarkBg,
    textDark: colors.infoLight,
    borderDark: colors.blueSoftDarkBorder,
  },
};

const baseBadgeStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  text: {
    textAlign: 'center',
    includeFontPadding: false,
  },
});

function resolveSubtleCustomColors(isDark, customColor) {
  const bg = isDark
    ? (colors[`${customColor}Dark`] || colors.surfaceDark)
    : colors[`${customColor}BgLight`];
  const text = isDark
    ? colors.textDark
    : (colors[`${customColor}Deep`] || colors.textStrongLight);
  return { bg, text, border: 'transparent' };
}

const variantColorResolvers = {
  counter:  () => ({ bg: colors.accent, text: colors.white, border: 'transparent' }),
  discount: () => ({ bg: colors.accent, text: colors.white, border: 'transparent' }),
  new:      () => ({ bg: colors.accent, text: colors.white, border: 'transparent' }),
  product:  () => ({ bg: colors.accent, text: colors.white, border: 'transparent' }),
  featured: () => ({ bg: colors.purpleMid, text: colors.white, border: 'transparent' }),
  status: ({ status, isDark }) => {
    const st = statusColorMap[status] || statusColorMap.pending;
    return {
      bg: isDark ? st.bgDark : st.bgLight,
      text: isDark ? st.textDark : st.textLight,
      border: isDark ? st.borderDark : st.borderLight,
    };
  },
  subtle: ({ isDark, customColor }) => {
    if (!customColor || !colors[`${customColor}BgLight`]) {
      return {
        bg: isDark ? colors.surfaceDark : colors.slateMid,
        text: isDark ? colors.textMutedDark : colors.slateText,
        border: 'transparent',
      };
    }
    return resolveSubtleCustomColors(isDark, customColor);
  },
  chip: ({ selected, isDark }) => {
    if (selected) return { bg: colors.accent, text: colors.white, border: colors.accent };
    return {
      bg: isDark ? colors.chipDarkInactiveBg : colors.surfaceLight,
      text: isDark ? colors.chipDarkInactiveText : colors.chipLightInactiveText,
      border: isDark ? colors.chipDarkInactiveBorder : colors.chipLightInactiveBorder,
    };
  },
  outline: ({ isDark }) => ({
    bg: 'transparent',
    text: isDark ? colors.textDark : colors.textLight,
    border: isDark ? colors.borderDark : colors.borderLight,
  }),
};

export const getBadgeStyle = ({
  variant = 'product',
  status = 'pending',
  size = 'md',
  selected = false,
  isDark = false,
  customColor,
} = {}) => {
  const sizeConfig = badgeSizes[size] || badgeSizes.md;
  const resolver = variantColorResolvers[variant] || variantColorResolvers.product;
  const { bg, text, border } = resolver({ status, isDark, selected, customColor });

  return {
    container: [
      baseBadgeStyles.container,
      {
        backgroundColor: bg,
        borderColor: border,
        paddingHorizontal: sizeConfig.paddingHorizontal,
        paddingVertical: sizeConfig.paddingVertical,
        borderRadius: sizeConfig.borderRadius,
        ...(sizeConfig.minWidth ? { minWidth: sizeConfig.minWidth } : {}),
        ...(sizeConfig.height ? { height: sizeConfig.height } : {}),
      },
    ],
    text: [
      baseBadgeStyles.text,
      {
        color: text,
      },
    ],
  };
};
