import { AnimatedButton } from '@/components/Button';
import { Text } from '@/components/Text';
import { View } from 'react-native';
import { calculateHitSlop } from '../../../theme/buttonCommon';
import { typography } from '../../../theme/tokens';
import { localStyles as styles } from './DateRangeCalendarStyles';

const isSameDay = (d1, d2) => {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

const isBetween = (d, start, end) => {
  if (!d || !start || !end) return false;
  const t = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return t >= s && t <= e;
};

function getHighlightedRange(start, end, hover) {
  if (!start) return { s: null, e: null };
  if (end) return { s: start, e: end };
  
  const h = hover || start;
  const isBefore = h < start;
  return {
    s: isBefore ? h : start,
    e: isBefore ? start : h,
  };
}

function checkCellState(cellDate, tempStartDate, tempEndDate, hoverDate) {
  const isSelected = isSameDay(cellDate, tempStartDate) || isSameDay(cellDate, tempEndDate);
  const { s, e } = getHighlightedRange(tempStartDate, tempEndDate, hoverDate);
  const isRange = s && e && !isSameDay(s, e) && isBetween(cellDate, s, e);
  return { isSelected, isRange: !!isRange };
}

function handleHoverEnter(shouldHover, cellDate, setHoverDate) {
  if (shouldHover) {
    setHoverDate(cellDate);
  }
}

function handleHoverLeave(shouldHover, setHoverDate) {
  if (shouldHover) {
    setHoverDate(null);
  }
}

function getHoverEnabled(tempStartDate, tempEndDate) {
  return !!(tempStartDate && !tempEndDate);
}

function getCellTextStyle(isCurrentMonth) {
  return isCurrentMonth ? styles.dayTextCurrent : styles.dayTextOther;
}

function getCellWeight(isSelected, isRange) {
  if (isSelected) return typography.weights.bold;
  if (isRange) return typography.weights.semibold;
  return undefined;
}

function getButtonStyle(isSelected) {
  return [styles.dayButton, isSelected && styles.daySelected];
}

function getTextStyles(currentTextStyle, isSelected, isRange) {
  return [
    styles.dayText,
    currentTextStyle,
    isSelected && styles.dayTextSelected,
    isRange && styles.dayHighlightText,
  ];
}

export function CalendarDayCell({
  cell,
  tempStartDate,
  tempEndDate,
  hoverDate,
  setHoverDate,
  handleDayPress
}) {
  const cellDate = cell.date;
  const { isSelected, isRange } = checkCellState(
    cellDate,
    tempStartDate,
    tempEndDate,
    hoverDate
  );

  const shouldHover = getHoverEnabled(tempStartDate, tempEndDate);
  const currentTextStyle = getCellTextStyle(cell.isCurrentMonth);
  const weight = getCellWeight(isSelected, isRange);

  return (
    <View style={[styles.dayCell, isRange && styles.dayHighlight]}>
      <AnimatedButton
        style={getButtonStyle(isSelected)}
        onPress={() => handleDayPress(cellDate)}
        onMouseEnter={() => handleHoverEnter(shouldHover, cellDate, setHoverDate)}
        onMouseLeave={() => handleHoverLeave(shouldHover, setHoverDate)}
        hitSlop={calculateHitSlop(32, 32)}
      >
        <Text
          variant="body2"
          weight={weight}
          style={getTextStyles(currentTextStyle, isSelected, isRange)}
        >
          {cell.dayLabel}
        </Text>
      </AnimatedButton>
    </View>
  );
}

