import { StyleSheet } from 'react-native';
import { colors, layout, buttonTokens } from '../../theme/tokens';

export const HIT_SLOP_44 = { top: 10, bottom: 10, left: 10, right: 10 };

export const colorSchemes = {
  sale: {
    container: { backgroundColor: colors.dangerSoftLightBg, borderColor: colors.accent, borderWidth: 1 },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.accent, borderWidth: 1 },
    text: { color: colors.accent, fontWeight: '700' },
    textDark: { color: colors.accent, fontWeight: '700' },
  },
  new: {
    container: { backgroundColor: colors.infoBgMid, borderColor: colors.infoStrong, borderWidth: 1 },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.infoLight, borderWidth: 1 },
    text: { color: colors.infoStrong, fontWeight: '600' },
    textDark: { color: colors.infoLight, fontWeight: '600' },
  },
  featured: {
    container: { backgroundColor: colors.purpleBgLight, borderColor: colors.purpleMid, borderWidth: 1 },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.purpleLight, borderWidth: 1 },
    text: { color: colors.purpleMid, fontWeight: '600' },
    textDark: { color: colors.purpleLight, fontWeight: '600' },
  },
  active: {
    container: { backgroundColor: colors.successBgLight, borderColor: colors.successMid, borderWidth: 1 },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.successLight, borderWidth: 1 },
    text: { color: colors.successDark, fontWeight: '600' },
    textDark: { color: colors.successLight, fontWeight: '600' },
  },
  inactive: {
    container: { backgroundColor: colors.secondaryLightBg, borderColor: colors.secondaryLightBorder, borderWidth: 1 },
    containerDark: { backgroundColor: colors.secondaryDarkBg, borderColor: colors.secondaryDarkBorder, borderWidth: 1 },
    text: { color: colors.textMutedLight, fontWeight: '500' },
    textDark: { color: colors.textMutedDark, fontWeight: '500' },
  },
  completed: {
    container: { backgroundColor: colors.successBgLight, borderColor: colors.successMid, borderWidth: 1 },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.successLight, borderWidth: 1 },
    text: { color: colors.successDark, fontWeight: '600' },
    textDark: { color: colors.successLight, fontWeight: '600' },
  },
  pending: {
    container: { backgroundColor: colors.warningBgMid, borderColor: colors.warningStrong, borderWidth: 1 },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.warningMid, borderWidth: 1 },
    text: { color: colors.warningDark, fontWeight: '600' },
    textDark: { color: colors.warningMid, fontWeight: '600' },
  },
  cancelled: {
    container: { backgroundColor: colors.dangerBgLight, borderColor: colors.dangerLight, borderWidth: 1 },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.dangerLight, borderWidth: 1 },
    text: { color: colors.dangerMid, fontWeight: '600' },
    textDark: { color: colors.dangerLight, fontWeight: '600' },
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
    paddingHorizontal: 14,
    paddingVertical: 6,
    minHeight: buttonTokens?.sizes?.sm?.height || 32,
    borderRadius: 20,
    borderWidth: 1.5,
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
    fontSize: 13,
    fontWeight: '500',
    color: colors.textDescLight,
  },
  chipTextDark: {
    color: colors.textDescDark,
  },
  chipActiveText: {
    color: colors.textDark,
    fontWeight: '600',
  },
  chipActiveTextDark: {
    color: colors.textLight,
    fontWeight: '600',
  },

  // --- Variant: Switch ---
  switchTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
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
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  switchThumbInactive: {
    alignSelf: 'flex-start',
  },
  switchText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textLight,
    marginLeft: 8,
  },
  switchTextDark: {
    color: colors.textDark,
    marginLeft: 8,
  },

  // --- Variant: Checkbox ---
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: layout.radii.xs,
    borderWidth: 1.5,
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
    fontSize: 14,
    fontWeight: '400',
    color: colors.textLight,
    marginLeft: 8,
  },
  checkboxTextDark: {
    color: colors.textDark,
    marginLeft: 8,
  },
});

export default styles;
