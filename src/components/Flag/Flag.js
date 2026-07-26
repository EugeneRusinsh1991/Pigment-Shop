import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles, { HIT_SLOP_44, colorSchemes } from './FlagStyles';
import { useFlagTheme } from './useFlagTheme';

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
    const schemeStyles = colorScheme && colorSchemes[colorScheme];
    const schemeContainer = schemeStyles ? (isDark ? schemeStyles.containerDark : schemeStyles.container) : null;
    const schemeText = schemeStyles ? (isDark ? schemeStyles.textDark : schemeStyles.text) : null;

    const containerStyle = [
      styles.baseContainer,
      styles.chipContainer,
      isDark && styles.chipContainerDark,
      checked && (isDark ? styles.chipActiveDark : styles.chipActive),
      schemeContainer,
      (disabled || readOnly) && { opacity: readOnly ? 1 : 0.5 },
      style,
    ];

    const labelStyle = [
      styles.chipText,
      isDark && styles.chipTextDark,
      checked && (isDark ? styles.chipActiveTextDark : styles.chipActiveText),
      schemeText,
      textStyle,
    ];

    return (
      <Pressable
        testID={testID}
        hitSlop={HIT_SLOP_44}
        onPress={handlePress}
        disabled={disabled || readOnly}
        accessibilityRole={getAccessibilityRole()}
        accessibilityState={{ checked, disabled }}
        accessibilityLabel={accessibilityLabel}
        style={containerStyle}
      >
        {renderChildren(children, labelStyle)}
      </Pressable>
    );
  };

  const renderSwitch = () => {
    const trackStyle = [
      styles.switchTrack,
      isDark && styles.switchTrackDark,
      checked && (isDark ? styles.switchTrackActiveDark : styles.switchTrackActive),
    ];

    const thumbStyle = [
      styles.switchThumb,
      checked ? styles.switchThumbActive : styles.switchThumbInactive,
    ];

    const labelStyle = [
      styles.switchText,
      isDark && styles.switchTextDark,
      textStyle,
    ];

    return (
      <Pressable
        testID={testID}
        hitSlop={HIT_SLOP_44}
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="switch"
        accessibilityState={{ checked, disabled }}
        accessibilityLabel={accessibilityLabel}
        style={[styles.baseContainer, disabled && { opacity: 0.5 }, style]}
      >
        <View style={trackStyle}>
          <View style={thumbStyle} />
        </View>
        {renderChildren(children, labelStyle)}
      </Pressable>
    );
  };

  const renderCheckbox = () => {
    const boxStyle = [
      styles.checkboxBox,
      isDark && styles.checkboxBoxDark,
      checked && (isDark ? styles.checkboxActiveDark : styles.checkboxActive),
    ];

    const labelStyle = [
      styles.checkboxText,
      isDark && styles.checkboxTextDark,
      textStyle,
    ];

    return (
      <Pressable
        testID={testID}
        hitSlop={HIT_SLOP_44}
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled }}
        accessibilityLabel={accessibilityLabel}
        style={[styles.baseContainer, disabled && { opacity: 0.5 }, style]}
      >
        <View style={boxStyle}>
          {checked && (
            <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>✓</Text>
          )}
        </View>
        {renderChildren(children, labelStyle)}
      </Pressable>
    );
  };

  if (variant === 'switch') return renderSwitch();
  if (variant === 'checkbox') return renderCheckbox();
  return renderChip();
}
