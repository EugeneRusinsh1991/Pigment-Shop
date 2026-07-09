import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  textDark: { color: '#FFFFFF' },
  textLight: { color: '#1C1C1C' },
  descDark: { color: '#94a3b8' },
  descLight: { color: '#475569' },

  reviewsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    paddingTop: 32,
  },
  reviewsDark: { borderTopColor: '#334155' },
  reviewsLight: { borderTopColor: '#e2e8f0' },
  sectionTitle: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  starDisplay: {
    color: '#FBBF24',
    fontSize: 18,
  },
  ratingValueText: {
    fontSize: 14,
  },
  reviewForm: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  formDark: {
    backgroundColor: '#161616',
    borderColor: '#334155',
  },
  formLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#e2e8f0',
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  inputDark: {
    backgroundColor: '#1E1E1E',
    borderColor: '#334155',
    color: '#FFFFFF',
  },
  inputLight: {
    backgroundColor: '#FAF8F6',
    borderColor: '#e2e8f0',
    color: '#000000',
  },
  textArea: {
    height: 80,
    paddingTop: 8,
    textAlignVertical: 'top',
  },
  ratingSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingLabel: {
    fontSize: 14,
    marginRight: 8,
  },
  activeStar: {
    color: '#FBBF24',
    fontSize: 24,
  },
  inactiveStar: {
    color: '#94a3b8',
    fontSize: 24,
  },
  submitBtn: {
    backgroundColor: '#E87A8E',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  reviewsList: {
    gap: 16,
  },
  reviewCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  reviewCardDark: {
    backgroundColor: '#121212',
    borderColor: '#242424',
  },
  reviewCardLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#f3e1db',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  reviewStars: {
    color: '#FBBF24',
    fontSize: 14,
  },
  comment: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 11,
    color: '#94a3b8',
  },
});
