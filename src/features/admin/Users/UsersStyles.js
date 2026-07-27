/**
 * UsersStyles.js
 */
import { StyleSheet } from 'react-native';
import { colors, layout, shadow } from '../../../theme/tokens';

export default StyleSheet.create({
  container: {
    paddingHorizontal: layout.spacing.xl,
    paddingTop: layout.spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.lg,
  },
  title: {
    color: colors.dark,
  },
  countBadge: {
    backgroundColor: colors.warmNeutralLight,
    borderRadius: layout.spacing.sm + 2,
    paddingHorizontal: layout.spacing.sm + 2,
    paddingVertical: layout.spacing.xxs,
  },
  countText: {
    color: colors.secondaryDarkText,
  },
  loading: {
    marginTop: layout.spacing.xxl + 8,
    textAlign: 'center',
    color: colors.secondaryDarkText,
  },

  topRow: {
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: layout.spacing.md,
    marginBottom: layout.spacing.lg,
  },

  tableCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: layout.radii.iconBtn,
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
    ...shadow.card(),
    elevation: 2,
    overflow: 'hidden',
  },

  tableRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.radii.iconBtn,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryLightBorder,
  },
  tableRowAlt: {
    backgroundColor: colors.surfaceElevatedLight,
  },
  rowNum: {
    width: 24,
    color: colors.secondaryDarkText,
    marginRight: layout.spacing.sm,
    marginTop: layout.spacing.xxs,
  },
  userCell: {
    flex: 1,
    minWidth: 120,
  },
  cellText: {
    color: colors.dark,
  },
  userNameBold: {
    color: colors.dark,
  },
  rowChevron: {
    color: colors.slateStrong,
  },
  cellTextMuted: {
    color: colors.slateStrong,
    fontStyle: 'italic',
  },
  colName: { flex: 2, minWidth: 140 },
  colEmail: { flex: 2, minWidth: 160 },
  colPhone: { flex: 1.5, minWidth: 120 },
  colOrders: { flex: 0.8, minWidth: 70, alignItems: 'flex-end' },

  ordersBadge: {
    backgroundColor: colors.secondaryLightBg,
    borderRadius: layout.spacing.sm,
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.xxs,
  },
  ordersBadgeText: {
    color: colors.secondaryLightText,
  },

  /* Details Panel */
  detailsPanel: {
    flex: 1,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.lg,
    gap: layout.spacing.sm,
  },
  backBtnText: {
    color: colors.secondaryLightText,
  },
  clientInfoCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: layout.radii.iconBtn,
    padding: layout.spacing.lg,
    marginBottom: layout.radii.lg,
    ...shadow.card(),
    elevation: 2,
    flexDirection: 'row',
    gap: layout.spacing.xl,
    flexWrap: 'wrap',
  },
  infoGroup: {
    flexDirection: 'column',
    gap: layout.spacing.xxs,
  },
  infoLabel: {
    color: colors.secondaryDarkText,
    textTransform: 'uppercase',
  },
  infoValue: {
    color: colors.dark,
    flexShrink: 1,
  },
  sectionTitle: {
    color: colors.dark,
    marginBottom: layout.spacing.md,
  },
  ordersList: {
    gap: layout.spacing.md,
  },
  noteCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: layout.radii.iconBtn,
    padding: layout.spacing.lg,
    marginBottom: layout.radii.lg,
    ...shadow.card(),
    elevation: 2,
  },
  noteTitle: {
    color: colors.dark,
    marginBottom: layout.spacing.sm + 2,
  },
  noteInput: {
    minHeight: 80,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: layout.spacing.sm,
    paddingHorizontal: layout.spacing.md,
    paddingVertical: layout.spacing.sm + 2,
    color: colors.dark,
    borderWidth: 1,
    borderColor: colors.navItemHoverDark,
    textAlignVertical: 'top',
    outlineStyle: 'none',
    marginBottom: layout.spacing.md,
  },
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  noteSaveBtn: {
    paddingVertical: layout.spacing.sm,
    paddingHorizontal: layout.spacing.lg,
    borderRadius: layout.radii.xs,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSaveBtnDisabled: {
    backgroundColor: colors.slateStrong,
  },
  noteSaveBtnText: {
    color: colors.white,
  },

  /* Mobile card layout */
  mobileCard: {
    paddingHorizontal: layout.spacing.lg,
    paddingVertical: layout.radii.iconBtn,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryLightBorder,
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.md,
  },
  mobileCardAlt: {
    backgroundColor: colors.surfaceElevatedLight,
  },
  mobileCardContent: {
    flex: 1,
  },
  mobileCardName: {
    color: colors.dark,
    marginBottom: layout.spacing.xxs,
  },
  mobileCardMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layout.spacing.xs,
    marginTop: layout.spacing.xxs - 2,
  },
  mobileCardMetaItem: {
    color: colors.slateText,
  },
  mobileCardMetaDot: {
    color: colors.slateStrong,
  },
  mobileCardBadge: {
    backgroundColor: colors.secondaryLightBg,
    borderRadius: layout.spacing.sm,
    paddingHorizontal: layout.spacing.sm,
    paddingVertical: layout.spacing.xxs,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 32,
  },
  mobileCardBadgeText: {
    color: colors.secondaryLightText,
  },
  mobileCardChevron: {
    color: colors.slateStrong,
  },

  /* Added for tokenization */
  backBtnStyle: {
    alignSelf: 'flex-start',
    marginBottom: layout.spacing.lg,
  },
  loadingIndicator: {
    marginVertical: layout.radii.lg,
  },
  loadingIndicatorTop: {
    marginTop: layout.spacing.xxl + 8,
  },
  metaItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.xs,
  },
  colOrdersContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: layout.spacing.xs,
  },
  colOrdersHeader: {
    justifyContent: 'flex-end',
  },
  searchInput: {
    flex: 1,
    height: 44,
  },
});
