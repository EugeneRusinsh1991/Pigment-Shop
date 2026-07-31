import { StyleSheet } from 'react-native';
import { colors, layout } from '../../theme/tokens';

export default StyleSheet.create({


  reviewsSection: {
    marginTop: layout.spacing.xl,
    paddingHorizontal: layout.spacing.lg,
    paddingTop: layout.spacing.md,
    width: '100%',
  },
  reviewsSectionDesktop: {
    width: '50%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  sectionTitle: {
    marginBottom: layout.spacing.xs,
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.sm,
    marginBottom: layout.spacing.lg,
  },
  starDisplay: {
    color: colors.warningMid,
  },
  ratingValueText: {},
  reviewForm: {
    marginBottom: layout.spacing.lg,
  },
  formDark: {},
  formLight: {},
  formTitle: {
    marginBottom: layout.spacing.sm,
  },
  input: {
    borderRadius: layout.radii.sm,
    borderWidth: layout.borderWidth.thin,
    height: 40,
    paddingHorizontal: layout.spacing.md,
    marginBottom: layout.spacing.sm,
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
    paddingTop: layout.spacing.sm,
    textAlignVertical: 'top',
  },
  ratingSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.md,
  },
  ratingLabel: {
    marginRight: layout.spacing.sm,
  },
  activeStar: {
    color: colors.warningMid,
  },
  inactiveStar: {
    color: colors.secondaryDarkText,
  },
  submitBtn: {
    backgroundColor: colors.accent,
    borderRadius: layout.radii.full,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: colors.white,
  },
  reviewsList: {
    gap: layout.spacing.md,
  },
  reviewCard: {
    borderRadius: layout.radii.sm + 4,
    padding: layout.spacing.lg,
    borderWidth: layout.borderWidth.thin,
  },
  reviewCardDark: {
    backgroundColor: colors.surfaceNeutralDark,
    borderColor: colors.borderDark,
  },
  reviewCardLight: {
    backgroundColor: colors.white,
    borderColor: colors.warmNeutralFaint,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: layout.spacing.xs,
  },
  author: {},
  reviewStars: {
    color: colors.warningMid,
  },
  comment: {
    marginBottom: layout.spacing.xxs,
  },
  dateText: {
    color: colors.secondaryDarkText,
  },
  segmentedToggle: {
    marginBottom: layout.spacing.lg,
  },
  registrationPrompt: {
    alignItems: 'center',
    gap: layout.spacing.md,
  },
  registrationSubmitBtn: {
    paddingHorizontal: layout.spacing.xl,
    alignSelf: 'center',
  },
  reviewFormSubmitBtn: {
    marginTop: layout.spacing.md,
  },
});
