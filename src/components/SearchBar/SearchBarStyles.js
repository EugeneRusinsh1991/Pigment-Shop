import { StyleSheet } from 'react-native';
import { colors, fonts, layout } from '../../theme/tokens';
import { shadow } from '../../theme/shadows';

export default StyleSheet.create({
  wrapper: {
    zIndex: 500,
    position: 'relative',
    borderBottomWidth: 0,
    width: '100%',
    minWidth: 0,
  },
  wrapperActive: {
    zIndex: 10000,
    elevation: 10000,
  },
  wrapperDark: { backgroundColor: 'transparent' },
  wrapperLight: { backgroundColor: 'transparent' },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 0,
    marginVertical: 4,
    paddingHorizontal: 12,
    borderRadius: layout.radii.md,
    height: 40,
    width: '100%',
    overflow: 'hidden',
  },
  inputRowDark: { backgroundColor: colors.inputBgDark },
  inputRowLight: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.secondaryLightBorder },

  searchIcon: { fontSize: 15, marginRight: 8 },

  input: { flex: 1, fontSize: 14, paddingVertical: 0 },
  inputDark: { color: colors.slateMid },
  inputLight: { color: colors.navTextDark },

  clearBtn: { padding: 4 },
  clearIcon: { fontSize: 13, fontWeight: '600' },
  clearIconDark: { color: colors.slateText },
  clearIconLight: { color: colors.secondaryDarkText },

  dropdown: {
    position: 'absolute',
    top: 42,
    left: 0,
    right: 0,
    borderRadius: layout.radii.md,
    borderWidth: 1,
    maxHeight: 280,
    ...shadow.search(),
    elevation: 12,
    overflow: 'hidden',
    zIndex: 600,
    maxWidth: '100%',
  },
  dropdownDark: { backgroundColor: colors.inputBgDark, borderColor: colors.secondaryDarkBorder },
  dropdownLight: { backgroundColor: colors.white, borderColor: colors.secondaryLightBorder },

  resultScroll: { flexGrow: 0 },

  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  resultRowDark: { backgroundColor: colors.inputBgDark },
  resultRowLight: { backgroundColor: colors.white },

  resultIcon: { fontSize: 18, width: 26, textAlign: 'center' },
  resultLabel: { flex: 1, fontSize: 13, fontWeight: '500', marginLeft: 10 },
  resultLabelDark: { color: colors.slateMid },
  resultLabelLight: { color: colors.navTextDark },
  resultChevron: { fontSize: 18, fontWeight: '300' },
  mutedDark: { color: colors.secondaryLightText },
  mutedLight: { color: colors.secondaryDarkText },

  moreHint: {
    textAlign: 'center',
    fontSize: 12,
    paddingVertical: 8,
    fontStyle: 'italic',
  },
  moreHintDark: { color: colors.secondaryLightText },
  moreHintLight: { color: colors.secondaryDarkText },
});
