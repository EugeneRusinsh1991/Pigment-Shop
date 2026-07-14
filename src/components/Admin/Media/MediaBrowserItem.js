/**
 * MediaBrowserItem.js
 *
 * Renders a single selectable media asset tile inside the MediaBrowser.
 */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { resolveMediaUrl, MediaRenderer } from '../../../media';
import styles from './MediaBrowserStyles';

export default function MediaBrowserItem({ item, selected, onSelect }) {
  const uri = resolveMediaUrl(item.path);
  
  return (
    <TouchableOpacity
      style={[styles.itemBtn, selected && styles.itemBtnSelected]}
      onPress={() => onSelect(item)}
      activeOpacity={0.75}
    >
      <View style={{ width: '100%', height: 80, overflow: 'hidden' }}>
        <MediaRenderer uri={uri} style={styles.itemThumb} resizeMode="cover" />
      </View>
      <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
    </TouchableOpacity>
  );
}
