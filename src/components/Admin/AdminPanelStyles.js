/**
 * AdminPanelStyles.js
 */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1EE',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1E8E4',
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
    color: '#1C1C1C',
  },
  headerTitle: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1C',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1E8E4',
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
    borderBottomColor: '#E87A8E',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94a3b8',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabTextActive: {
    color: '#1C1C1C',
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
});
