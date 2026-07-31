import { StyleSheet } from 'react-native';
import { badgeTokens, colors, fonts, layout } from '../../../theme/tokens';

const badgeSizes = {
  sm: {
    paddingHorizontal: layout.spacing.xs,
    paddingVertical: layout.spacing.xxxs,
    borderRadius: layout.radii.xs,
  },
  small: {
    paddingHorizontal: layout.spacing.xs,
    paddingVertical: layout.spacing.xxxs,
    borderRadius: layout.radii.xs,
  },
  md: {
    paddingHorizontal: layout.spacing.sm + layout.spacing.xxxs,
    paddingVertical: layout.spacing.xxs,
    borderRadius: layout.radii.full,
  },
  medium: {
    paddingHorizontal: layout.spacing.sm + layout.spacing.xxxs,
    paddingVertical: layout.spacing.xxs,
    borderRadius: layout.radii.full,
  },
  lg: {
    paddingHorizontal: layout.spacing.md + layout.spacing.xxxs,
    paddingVertical: layout.spacing.xs,
    borderRadius: layout.radii.full,
  },
  large: {
    paddingHorizontal: layout.spacing.md + layout.spacing.xxxs,
    paddingVertical: layout.spacing.xs,
    borderRadius: layout.radii.full,
  },
  counter: {
    minWidth: 16,
    height: 16,
    paddingHorizontal: layout.spacing.xxxs,
    paddingVertical: layout.spacing.none,
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
    bgDark: colors.dangerSoftDarkBg,
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
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.transparent,
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
  return { bg, text, border: colors.transparent };
}

const variantColorResolvers = {
  counter:  () => ({ bg: colors.accent, text: colors.white, border: colors.transparent }),
  discount: () => ({ bg: colors.white, text: colors.accent, border: colors.transparent }),
  new:      () => ({ bg: colors.accent, text: colors.white, border: colors.transparent }),
  product:  () => ({ bg: colors.accent, text: colors.white, border: colors.transparent }),
  featured: () => ({ bg: colors.purpleMid, text: colors.white, border: colors.transparent }),
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
        border: colors.transparent,
      };
    }
    return resolveSubtleCustomColors(isDark, customColor);
  },
  chip: ({ selected, isDark }) => {
    if (selected) return { bg: colors.accent, text: colors.white, border: colors.accent };
    return {
      bg: isDark ? colors.chipDarkInactiveBg : colors.surfaceLight,
      text: isDark ? colors.chipDarkInactiveText : colors.chipLightInactiveText,
      border: isDark ? colors.chipDarkInactiveBorder : colors.borderLight,
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

  const isStatus = variant === 'status';
  const statusWidth = badgeTokens.statusWidth || 115;

  return {
    container: [
      baseBadgeStyles.container,
      {
        backgroundColor: bg,
        borderColor: border,
        paddingHorizontal: sizeConfig.paddingHorizontal,
        paddingVertical: sizeConfig.paddingVertical,
        borderRadius: sizeConfig.borderRadius,
        ...(isStatus ? { width: statusWidth, justifyContent: 'center' } : {}),
        ...(sizeConfig.minWidth && !isStatus ? { minWidth: sizeConfig.minWidth } : {}),
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

// baseBadgeStyles is used locally
