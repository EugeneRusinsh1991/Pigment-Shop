import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Button, { IconButton } from '../../../components/Button';
import { ChevronDownIcon, ChevronRightIcon } from '../../../components/Icons';
import { getNavItemIcon } from './NavItemList';
import styles from './NavMenuStyles';

export function CategoryLabelButton({ isDark, node, iconColor, onClose, isSelected, indent = 0 }) {
  const router = useRouter();
  const selectedStyle = isSelected
    ? (isDark ? styles.selectedRowDark : styles.selectedRowLight)
    : null;

  const handlePress = () => {
    if (onClose) onClose();
    router.push({ pathname: '/catalog/[categoryId]', params: { categoryId: node.id } });
  };

  return (
    <Button
      variant="unstyled"
      isDark={isDark}
      style={StyleSheet.flatten([
        styles.itemRow,
        isDark ? styles.itemRowDark : styles.itemRowLight,
        selectedStyle,
        { flex: 1, paddingVertical: 10, paddingLeft: 16 + indent, minHeight: 44 }
      ])}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.iconWrapper}>
        {getNavItemIcon(node, iconColor)}
      </View>
      <Text style={[styles.itemLabel, isDark ? styles.textDark : styles.textLight]} numberOfLines={1}>
        {node.label}
      </Text>
    </Button>
  );
}

export function CategoryExpandButton({ isDark, arrowColor, isExpanded, onPress, isSelected }) {
  return (
    <IconButton
      icon={isExpanded ? <ChevronDownIcon color={arrowColor} size={14} /> : <ChevronRightIcon color={arrowColor} size={14} />}
      onPress={onPress}
      size="sm"
      variant="transparent"
      isDark={isDark}
      animated={true}
    />
  );
}
