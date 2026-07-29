import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useTheme } from '../../../context/ThemeContext';
import { localStyles as styles } from './DateRangeCalendarStyles';
import { CalendarDayCell } from './CalendarDayCell';
import { motion } from '../../../theme/tokens';

function getPrevMonthCells(year, month, firstDayIndex, daysInPrevMonth) {
  const cells = [];
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const date = new Date(year, month - 1, day);
    cells.push({ date, isCurrentMonth: false, dayLabel: day });
  }
  return cells;
}

function getCurrentMonthCells(year, month, daysInMonth) {
  const cells = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    cells.push({ date, isCurrentMonth: true, dayLabel: i });
  }
  return cells;
}

function getNextMonthCells(year, month, remaining) {
  const cells = [];
  for (let i = 1; i <= remaining; i++) {
    const date = new Date(year, month + 1, i);
    cells.push({ date, isCurrentMonth: false, dayLabel: i });
  }
  return cells;
}

function getCalendarCells(year, month) {
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const prevCells = getPrevMonthCells(year, month, firstDayIndex, daysInPrevMonth);
  const currentCells = getCurrentMonthCells(year, month, daysInMonth);
  const nextCells = getNextMonthCells(year, month, 42 - (prevCells.length + currentCells.length));

  return [...prevCells, ...currentCells, ...nextCells];
}

const MONTH_KEYS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const DEFAULT_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function getMonthNames(t) {
  return MONTH_KEYS.map((key, idx) => t(`adminAnalytics${key}`) || DEFAULT_MONTH_NAMES[idx]);
}

export function DateRangeCalendar({
  month,
  year,
  currentMonth,
  navigateMonth,
  tempStartDate,
  tempEndDate,
  hoverDate,
  setHoverDate,
  handleDayPress
}) {
  const { t } = useTheme();
  const cells = getCalendarCells(year, month);
  const monthNames = getMonthNames(t);
  const weekdayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <View style={styles.calendarPopup}>
      <View style={styles.calendarHeader}>
        <TouchableOpacity 
          style={styles.arrowBtn} 
          onPress={() => navigateMonth(-1)}
          activeOpacity={motion.press.activeOpacity}
        >
          <Text style={styles.arrowText}>‹</Text>
        </TouchableOpacity>
        <Text variant="subtitle1" weight="bold" style={styles.monthTitle}>
          {monthNames[month]} {year}
        </Text>
        <TouchableOpacity 
          style={styles.arrowBtn} 
          onPress={() => navigateMonth(1)}
          activeOpacity={motion.press.activeOpacity}
        >
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekdaysRow}>
        {weekdayLabels.map((label, idx) => (
          <View key={idx} style={styles.weekdayCell}>
            <Text variant="caption" weight="semibold" color="secondary" style={styles.weekdayText}>{label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {cells.map((cell, idx) => (
          <CalendarDayCell
            key={idx}
            cell={cell}
            tempStartDate={tempStartDate}
            tempEndDate={tempEndDate}
            hoverDate={hoverDate}
            setHoverDate={setHoverDate}
            handleDayPress={handleDayPress}
          />
        ))}
      </View>
    </View>
  );
}
