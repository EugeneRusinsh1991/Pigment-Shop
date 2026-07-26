import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles, { HIT_SLOP_44, colorSchemes } from './FlagStyles';
import { useFlagTheme } from './useFlagTheme';

function getChipContainerStyle(isDark, checked, disabled, readOnly, colorScheme, style) {
  const schemeStyles = colorScheme ? colorSchemes[colorScheme] : null;
  const schemeContainer = schemeStyles && (isDark ? schemeStyles.containerDark : schemeStyles.container);
  const darkStyle = isDark ? styles.chipContainerDark : null;
  const checkedStyle = checked ? (isDark ? styles.chipActiveDark : styles.chipActive) : null;
  const opacityStyle = (disabled && !readOnly) ? { opacity: 0.5 } : null;
  return [styles.baseContainer, styles.chipContainer, darkStyle, checkedStyle, schemeContainer, opacityStyle, style];
}

function getChipLabelStyle(isDark, checked, colorScheme, textStyle) {
  const schemeStyles = colorScheme ? colorSchemes[colorScheme] : null;
  const schemeText = schemeStyles && (isDark ? schemeStyles.textDark : schemeStyles.text);
  const darkStyle = isDark ? styles.chipTextDark : null;
  const checkedStyle = checked ? (isDark ? styles.chipActiveTextDark : styles.chipActiveText) : null;
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

  const renderChildren = (content, labelStyle) => {
    if (content === null || content === undefined) return null;
    if (React.isValidElement(content)) {
      return content;
    }
    return <Text style={labelStyle}>{content}</Text>;
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
        style={getChipContainerStyle(isDark, checked, disabled, readOnly, colorScheme, style)}
      >
        {renderChildren(children, getChipLabelStyle(isDark, checked, colorScheme, textStyle))}
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
        style={[styles.baseContainer, disabled ? { opacity: 0.5 } : null, style]}
      >
        <View style={getSwitchTrackStyle(isDark, checked)}>
          <View style={getSwitchThumbStyle(checked)} />
        </View>
        {renderChildren(children, getSwitchLabelStyle(isDark, textStyle))}
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
        style={[styles.baseContainer, disabled ? { opacity: 0.5 } : null, style]}
      >
        <View style={getCheckboxBoxStyle(isDark, checked)}>
          {checked && (
            <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>✓</Text>
          )}
        </View>
        {renderChildren(children, getCheckboxLabelStyle(isDark, textStyle))}
      </Pressable>
    );
  };

  if (variant === 'switch') return renderSwitch();
  if (variant === 'checkbox') return renderCheckbox();
  return renderChip();
}
