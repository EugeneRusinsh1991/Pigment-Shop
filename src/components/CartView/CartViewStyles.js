import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  pageContent: {
    paddingHorizontal: 16,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    justifyContent: 'center',
  },
  inputContainerDark: {
    borderColor: '#333',
    backgroundColor: '#1E1E1E',
  },
  inputContainerLight: {
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  input: {
    fontSize: 15,
    height: '100%',
  },
  requiredNote: {
    fontSize: 12,
    marginTop: 10,
    textAlign: 'left',
  },
  containerDark: { backgroundColor: '#0D0D0D' },
  containerLight: { backgroundColor: '#FAF8F6' },
  
  cartTitle: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 24,
  },

  containerRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 24,
  },
  wideContainer: {
    justifyContent: 'space-between',
  },
  containerCol: {
    flex: 1,
    flexDirection: 'column',
  },
  leftColumn: {
    flex: 1.8,
  },
  rightColumn: {
    flex: 1.2,
  },

  list: { paddingVertical: 12 },

  emptyState: {
    alignItems: 'center',
    paddingTop: 64,
    paddingBottom: 24,
  },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, fontWeight: '500' },
  emptyTextDark: { color: '#64748b' },
  emptyTextLight: { color: '#94a3b8' },

  // Summary Panel
  summaryPanel: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
  },
  summaryPanelDark: { backgroundColor: '#121212', borderColor: '#242424' },
  summaryPanelLight: { backgroundColor: '#ffffff', borderColor: '#e2e8f0' },
  
  summaryPanelMobile: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  summaryPanelWide: {
    marginTop: 6,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  summaryLabel: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
  },
  summaryLabelDark: { color: '#94a3b8' },
  summaryLabelLight: { color: '#64748b' },
  
  summaryValue: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    fontWeight: '600',
  },
  summaryValueDark: { color: '#ffffff' },
  summaryValueLight: { color: '#0f172a' },

  summaryDivider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 12,
    opacity: 0.2,
  },

  totalLabel: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 15,
  },
  totalLabelDark: { color: '#94a3b8' },
  totalLabelLight: { color: '#64748b' },

  totalPrice: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 24,
    fontWeight: '600',
  },
  totalPriceDark: { color: '#ffffff' },
  totalPriceLight: { color: '#1C1C1C' },

  checkoutBtn: {
    borderRadius: 50,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  checkoutBtnDark: {
    backgroundColor: '#F3ECE7',
  },
  checkoutBtnLight: {
    backgroundColor: '#1C1C1C',
  },
  checkoutBtnText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  checkoutBtnTextDark: { color: '#1C1C1C' },
  checkoutBtnTextLight: { color: '#ffffff' },

  textDark: { color: '#ffffff' },
  textLight: { color: '#1c1c1c' },

  noteInput: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    minHeight: 80,
    marginTop: 6,
    marginBottom: 12,
    textAlignVertical: 'top',
  },
  noteInputDark: {
    backgroundColor: '#1C1C1C',
    borderColor: '#334155',
    color: '#ffffff',
  },
  noteInputLight: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    color: '#0f172a',
  },
  noteLabel: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },

  // Footer branding
  footerBranding: {
    alignItems: 'center',
    marginTop: 48,
    paddingVertical: 24,
  },
  footerBrandName: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  footerBrandNameDark: { color: '#ffffff' },
  footerBrandNameLight: { color: '#1c1c1c' },
  footerBrandSub: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  footerBrandSubDark: { color: '#64748b' },
  footerBrandSubLight: { color: '#94a3b8' },
});
