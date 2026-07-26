import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/tokens';
import { shadow } from '../../../theme/shadows';

export const localStyles = StyleSheet.create({
  calendarPopup: {
    position: 'absolute',
    top: 42,
    right: 0,
    zIndex: 3000,
    borderWidth: 1,
    borderColor: colors.secondaryLightBorder,
    borderRadius: 12,
    padding: 12,
    backgroundColor: colors.white,
    ...shadow.panel(),
    elevation: 5,
    width: 280,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthTitle: {
  },
  arrowBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: colors.slateMid,
  },
  arrowText: {
    lineHeight: 20,
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  weekdayCell: {
    width: '14.28%',
    alignItems: 'center',
  },
  weekdayText: {
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 1,
  },
  dayButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  dayText: {
  },
  dayTextCurrent: {
    color: colors.dark,
  },
  dayTextOther: {
    color: colors.slateStrong,
  },
  daySelected: {
    backgroundColor: colors.accent,
  },
  dayTextSelected: {
    color: colors.white,
  },
  dayHighlight: {
    backgroundColor: colors.dangerBgLight,
    borderRadius: 0,
  },
  dayHighlightText: {
    color: colors.accent,
  },
});
