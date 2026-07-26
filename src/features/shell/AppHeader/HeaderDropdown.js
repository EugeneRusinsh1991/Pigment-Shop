import React from 'react';
import { Animated } from 'react-native';
import { ChipButton } from '@/components/Button';
import { layout } from '@/theme/tokens';
import styles from './AppHeaderStyles';
import { useDropdownAnimation } from '../../../hooks/useDropdownAnimation';

export default function HeaderDropdown({ isVisible, isDark, items, selectedValue, onSelect }) {
  const { shouldRender, translateY, opacity } = useDropdownAnimation(isVisible);

  if (!shouldRender) return null;

  const ic = (dark, light) => (isDark ? dark : light);

  return (
    <Animated.View
      style={[
        styles.dropdown,
        ic(styles.dropdownDark, styles.dropdownLight),
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      {items.map((item) => (
        <ChipButton
          key={item.code}
          label={item.label}
          active={selectedValue === item.code}
          isDark={isDark}
          onPress={() => onSelect(item.code)}
          variant="rect"
          size="sm"
          style={{ marginVertical: layout.spacing.xxs / 2, width: '100%' }}
        />
      ))}
    </Animated.View>
  );
}
