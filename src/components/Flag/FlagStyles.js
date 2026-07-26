import { StyleSheet } from 'react-native';
import { colors, layout } from '../../theme/tokens';

export const HIT_SLOP_44 = { top: 10, bottom: 10, left: 10, right: 10 };

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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: layout.radii.full,
    borderWidth: 1,
    borderColor: colors.chipLightInactiveBorder,
    backgroundColor: colors.surfaceLight,
  },
  chipContainerDark: {
    borderColor: colors.chipDarkInactiveBorder,
    backgroundColor: colors.chipDarkInactiveBg,
  },
  chipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  chipActiveDark: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.chipLightInactiveText,
  },
  chipTextDark: {
    color: colors.chipDarkInactiveText,
  },
  chipActiveText: {
    color: colors.white,
    fontWeight: '600',
  },
  chipActiveTextDark: {
    color: colors.white,
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
