import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './NavMenuStyles';

export default function NavPanelHeader({ isDark, onClose }) {
  return (
    <View style={[styles.panelHeader, isDark ? styles.panelHeaderDark : styles.panelHeaderLight]}>
      <Text style={[styles.panelTitle, isDark ? styles.textDark : styles.textLight]}>
        Navigation
      </Text>
      <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
        <Text style={[styles.closeIcon, isDark ? styles.accentDark : styles.accentLight]}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}
