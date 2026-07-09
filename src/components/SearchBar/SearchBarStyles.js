import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    zIndex: 500,
    borderBottomWidth: 1,
  },
  wrapperDark: { backgroundColor: '#0f172a', borderBottomColor: '#1e293b' },
  wrapperLight: { backgroundColor: '#f8fafc', borderBottomColor: '#e2e8f0' },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 40,
  },
  inputRowDark: { backgroundColor: '#1e293b' },
  inputRowLight: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e2e8f0' },

  searchIcon: { fontSize: 15, marginRight: 8 },

  input: { flex: 1, fontSize: 14, paddingVertical: 0 },
  inputDark: { color: '#f1f5f9' },
  inputLight: { color: '#0f172a' },

  clearBtn: { padding: 4 },
  clearIcon: { fontSize: 13, fontWeight: '600' },
  clearIconDark: { color: '#64748b' },
  clearIconLight: { color: '#94a3b8' },

  dropdown: {
    position: 'absolute',
    top: 56,
    left: 12,
    right: 12,
    borderRadius: 12,
    borderWidth: 1,
    maxHeight: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 12,
    overflow: 'hidden',
    zIndex: 600,
  },
  dropdownDark: { backgroundColor: '#1e293b', borderColor: '#334155' },
  dropdownLight: { backgroundColor: '#ffffff', borderColor: '#e2e8f0' },

  resultScroll: { flexGrow: 0 },

  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  resultRowDark: { backgroundColor: '#1e293b' },
  resultRowLight: { backgroundColor: '#ffffff' },

  resultIcon: { fontSize: 18, width: 26, textAlign: 'center' },
  resultLabel: { flex: 1, fontSize: 13, fontWeight: '500', marginLeft: 10 },
  resultLabelDark: { color: '#f1f5f9' },
  resultLabelLight: { color: '#0f172a' },
  resultChevron: { fontSize: 18, fontWeight: '300' },
  mutedDark: { color: '#475569' },
  mutedLight: { color: '#94a3b8' },

  moreHint: {
    textAlign: 'center',
    fontSize: 12,
    paddingVertical: 8,
    fontStyle: 'italic',
  },
  moreHintDark: { color: '#475569' },
  moreHintLight: { color: '#94a3b8' },
});
