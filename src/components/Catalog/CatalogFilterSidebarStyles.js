import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  sidebar: { width: 160, maxWidth: 160, flexShrink: 0, flexGrow: 0, flexBasis: 160, overflow: 'hidden' },
  sidebarDark: { backgroundColor: '#0D0D0D' },
  sidebarLight: { backgroundColor: '#FAF8F6' },
  content: { padding: 16, gap: 8 },

  heading: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  sectionTitle: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 4 },

  textDark: { color: '#FFFFFF' },
  textLight: { color: '#1C1C1C' },

  priceColumn: { flexDirection: 'column', gap: 6, marginTop: 6 },
  priceFieldRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  priceFieldLabel: { fontSize: 12, width: 28 },
  priceInput: { width: 80, borderRadius: 8, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4, fontSize: 13 },
  inputDark: { backgroundColor: '#1C1C1C', borderColor: '#333', color: '#FFF' },
  inputLight: { backgroundColor: '#FFF', borderColor: '#e5d8d3', color: '#1C1C1C' },

  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  checkbox: {
    width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: '#E87A8E',
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxActive: { backgroundColor: '#E87A8E' },
  checkMark: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  checkLabel: { fontSize: 13 },

  divider: { height: 1, marginVertical: 8 },
  dividerDark: { backgroundColor: '#242424' },
  dividerLight: { backgroundColor: '#f1e8e4' },

  resetBtn: { marginTop: 4 },
  resetText: { fontSize: 13, fontWeight: '600' },
  accentDark: { color: '#E87A8E' },
  accentLight: { color: '#E87A8E' },
});

export default styles;
