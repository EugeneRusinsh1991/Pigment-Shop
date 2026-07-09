import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import useCardDimensions from '../hooks/useCardDimensions';

const CATEGORY_PLACEHOLDER = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop';

/**
 * CategoryCard Component
 * Renders a category item with layout dimensions determined by depth and viewport size.
 */
export default function CategoryCard({ item, onPress, isDark, depth }) {
  const { cardWidth, cardHeight } = useCardDimensions(depth, false);
  
  const desc = item.description || (item.id === 'cat-materials' 
    ? 'Расходники и инструменты для мастеров' 
    : 'Пигменты для перманентного макияжа');

  return (
    <TouchableOpacity
      style={[
        styles.catCard, 
        isDark ? styles.catCardDark : styles.catCardLight, 
        { width: cardWidth, height: cardHeight, flex: 0, flexGrow: 0 }
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image source={{ uri: CATEGORY_PLACEHOLDER }} style={styles.catImage} resizeMode="cover" />
      <View style={styles.overlay} />
      <View style={styles.catContent}>
        <Text style={styles.catLabel} numberOfLines={2}>{item.label}</Text>
        <Text style={styles.catDesc} numberOfLines={2}>{desc}</Text>
      </View>
      <View style={styles.arrowCircle}>
        <Text style={styles.arrowCircleText}>↗</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  catCard: {
    flex: 1,
    height: 380,
    borderRadius: 24,
    margin: 8,
    overflow: 'hidden',
    position: 'relative',
    minWidth: 250,
  },
  catCardDark: {
    backgroundColor: '#1E1E1E',
  },
  catCardLight: {
    backgroundColor: '#FAF8F6',
  },
  catImage: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  catContent: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 70,
  },
  catLabel: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontSize: 26,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  catDesc: {
    fontFamily: 'System, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 16,
  },
  arrowCircle: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowCircleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});
