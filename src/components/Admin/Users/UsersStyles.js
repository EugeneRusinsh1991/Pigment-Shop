/**
 * UsersStyles.js
 */
import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/tokens';
import { shadow } from '../../../theme/shadows';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.dark,
  },
  countBadge: {
    backgroundColor: colors.warmNeutralLight,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondaryDarkText,
  },
  loading: {
    marginTop: 40,
    textAlign: 'center',
    color: colors.secondaryDarkText,
    fontSize: 14,
  },

  topRow: {
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },

  tableCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 14,
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
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryLightBorder,
  },
  tableRowAlt: {
    backgroundColor: colors.surfaceElevatedLight,
  },
  rowNum: {
    width: 24,
    fontSize: 12,
    color: colors.secondaryDarkText,
    marginRight: 8,
    marginTop: 4,
  },
  userCell: {
    flex: 1,
    minWidth: 120,
  },
  cellText: {
    fontSize: 13,
    color: colors.dark,
  },
  userNameBold: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.dark,
  },
  rowChevron: {
    fontSize: 16,
    color: colors.slateStrong,
    fontWeight: '600',
  },
  cellTextMuted: {
    fontSize: 13,
    color: colors.slateStrong,
    fontStyle: 'italic',
  },
  colName: { flex: 2, minWidth: 140 },
  colEmail: { flex: 2, minWidth: 160 },
  colPhone: { flex: 1.5, minWidth: 120 },
  colOrders: { flex: 0.8, minWidth: 70, alignItems: 'flex-end' },

  ordersBadge: {
    backgroundColor: colors.secondaryLightBg,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ordersBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondaryLightText,
  },

  /* Details Panel */
  detailsPanel: {
    flex: 1,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  backBtnText: {
    fontSize: 14,
    color: colors.secondaryLightText,
    fontWeight: '500',
  },
  clientInfoCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    ...shadow.card(),
    elevation: 2,
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap',
  },
  infoGroup: {
    flexDirection: 'column',
    gap: 4,
  },
  infoLabel: {
    fontSize: 10,
    color: colors.secondaryDarkText,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
    color: colors.dark,
    fontWeight: '500',
    flexShrink: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 12,
  },
  ordersList: {
    gap: 12,
  },
  noteCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    ...shadow.card(),
    elevation: 2,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 10,
  },
  noteInput: {
    minHeight: 80,
    backgroundColor: colors.secondaryLightBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: colors.dark,
    borderWidth: 1,
    borderColor: colors.navItemHoverDark,
    textAlignVertical: 'top',
    outlineStyle: 'none',
    marginBottom: 12,
  },
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  noteSaveBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSaveBtnDisabled: {
    backgroundColor: colors.slateStrong,
  },
  noteSaveBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
  },

  /* Mobile card layout */
  mobileCard: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryLightBorder,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mobileCardAlt: {
    backgroundColor: colors.surfaceElevatedLight,
  },
  mobileCardContent: {
    flex: 1,
  },
  mobileCardName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 4,
  },
  mobileCardMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 2,
  },
  mobileCardMetaItem: {
    fontSize: 12,
    color: colors.slateText,
  },
  mobileCardMetaDot: {
    fontSize: 12,
    color: colors.slateStrong,
  },
  mobileCardBadge: {
    backgroundColor: colors.secondaryLightBg,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 32,
  },
  mobileCardBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.secondaryLightText,
  },
  mobileCardChevron: {
    fontSize: 14,
    color: colors.slateStrong,
  },
});
