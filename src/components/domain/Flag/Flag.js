import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../../ui/Text';
import styles, { HIT_SLOP_44, colorSchemes } from './FlagStyles';
import { useFlagTheme } from './useFlagTheme';

function resolveSchemeStyles(colorScheme, isDark, lightKey, darkKey) {
  const scheme = colorScheme ? colorSchemes[colorScheme] : null;
  return scheme ? (isDark ? scheme[darkKey] : scheme[lightKey]) : null;
}

function getChipContainerStyle(isDark, checked, disabled, readOnly, colorScheme, style) {
  const darkStyle = isDark ? styles.chipContainerDark : null;
  const checkedStyle = checked ? (isDark ? styles.chipActiveDark : styles.chipActive) : null;
  const schemeContainer = resolveSchemeStyles(colorScheme, isDark, 'container', 'containerDark');
  const opacityStyle = (disabled && !readOnly) ? styles.disabledOpacity : null;
  return [styles.baseContainer, styles.chipContainer, darkStyle, checkedStyle, schemeContainer, opacityStyle, style];
}

function getChipLabelStyle(isDark, checked, colorScheme, textStyle) {
  const darkStyle = isDark ? styles.chipTextDark : null;
  const checkedStyle = checked ? (isDark ? styles.chipActiveTextDark : styles.chipActiveText) : null;
  const schemeText = resolveSchemeStyles(colorScheme, isDark, 'text', 'textDark');
  return [styles.chipText, darkStyle, checkedStyle, schemeText, textStyle];
}

function getSwitchTrackStyle(isDark, checked) {
  return [
    styles.switchTrack,
    isDark ? styles.switchTrackDark : null,
    checked ? (isDark ? styles.switchTrackActiveDark : styles.switchTrackActive) : null,
  ];
}

function getSwitchThumbStyle(checked) {
  return [
    styles.switchThumb,
    checked ? styles.switchThumbActive : styles.switchThumbInactive,
  ];
}

function getSwitchLabelStyle(isDark, textStyle) {
  return [
    styles.switchText,
    isDark ? styles.switchTextDark : null,
    textStyle,
  ];
}

function getCheckboxBoxStyle(isDark, checked) {
  return [
    styles.checkboxBox,
    isDark ? styles.checkboxBoxDark : null,
    checked ? (isDark ? styles.checkboxActiveDark : styles.checkboxActive) : null,
  ];
}

function getCheckboxLabelStyle(isDark, textStyle) {
  return [
    styles.checkboxText,
    isDark ? styles.checkboxTextDark : null,
    textStyle,
  ];
}

/**
 * Flag primitive representing a binary state switcher or boolean attribute input.
 * Supports variants: 'chip' | 'switch' | 'checkbox'
 */
export function Flag({
  checked = false,
  onChange,
  variant = 'chip',
  disabled = false,
  readOnly = false,
  colorScheme,
  isDark: isDarkProp,
  children,
  style,
  textStyle,
  testID,
  accessibilityLabel,
}) {
  const { isDark } = useFlagTheme({ isDarkProp });
  const isInteractive = !disabled && !readOnly;

  const handlePress = () => {
    if (isInteractive && onChange) {
      onChange(!checked);
    }
  };

  const getAccessibilityRole = () => {
    if (readOnly) return undefined;
    if (variant === 'switch') return 'switch';
    if (variant === 'checkbox') return 'checkbox';
    return 'button';
  };

  const renderChildren = (content, labelStyle, size, weight) => {
    if (content === null || content === undefined) return null;
    if (React.isValidElement(content)) {
      return content;
    }
    return <Text style={[labelStyle]} size={size} weight={weight}>{content}</Text>;
  };

  const renderChip = () => {
    return (
      <Pressable
        testID={testID}
        hitSlop={HIT_SLOP_44}
        onPress={handlePress}
        disabled={disabled || readOnly}
        accessibilityRole={getAccessibilityRole()}
        accessibilityState={{ checked, disabled }}
        accessibilityLabel={accessibilityLabel}
        style={[getChipContainerStyle(isDark, checked, disabled, readOnly, colorScheme, style)]}
      >
        {renderChildren(children, getChipLabelStyle(isDark, checked, colorScheme, textStyle), "sm", checked ? "semiBold" : "medium")}
      </Pressable>
    );
  };

  const renderSwitch = () => {
    return (
      <Pressable
        testID={testID}
        hitSlop={HIT_SLOP_44}
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="switch"
        accessibilityState={{ checked, disabled }}
        accessibilityLabel={accessibilityLabel}
        style={[styles.baseContainer, disabled ? styles.disabledOpacity : null, style]}
      >
        <View style={[getSwitchTrackStyle(isDark, checked)]}>
          <View style={[getSwitchThumbStyle(checked)]} />
        </View>
        {renderChildren(children, getSwitchLabelStyle(isDark, textStyle), "sm", "medium")}
      </Pressable>
    );
  };

  const renderCheckbox = () => {
    return (
      <Pressable
        testID={testID}
        hitSlop={HIT_SLOP_44}
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled }}
        accessibilityLabel={accessibilityLabel}
        style={[styles.baseContainer, disabled ? styles.disabledOpacity : null, style]}
      >
        <View style={[getCheckboxBoxStyle(isDark, checked)]}>
          {checked && (
            <Text variant="caption" weight="bold" style={styles.checkMarkText}>✓</Text>
          )}
        </View>
        {renderChildren(children, getCheckboxLabelStyle(isDark, textStyle), "sm", "regular")}
      </Pressable>
    );
  };

  if (variant === 'switch') return renderSwitch();
  if (variant === 'checkbox') return renderCheckbox();
  return renderChip();
}
