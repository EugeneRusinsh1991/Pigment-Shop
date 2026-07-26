import React from 'react';
import { View } from 'react-native';
import { Text } from '../../Text';
import { AnimatedButton } from '../../Button';
import { calculateHitSlop } from '../../../theme/buttonCommon';
import { localStyles } from './DateRangeCalendarStyles';

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

function getCellStyles(isCurrentMonth, isSelected, isRange) {
  const currentText = isCurrentMonth ? localStyles.dayTextCurrent : localStyles.dayTextOther;
  
  if (isSelected) {
    return {
      cellStyle: [localStyles.dayCell],
      buttonStyle: [localStyles.dayButton, localStyles.daySelected],
      textStyle: [localStyles.dayText, currentText, localStyles.dayTextSelected],
    };
  }
  
  if (isRange) {
    return {
      cellStyle: [localStyles.dayCell, localStyles.dayHighlight],
      buttonStyle: [localStyles.dayButton],
      textStyle: [localStyles.dayText, currentText, localStyles.dayHighlightText],
    };
  }

  return {
    cellStyle: [localStyles.dayCell],
    buttonStyle: [localStyles.dayButton],
    textStyle: [localStyles.dayText, currentText],
  };
}

function checkCellState(cellDate, tempStartDate, tempEndDate, hoverDate) {
  const isSelected = isSameDay(cellDate, tempStartDate) || isSameDay(cellDate, tempEndDate);
  const { s, e } = getHighlightedRange(tempStartDate, tempEndDate, hoverDate);
  const isRange = s && e && !isSameDay(s, e) && isBetween(cellDate, s, e);
  return { isSelected, isRange: !!isRange };
}

const handleHoverEnter = (shouldHover, cellDate, setHoverDate) => {
  if (shouldHover) {
    setHoverDate(cellDate);
  }
};

const handleHoverLeave = (shouldHover, setHoverDate) => {
  if (shouldHover) {
    setHoverDate(null);
  }
};

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

  const { cellStyle, buttonStyle, textStyle } = getCellStyles(
    cell.isCurrentMonth,
    isSelected,
    isRange
  );

  const shouldHover = !!(tempStartDate && !tempEndDate);

  return (
    <View style={cellStyle}>
      <AnimatedButton
        style={buttonStyle}
        onPress={() => handleDayPress(cellDate)}
        onMouseEnter={() => handleHoverEnter(shouldHover, cellDate, setHoverDate)}
        onMouseLeave={() => handleHoverLeave(shouldHover, setHoverDate)}
        hitSlop={calculateHitSlop(32, 32)}
      >
        <Text variant="body2" style={textStyle}>{cell.dayLabel}</Text>
      </AnimatedButton>
    </View>
  );
}

