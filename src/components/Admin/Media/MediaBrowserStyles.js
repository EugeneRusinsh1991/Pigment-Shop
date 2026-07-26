import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/tokens';
import { shadow } from '../../../theme/shadows';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    width: 600,
    maxWidth: '95%',
    maxHeight: '80%',
    overflow: 'hidden',
    ...shadow.media(),
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.slateMid,
    gap: 8,
  },
  title: {
    flex: 1,
    color: colors.dark,
  },
  refreshBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 7,
    backgroundColor: colors.slateMid,
    borderWidth: 1,
    borderColor: colors.secondaryLightBorder,
  },
  refreshBtnText: {
    color: colors.secondaryLightText,
  },
  closeBtn: {
    color: colors.secondaryDarkText,
    padding: 4,
  },
  outdatedBanner: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    padding: 12,
    borderRadius: 10,
    backgroundColor: colors.warningBgLight,
    borderWidth: 1,
    borderColor: colors.warningLight,
  },
  outdatedBannerTitle: {
    color: colors.warningDeeper,
    marginBottom: 2,
  },
  outdatedBannerText: {
    color: colors.warningDarkAlt,
  },
  outdatedBannerCode: {
    color: colors.warningDeeper,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.slateMid,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.slateMid,
    borderWidth: 1,
    borderColor: colors.secondaryLightBorder,
  },
  tabActive: {
    backgroundColor: colors.dark,
    borderColor: colors.dark,
  },
  tabText: {
    color: colors.secondaryLightText,
  },
  tabTextActive: {
    color: colors.white,
  },
  body: {
    padding: 16,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  itemBtn: {
    width: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
    backgroundColor: colors.slateLight,
  },
  itemBtnSelected: {
    borderColor: colors.dark,
  },
  itemThumb: {
    width: '100%',
    height: 70,
    backgroundColor: colors.secondaryLightBorder,
  },
  itemName: {
    color: colors.secondaryLightText,
    paddingHorizontal: 6,
    paddingVertical: 4,
    numberOfLines: 1,
  },
  videoPlaceholder: {
    width: '100%',
    height: 70,
    backgroundColor: colors.secondaryLightBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoIcon: {},
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.slateMid,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: colors.slateMid,
    borderWidth: 1,
    borderColor: colors.secondaryLightBorder,
  },
  cancelBtnText: {
    color: colors.secondaryLightText,
  },
  selectBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: colors.dark,
  },
  selectBtnText: {
    color: colors.white,
  },
  selectBtnDisabled: {
    backgroundColor: colors.slateStrong,
  },
});
