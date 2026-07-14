import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  containerDark: { backgroundColor: '#0D0D0D' },
  containerLight: { backgroundColor: '#FAF8F6' },
  content: {
    padding: isMobile ? 8 : 24,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 32,
    fontWeight: '500',
    marginBottom: 32,
    textAlign: 'center',
  },
  card: {
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
  },
  cardDark: {
    backgroundColor: '#1C1C1C',
    borderColor: '#2A2A2A',
  },
  cardLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
  },
  textDark: { color: '#FFFFFF' },
  textLight: { color: '#1C1C1C' },
  subtextDark: { color: '#A0A0A0' },
  subtextLight: { color: '#6B7280' },
});
