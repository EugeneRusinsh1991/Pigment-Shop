import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './AnalyticsStyles';
import { useTheme } from '../../../context/ThemeContext';

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

function PresetButton({ mode, preset, label, onPress }) {
  const isActive = mode === preset;
  return (
    <TouchableOpacity 
      style={[styles.presetBtn, isActive && styles.presetBtnActive]} 
      onPress={() => onPress(preset)}
    >
      <Text style={[styles.presetText, isActive && styles.presetTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function DateRangePicker({ startDate, endDate, onChange }) {
  const { t } = useTheme();
  const [mode, setMode] = useState('7days'); // '7days', '30days', 'month', 'custom'
  
  const [customStart, setCustomStart] = useState(startDate ? startDate.toISOString().split('T')[0] : '');
  const [customEnd, setCustomEnd] = useState(endDate ? endDate.toISOString().split('T')[0] : '');

  const handlePresetSelect = (preset) => {
    setMode(preset);
    if (preset !== 'custom') {
      const { start, end } = calculatePresetDateRange(preset);
      onChange(start, end);
    }
  };

  const applyCustom = () => {
    if (customStart && customEnd) {
      const s = new Date(customStart);
      s.setHours(0, 0, 0, 0);
      const e = new Date(customEnd);
      e.setHours(23, 59, 59, 999);
      if (!isNaN(s) && !isNaN(e)) {
        onChange(s, e);
      }
    }
  };

  return (
    <View style={styles.datePickerContainer}>
      <Text style={styles.datePickerLabel}>{t('adminAnalyticsDateRange')}</Text>
      <View style={styles.datePickerPresets}>
        <PresetButton mode={mode} preset="7days" label={t('adminAnalyticsDateLast7')} onPress={handlePresetSelect} />
        <PresetButton mode={mode} preset="30days" label={t('adminAnalyticsDateLast30')} onPress={handlePresetSelect} />
        <PresetButton mode={mode} preset="month" label={t('adminAnalyticsDateThisMonth')} onPress={handlePresetSelect} />
        <PresetButton mode={mode} preset="custom" label={t('adminAnalyticsDateCustom')} onPress={handlePresetSelect} />
      </View>

      {mode === 'custom' && (
        <View style={styles.customDateRow}>
          <TextInput
            style={styles.customDateInput}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#94a3b8"
            value={customStart}
            onChangeText={setCustomStart}
          />
          <Text style={styles.customDateDash}>-</Text>
          <TextInput
            style={styles.customDateInput}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#94a3b8"
            value={customEnd}
            onChangeText={setCustomEnd}
          />
          <TouchableOpacity style={styles.applyBtn} onPress={applyCustom}>
            <Text style={styles.applyBtnText}>{t('adminAnalyticsApply')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
