/**
 * AdminPanelStyles.js
 */
import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../theme/tokens';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.warmNeutralLight,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: colors.surfaceLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLightAlt,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerBackBtn: {
    padding: 6,
  },
  headerBackText: {
    fontSize: 20,
    color: colors.dark,
  },
  headerTitle: {
    fontFamily: fonts.serif,
    fontSize: 20,
    fontWeight: '600',
    color: colors.dark,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.secondaryLightText,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLightAlt,
    paddingHorizontal: 24,
  },
  tab: {
    paddingVertical: 14,
    paddingHorizontal: 4,
    marginRight: 28,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.accent,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.secondaryDarkText,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabTextActive: {
    color: colors.dark,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
});
