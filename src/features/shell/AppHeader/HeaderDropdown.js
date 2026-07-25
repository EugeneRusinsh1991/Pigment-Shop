import React from 'react';
import { Animated, Text } from 'react-native';
import { AnimatedButton } from '@/components/Button';
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
        <AnimatedButton
          key={item.code}
          style={[
            styles.dropdownItem,
            selectedValue === item.code && ic(styles.dropdownItemActiveDark, styles.dropdownItemActiveLight),
            { minHeight: 44, justifyContent: 'center' }
          ]}
          onPress={() => onSelect(item.code)}
        >
          <Text style={[styles.dropdownText, ic(styles.textDark, styles.textLight)]}>
            {item.label}
          </Text>
        </AnimatedButton>
      ))}
    </Animated.View>
  );
}
