import { StyleSheet } from 'react-native';
import { colors, fonts } from '../theme/tokens';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  containerDark: { backgroundColor: colors.backgroundDark },
  containerLight: { backgroundColor: colors.backgroundLight },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  pageContent: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  emptyTextDark: { color: colors.textMutedDark },
  emptyTextLight: { color: colors.textMutedLight },
  cardSpecific: {
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '500',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusBadge: {
    width: 110,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  statusNewBg: { backgroundColor: colors.infoBgMid },
  statusNewText: { color: colors.infoStrong },
  statusProcessingBg: { backgroundColor: colors.warningBgMid },
  statusProcessingText: { color: colors.warningDark },
  statusCompletedBg: { backgroundColor: colors.successBgMid },
  statusCompletedText: { color: colors.successMid },
  statusCancelledBg: { backgroundColor: colors.dangerBgLight },
  statusCancelledText: { color: colors.danger },
  statusNewDark: { color: colors.infoLight },
  statusNewLight: { color: colors.infoDeep },
  statusProcessingDark: { color: colors.warningMid },
  statusProcessingLight: { color: colors.warningDark },
  statusCompletedDark: { color: colors.successLight },
  statusCompletedLight: { color: colors.successDeep },
  statusCancelledDark: { color: colors.dangerLight },
  statusCancelledLight: { color: colors.dangerMid },
  orderDate: {
    fontSize: 14,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '500',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  toggleTextDark: { color: colors.infoLight },
  toggleTextLight: { color: colors.infoDeep },
  itemsList: {
    marginTop: 12,
    borderRadius: 8,
    padding: 12,
  },
  itemsListDark: {
    backgroundColor: colors.productCardDark,
  },
  itemsListLight: {
    backgroundColor: colors.slateLight,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  itemBorderDark: {
    borderTopWidth: 1,
    borderTopColor: colors.neutralDarkFaint,
  },
  itemBorderLight: {
    borderTopWidth: 1,
    borderTopColor: colors.secondaryLightBorder,
  },
  itemInfo: {
    flex: 1,
    marginRight: 8,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemQtyPrice: {
    fontSize: 12,
    marginTop: 2,
  },
  itemSubtotal: {
    fontSize: 14,
    fontWeight: '600',
  },
  adminCardNew: {
    backgroundColor: colors.infoBgLight,
    borderColor: colors.infoBgMid,
  },
  adminCardProcessing: {
    backgroundColor: colors.warningBgStrong,
    borderColor: colors.warningBgMid,
  },
  adminCardCompleted: {
    backgroundColor: colors.successBgAlt,
    borderColor: colors.successBgMid,
  },
  adminCardCancelled: {
    backgroundColor: colors.dangerSoftLightBg,
    borderColor: colors.dangerBgLight,
  },
  adminCardSpecific: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 6,
    borderRadius: 12,
  },
  adminOrderHeader: {
    marginBottom: 4,
  },
  adminOrderDate: {
    marginBottom: 4,
  },
});
