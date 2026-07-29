import { StyleSheet } from 'react-native';
import { buttonTokens, colors, layout } from '../../../theme/tokens';

export const HIT_SLOP_44 = { top: 10, bottom: 10, left: 10, right: 10 };

export const colorSchemes = {
  sale: {
    container: { backgroundColor: colors.dangerSoftLightBg, borderColor: colors.accent, borderWidth: layout.borderWidth.thin },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.accent, borderWidth: layout.borderWidth.thin },
    text: { color: colors.accent },
    textDark: { color: colors.accent },
  },
  new: {
    container: { backgroundColor: colors.infoBgMid, borderColor: colors.infoStrong, borderWidth: layout.borderWidth.thin },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.infoLight, borderWidth: layout.borderWidth.thin },
    text: { color: colors.infoStrong },
    textDark: { color: colors.infoLight },
  },
  featured: {
    container: { backgroundColor: colors.purpleBgLight, borderColor: colors.purpleMid, borderWidth: layout.borderWidth.thin },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.purpleLight, borderWidth: layout.borderWidth.thin },
    text: { color: colors.purpleMid },
    textDark: { color: colors.purpleLight },
  },
  active: {
    container: { backgroundColor: colors.successBgLight, borderColor: colors.successMid, borderWidth: layout.borderWidth.thin },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.successLight, borderWidth: layout.borderWidth.thin },
    text: { color: colors.successDark },
    textDark: { color: colors.successLight },
  },
  inactive: {
    container: { backgroundColor: colors.secondaryLightBg, borderColor: colors.secondaryLightBorder, borderWidth: layout.borderWidth.thin },
    containerDark: { backgroundColor: colors.secondaryDarkBg, borderColor: colors.secondaryDarkBorder, borderWidth: layout.borderWidth.thin },
    text: { color: colors.textMutedLight },
    textDark: { color: colors.textMutedDark },
  },
  completed: {
    container: { backgroundColor: colors.successBgLight, borderColor: colors.successMid, borderWidth: layout.borderWidth.thin },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.successLight, borderWidth: layout.borderWidth.thin },
    text: { color: colors.successDark },
    textDark: { color: colors.successLight },
  },
  pending: {
    container: { backgroundColor: colors.warningBgMid, borderColor: colors.warningStrong, borderWidth: layout.borderWidth.thin },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.warningMid, borderWidth: layout.borderWidth.thin },
    text: { color: colors.warningDark },
    textDark: { color: colors.warningMid },
  },
  cancelled: {
    container: { backgroundColor: colors.dangerBgLight, borderColor: colors.dangerLight, borderWidth: layout.borderWidth.thin },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.dangerLight, borderWidth: layout.borderWidth.thin },
    text: { color: colors.dangerMid },
    textDark: { color: colors.dangerLight },
  },
};

const styles = StyleSheet.create({
  // --- Common Base ---
  baseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },

  // --- Variant: Chip ---
  chipContainer: {
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.xs,
    minHeight: buttonTokens?.sizes?.sm?.height || 32,
    borderRadius: layout.radii.lg,
    borderWidth: layout.borderWidth.focus,
    borderColor: colors.secondaryLightBorder,
    backgroundColor: colors.surfaceLight,
  },
  chipContainerDark: {
    borderColor: colors.chipDarkInactiveBorder,
    backgroundColor: colors.chipDarkInactiveBg,
  },
  chipActive: {
    backgroundColor: colors.textLight,
    borderColor: colors.textLight,
  },
  chipActiveDark: {
    backgroundColor: colors.textDark,
    borderColor: colors.textDark,
  },
  chipText: {
    color: colors.textDescLight,
  },
  chipTextDark: {
    color: colors.textDescDark,
  },
  chipActiveText: {
    color: colors.textDark,
  },
  chipActiveTextDark: {
    color: colors.textLight,
  },

  // --- Variant: Switch ---
  switchTrack: {
    width: 44,
    height: 24,
    borderRadius: layout.radii.md,
    padding: layout.spacing.xxxs,
    backgroundColor: colors.inputBorderLight,
    justifyContent: 'center',
  },
  switchTrackDark: {
    backgroundColor: colors.inputBorderDark,
  },
  switchTrackActive: {
    backgroundColor: colors.accent,
  },
  switchTrackActiveDark: {
    backgroundColor: colors.accent,
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: layout.radii.full,
    backgroundColor: colors.white,
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  switchThumbInactive: {
    alignSelf: 'flex-start',
  },
  switchText: {
    color: colors.textLight,
    marginLeft: layout.spacing.sm,
  },
  switchTextDark: {
    color: colors.textDark,
    marginLeft: layout.spacing.sm,
  },

  // --- Variant: Checkbox ---
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: layout.radii.xs,
    borderWidth: layout.borderWidth.focus,
    borderColor: colors.inputBorderLight,
    backgroundColor: colors.inputBgLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxBoxDark: {
    borderColor: colors.inputBorderDark,
    backgroundColor: colors.inputBgDark,
  },
  checkboxActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  checkboxActiveDark: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  checkboxText: {
    color: colors.textLight,
    marginLeft: layout.spacing.sm,
  },
  checkboxTextDark: {
    color: colors.textDark,
    marginLeft: layout.spacing.sm,
  },

  // --- Utilities ---
  disabledOpacity: {
    opacity: layout.opacity.disabled,
  },
  checkMarkText: {
    color: colors.white,
  },
});

export default styles;
