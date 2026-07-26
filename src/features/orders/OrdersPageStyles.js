import { StyleSheet } from 'react-native';
import { colors } from '@/theme/tokens';

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
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyText: {
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
  orderNumber: {},
  orderStatus: {},
  statusBadge: {
    width: 110,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadgeText: {
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
  orderDate: {},
  orderTotal: {},
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleText: {},
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
  itemLabel: {},
  itemQtyPrice: {
    marginTop: 2,
  },
  itemSubtotal: {},
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
