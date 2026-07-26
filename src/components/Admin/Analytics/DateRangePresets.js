import React from 'react';
import { Badge } from '../../Badge';

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
    <Badge
      variant="chip"
      selected={isActive}
      onPress={() => onPress(preset)}
      label={label}
      style={style}
    />
  );
}

