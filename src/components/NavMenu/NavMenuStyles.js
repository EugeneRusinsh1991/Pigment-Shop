import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    flexDirection: 'row',
  },
  panel: {
    width: 270,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 16,
  },
  panelDark: { backgroundColor: '#0f172a' },
  panelLight: { backgroundColor: '#ffffff' },

  panelHeader: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  panelHeaderDark: { borderBottomColor: '#1e293b' },
  panelHeaderLight: { borderBottomColor: '#e2e8f0' },

  panelTitle: { fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
  textDark: { color: '#f1f5f9' },
  textLight: { color: '#0f172a' },

  closeBtn: { padding: 6 },
  closeIcon: { fontSize: 16, fontWeight: '600' },

  itemList: { flex: 1 },

  utilRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  utilRowDark: { backgroundColor: '#0f172a' },
  utilRowLight: { backgroundColor: '#ffffff' },
  utilIcon: { fontSize: 20, width: 28, textAlign: 'center' },
  utilLabel: { flex: 1, fontSize: 14, fontWeight: '600', marginLeft: 10 },
  accentDark: { color: '#38bdf8' },
  accentLight: { color: '#7c3aed' },

  divider: { height: 1, marginHorizontal: 16, marginVertical: 4 },
  dividerDark: { backgroundColor: '#1e293b' },
  dividerLight: { backgroundColor: '#e2e8f0' },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemRowDark: { backgroundColor: '#0f172a' },
  itemRowLight: { backgroundColor: '#ffffff' },
  itemIcon: { fontSize: 20, width: 28, textAlign: 'center' },
  itemLabel: { flex: 1, fontSize: 14, fontWeight: '500', marginLeft: 10 },
  chevron: { fontSize: 20, fontWeight: '300' },
  mutedDark: { color: '#475569' },
  mutedLight: { color: '#94a3b8' },
});
