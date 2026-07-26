import { StyleSheet } from 'react-native';
import { colors, layout } from '../../theme/tokens';

export const HIT_SLOP_44 = { top: 10, bottom: 10, left: 10, right: 10 };

export const colorSchemes = {
  sale: {
    container: { backgroundColor: colors.white, borderColor: colors.accent, borderWidth: 1 },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.accent, borderWidth: 1 },
    text: { color: colors.accent, fontWeight: 'bold' },
    textDark: { color: colors.accent, fontWeight: 'bold' },
  },
  new: {
    container: { backgroundColor: colors.accent, borderColor: colors.accent },
    containerDark: { backgroundColor: colors.accent, borderColor: colors.accent },
    text: { color: colors.white, fontWeight: 'bold' },
    textDark: { color: colors.white, fontWeight: 'bold' },
  },
  featured: {
    container: { backgroundColor: colors.accent, borderColor: colors.accent },
    containerDark: { backgroundColor: colors.accent, borderColor: colors.accent },
    text: { color: colors.white, fontWeight: 'bold' },
    textDark: { color: colors.white, fontWeight: 'bold' },
  },
  active: {
    container: { backgroundColor: colors.successBgLight || '#F0FDF4', borderColor: colors.successMid || '#10B981' },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.successLight || '#34D399' },
    text: { color: colors.successDark || '#059669', fontWeight: '600' },
    textDark: { color: colors.successLight || '#34D399', fontWeight: '600' },
  },
  inactive: {
    container: { backgroundColor: colors.secondaryLightBg || '#F5F7FA', borderColor: colors.secondaryLightBorder || '#E2E8F0' },
    containerDark: { backgroundColor: colors.secondaryDarkBg || '#1E293B', borderColor: colors.secondaryDarkBorder || '#334155' },
    text: { color: colors.textMutedLight || '#6B7280', fontWeight: '500' },
    textDark: { color: colors.textMutedDark || '#A0A0A0', fontWeight: '500' },
  },
  completed: {
    container: { backgroundColor: colors.successBgLight || '#F0FDF4', borderColor: colors.successMid || '#10B981' },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.successLight || '#34D399' },
    text: { color: colors.successDark || '#059669', fontWeight: '600' },
    textDark: { color: colors.successLight || '#34D399', fontWeight: '600' },
  },
  pending: {
    container: { backgroundColor: '#FEF3C7', borderColor: '#F59E0B' },
    containerDark: { backgroundColor: '#78350F', borderColor: '#F59E0B' },
    text: { color: '#D97706', fontWeight: '600' },
    textDark: { color: '#FBBF24', fontWeight: '600' },
  },
  cancelled: {
    container: { backgroundColor: colors.dangerBgLight || '#FEE2E2', borderColor: colors.dangerLight || '#F87171' },
    containerDark: { backgroundColor: colors.surfaceDark, borderColor: colors.dangerLight || '#F87171' },
    text: { color: colors.dangerMid || '#DC2626', fontWeight: '600' },
    textDark: { color: colors.dangerLight || '#F87171', fontWeight: '600' },
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
