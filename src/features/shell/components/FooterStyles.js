import { Platform, StyleSheet } from 'react-native';
import { colors, layout } from '../../../theme/tokens';

const FooterStyles = StyleSheet.create({
  footer: {
    paddingTop: layout.spacing.md,
    paddingBottom: layout.spacing.md,
    paddingHorizontal: layout.spacing.lg,
    borderTopWidth: layout.borderWidth.none,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerDark: {
    backgroundColor: colors.headerFooterBgDark,
    borderTopColor: colors.borderDark,
  },
  footerLight: {
    backgroundColor: colors.headerFooterBgLight,
    borderTopColor: colors.borderLight,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    columnGap: layout.spacing.sm,
    rowGap: layout.spacing.xxs,
  },
  brandText: {
    color: colors.accent,
  },
  logoImage: {
    width: 80,
    height: 17,
  },
  textDark: {
    color: colors.textDark,
  },
  textLight: {
    color: colors.textLight,
  },
  separator: {
    marginHorizontal: layout.spacing.xxs / 2,
  },
  authorText: {},
  subtextDark: {
    color: colors.textMutedLight,
  },
  subtextLight: {
    color: colors.textSubtleLight,
  },
});

export default FooterStyles;
