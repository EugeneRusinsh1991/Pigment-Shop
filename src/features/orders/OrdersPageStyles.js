import { colors, layout } from '@/theme/tokens';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  containerDark: { backgroundColor: colors.backgroundDark },
  containerLight: { backgroundColor: colors.backgroundLight },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: layout.spacing.none,
  },
  pageContent: {
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.lg,
  },
  title: {
    marginBottom: layout.spacing.lg,
    textAlign: 'center',
  },
  emptyText: {
    marginTop: layout.spacing.md,
    textAlign: 'center',
  },
  emptyTextDark: { color: colors.textMutedDark },
  emptyTextLight: { color: colors.textMutedLight },
  cardSpecific: {
    marginBottom: layout.spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.sm,
  },
  orderNumber: {},
  orderStatus: {},
  statusBadge: {
    width: 110,
    paddingVertical: layout.spacing.xxs,
    paddingHorizontal: layout.spacing.sm,
    borderRadius: layout.radii.md,
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
    marginTop: layout.spacing.md,
    borderRadius: layout.radii.sm,
    padding: layout.spacing.md,
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
    paddingVertical: layout.spacing.xs,
  },
  itemBorderDark: {
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: colors.neutralDarkFaint,
  },
  itemBorderLight: {
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: colors.secondaryLightBorder,
  },
  itemInfo: {
    flex: 1,
    marginRight: layout.spacing.sm,
  },
  itemLabel: {},
  itemQtyPrice: {
    marginTop: layout.elevation.sm,
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
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.lg,
    marginBottom: layout.spacing.xs,
    borderRadius: layout.spacing.md,
  },
  adminOrderHeader: {
    marginBottom: layout.spacing.xxs,
  },
  adminOrderDate: {
    marginBottom: layout.spacing.xxs,
  },
  flexOne: { flex: 1 },
  contentWrapper: { alignSelf: 'center', width: '100%' },
  noteSection: { marginTop: layout.spacing.md, paddingTop: layout.spacing.md },
  noteTitle: { marginBottom: layout.spacing.xxs },
  mobileHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mobileCol: { flex: 1, flexDirection: 'column', gap: layout.spacing.xxs },
  mobileTotal: { marginTop: layout.elevation.sm },
  mobileRight: { alignItems: 'flex-end', gap: layout.spacing.sm },
});
