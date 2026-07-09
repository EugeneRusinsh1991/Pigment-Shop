import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './NavMenuStyles';

export default function NavUtilActions({ isDark, canGoBack, onBack, onHome }) {
  const rowStyle = [styles.utilRow, isDark ? styles.utilRowDark : styles.utilRowLight];
  const labelStyle = [styles.utilLabel, isDark ? styles.accentDark : styles.accentLight];

  return (
    <>
      {canGoBack && (
        <TouchableOpacity style={rowStyle} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.utilIcon}>‹</Text>
          <Text style={labelStyle}>Back</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={rowStyle} onPress={onHome} activeOpacity={0.7}>
        <Text style={styles.utilIcon}>🏠</Text>
        <Text style={labelStyle}>Home</Text>
      </TouchableOpacity>
    </>
  );
}
