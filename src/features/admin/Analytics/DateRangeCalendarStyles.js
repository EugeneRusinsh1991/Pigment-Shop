import { StyleSheet } from 'react-native';
import { colors, layout, shadow, typography } from '../../../theme/tokens';

export const localStyles = StyleSheet.create({
  calendarPopup: {
    position: 'absolute',
    top: 42,
    right: 0,
    zIndex: layout.zIndices.toast,
    borderWidth: 1,
    borderColor: colors.secondaryLightBorder,
    borderRadius: layout.spacing.md,
    padding: layout.spacing.md,
    backgroundColor: colors.white,
    ...shadow.panel(),
    elevation: layout.elevation.md,
    width: 280,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: layout.spacing.md,
  },
  monthTitle: {
  },
  arrowBtn: {
    width: layout.spacing.xxl,
    height: layout.spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: layout.radii.xs,
    backgroundColor: colors.slateMid,
  },
  arrowText: {
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: layout.spacing.xs,
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
    height: layout.spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: layout.spacing.none,
  },
  dayButton: {
    width: typography.sizes.xxl,
    height: typography.sizes.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: layout.radii.iconBtn,
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
    borderRadius: layout.radii.none,
  },
  dayHighlightText: {
    color: colors.accent,
  },
});
