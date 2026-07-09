/**
 * StatCard.js
 *
 * Reusable analytics stat card showing a label, value and icon.
 */
import React from 'react';
import { Text, View } from 'react-native';
import styles from './AnalyticsStyles';

export default function StatCard({ label, value, icon }) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statIcon}>{icon}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}
