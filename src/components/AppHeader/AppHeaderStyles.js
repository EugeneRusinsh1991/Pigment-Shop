import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    zIndex: 1000,
  },
  headerDark: {
    backgroundColor: '#0D0D0D',
    borderBottomColor: '#242424',
  },
  headerLight: {
    backgroundColor: '#FAF8F6',
    borderBottomColor: '#f1e8e4',
  },
  leftSec: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexShrink: 0,
  },
  menuBtn: {
    paddingRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBtnText: {
    fontSize: 22,
    lineHeight: 24,
  },
  backBtn: {
    paddingRight: 8,
  },
  backText: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    fontWeight: '500',
  },
  logo: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 22,
    fontWeight: '600',
    color: '#E31B23',
  },
  centerSec: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    flexShrink: 0,
  },
  navLink: {
    paddingVertical: 8,
  },
  navLinkText: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 12,
    fontWeight: '500',
  },
  rightSec: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexShrink: 0,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  langContainer: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 42,
    right: 0,
    width: 140,
    borderRadius: 12,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 9999,
  },
  dropdownDark: {
    backgroundColor: '#161616',
    borderWidth: 1,
    borderColor: '#242424',
  },
  dropdownLight: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#e8edf5',
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  dropdownItemActiveDark: {
    backgroundColor: '#242424',
  },
  dropdownItemActiveLight: {
    backgroundColor: '#FAF8F6',
  },
  dropdownText: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 13,
    fontWeight: '500',
  },
  cartBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDark: {
    backgroundColor: '#FFFFFF',
  },
  badgeLight: {
    backgroundColor: '#1C1C1C',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  badgeTextDark: {
    color: '#1C1C1C',
  },
  badgeTextLight: {
    color: '#FFFFFF',
  },
  textDark: { color: '#FFFFFF' },
  textLight: { color: '#1C1C1C' },
  subtextDark: { color: '#94a3b8' },
  subtextLight: { color: '#475569' },
  adminBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminBtnDark: {
    borderColor: '#334155',
  },
  adminBtnLight: {
    borderColor: '#e2e8f0',
  },
  adminBtnText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: -8,
  },
  logoImage: {
    width: 160,
    height: 36,
  },
  betaBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1.5,
    marginLeft: -8,
  },
  betaBadgeDark: {
    backgroundColor: '#1F1315',
    borderColor: '#451A20',
  },
  betaBadgeLight: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FEE2E2',
  },
  betaText: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 14,
  },
  betaTextDark: {
    color: '#E31B23',
  },
  betaTextLight: {
    color: '#E31B23',
  },
});
