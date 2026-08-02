import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import styles from './AnalyticsStyles';
import { useLanguage } from '../../../context/LanguageContext';
import { formatDateCompact as formatCompactDate } from '../../../utils/dateFormatting';
import { DateRangeCalendar } from './DateRangeCalendar';
import Toggle from '@/components/ui/Toggle';
import { layout } from '../../../theme/tokens';

function calculatePresetDateRange(preset) {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  
  let start = new Date();
  start.setHours(0, 0, 0, 0);

  if (preset === '7days') {
    start.setDate(end.getDate() - 6);
  } else if (preset === '30days') {
    start.setDate(end.getDate() - 29);
  } else if (preset === 'month') {
    start.setDate(1);
  }
  return { start, end };
}

export default function DateRangePicker({ startDate, endDate, mode: modeProp, onChange }) {
  const { t } = useLanguage();

  const [mode, setMode] = useState(modeProp || '7days'); // '7days', '30days', 'custom'
  
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (modeProp) {
      setMode(modeProp);
    }
  }, [modeProp]);

  useEffect(() => {
    if (startDate) {
      setTempStartDate(startDate);
      setCurrentMonth(new Date(startDate.getFullYear(), startDate.getMonth(), 1));
    }
    if (endDate) {
      setTempEndDate(endDate);
    }
  }, [startDate, endDate]);

  const handlePresetSelect = (preset) => {
    if (preset !== 'custom') {
      setMode(preset);
      setIsCalendarOpen(false);
      const { start, end } = calculatePresetDateRange(preset);
      onChange(start, end, preset);
    } else {
      if (mode === 'custom') {
        setIsCalendarOpen(!isCalendarOpen);
      } else {
        setMode('custom');
        setIsCalendarOpen(true);
      }
    }
  };

  const handleDayPress = (date) => {
    if (!tempStartDate || (tempStartDate && tempEndDate)) {
      setTempStartDate(date);
      setTempEndDate(null);
      setHoverDate(null);
    } else {
      let start = tempStartDate;
      let end = date;
      if (end < start) {
        const temp = start;
        start = end;
        end = temp;
      }
      
      const s = new Date(start);
      s.setHours(0, 0, 0, 0);
      const e = new Date(end);
      e.setHours(23, 59, 59, 999);
      
      setTempStartDate(s);
      setTempEndDate(e);
      setHoverDate(null);
    }
  };

  const handleApply = () => {
    if (!tempStartDate) {
      setIsCalendarOpen(false);
      return;
    }
    let start = tempStartDate;
    let end = tempEndDate || tempStartDate;
    if (end < start) {
      const temp = start;
      start = end;
      end = temp;
    }

    const s = new Date(start);
    s.setHours(0, 0, 0, 0);
    const e = new Date(end);
    e.setHours(23, 59, 59, 999);

    setTempStartDate(s);
    setTempEndDate(e);
    setMode('custom');
    setIsCalendarOpen(false);
    onChange(s, e, 'custom');
  };

  const navigateMonth = (direction) => {
    const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1);
    setCurrentMonth(next);
  };

  const getCustomButtonLabel = () => {
    if (mode === 'custom' && startDate && endDate) {
      return `${formatCompactDate(startDate)} – ${formatCompactDate(endDate)}`;
    }
    return t('adminAnalyticsDateCustom') || 'Custom';
  };

  const options = useMemo(
    () => [
      { value: '7days', label: t('adminAnalyticsDateLast7') },
      { value: '30days', label: t('adminAnalyticsDateLast30') },
      { value: 'custom', label: getCustomButtonLabel() },
    ],
    [t, mode, startDate, endDate]
  );

  return (
    <View style={styles.datePickerContainer}>
      <View style={styles.calendarToggleWrapper}>
        <Toggle
          options={options}
          value={mode}
          onChange={handlePresetSelect}
          size="md"
          allowReselect={true}
        />

        {isCalendarOpen && (
          <DateRangeCalendar
            month={currentMonth.getMonth()}
            year={currentMonth.getFullYear()}
            currentMonth={currentMonth}
            navigateMonth={navigateMonth}
            tempStartDate={tempStartDate}
            tempEndDate={tempEndDate}
            hoverDate={hoverDate}
            setHoverDate={setHoverDate}
            handleDayPress={handleDayPress}
            onApply={handleApply}
          />
        )}
      </View>
    </View>
  );
}

