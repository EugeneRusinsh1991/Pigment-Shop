import { StyleSheet } from 'react-native';
import { colors } from '../../theme/tokens';

export default StyleSheet.create({


  reviewsSection: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingTop: 12,
    width: '100%',
  },
  reviewsSectionDesktop: {
    width: '50%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  sectionTitle: {
    marginBottom: 6,
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  starDisplay: {
    color: colors.warningMid,
  },
  ratingValueText: {},
  reviewForm: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  formDark: {
    backgroundColor: colors.navSurfaceDark,
    borderColor: colors.secondaryDarkBorder,
  },
  formLight: {
    backgroundColor: colors.white,
    borderColor: colors.secondaryLightBorder,
  },
  formTitle: {
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  inputDark: {
    backgroundColor: colors.productCardDark,
    borderColor: colors.secondaryDarkBorder,
    color: colors.white,
  },
  inputLight: {
    backgroundColor: colors.backgroundLight,
    borderColor: colors.secondaryLightBorder,
    color: colors.black,
  },
  textArea: {
    height: 80,
    paddingTop: 8,
    textAlignVertical: 'top',
  },
  ratingSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingLabel: {
    marginRight: 8,
  },
  activeStar: {
    color: colors.warningMid,
  },
  inactiveStar: {
    color: colors.secondaryDarkText,
  },
  submitBtn: {
    backgroundColor: colors.accent,
    borderRadius: 50,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: colors.white,
  },
  reviewsList: {
    gap: 12,
  },
  reviewCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  reviewCardDark: {
    backgroundColor: colors.surfaceNeutralDark,
    borderColor: colors.borderDarkAlt,
  },
  reviewCardLight: {
    backgroundColor: colors.white,
    borderColor: colors.warmNeutralFaint,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  author: {},
  reviewStars: {
    color: colors.warningMid,
  },
  comment: {
    marginBottom: 4,
  },
  dateText: {
    color: colors.secondaryDarkText,
  },
});
