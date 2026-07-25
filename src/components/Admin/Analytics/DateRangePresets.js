import React from 'react';
import ChipButton from '../../ChipButton';

export function calculatePresetDateRange(preset) {
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

export function PresetButton({ mode, preset, label, onPress, style }) {
  const isActive = mode === preset;
  return (
    <ChipButton
      label={label}
      active={isActive}
      onPress={() => onPress(preset)}
      style={[
        {
          minWidth: 140,
          backgroundColor: isActive ? '#E31B23' : '#000000',
          borderColor: isActive ? '#E31B23' : '#000000',
        },
        style,
      ]}
      textStyle={{ color: '#FFFFFF', fontWeight: '600' }}
    />
  );
}
