import React from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * FlagGroup container for managing group state and layout of Flag primitives.
 */
export function FlagGroup({
  value,
  onChange,
  multiple = true,
  children,
  style,
  direction = 'row',
  gap = 8,
}) {
  const handleToggle = (itemValue) => {
    if (!onChange) return;
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.includes(itemValue)) {
        onChange(currentValues.filter((v) => v !== itemValue));
      } else {
        onChange([...currentValues, itemValue]);
      }
    } else {
      onChange(itemValue);
    }
  };

  const renderedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const childValue = child.props.value;
    if (childValue !== undefined) {
      const isChecked = multiple
        ? Array.isArray(value) && value.includes(childValue)
        : value === childValue;

      return React.cloneElement(child, {
        checked: child.props.checked ?? isChecked,
        onChange: (newChecked) => {
          if (child.props.onChange) {
            child.props.onChange(newChecked);
          }
          handleToggle(childValue);
        },
      });
    }

    return child;
  });

  return (
    <View style={[styles.container, { flexDirection: direction, gap }, style]}>
      {renderedChildren}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});
