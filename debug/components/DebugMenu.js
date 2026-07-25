/**
 * DebugMenu UI Overlay Component
 */
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function DebugMenu({ actions, onClose }) {
  return (
    <View style={styles.menu}>
      <Text style={styles.menuTitle}>Playwright Debug Tools</Text>
      <View style={styles.divider} />
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={styles.menuItem}
          onPress={() => {
            action.handler();
            onClose();
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.menuItemLabel}>{action.label}</Text>
          <Text style={styles.menuItemHotkey}>{action.hotkeyLabel}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderRadius: 12,
    padding: 16,
    width: 280,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  menuTitle: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  menuItemLabel: {
    color: '#F1F5F9',
    fontSize: 13,
    fontWeight: '500',
  },
  menuItemHotkey: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: 'bold',
    backgroundColor: '#0F172A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
});
