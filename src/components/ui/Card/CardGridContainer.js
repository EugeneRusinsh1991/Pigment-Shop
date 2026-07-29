/**
 * CardGridContainer
 *
 * Universal flex-wrap grid container.
 * Drop this around any set of card items to get consistent
 * row/wrap layout with unified gap tokens.
 *
 * Usage:
 *   <CardGridContainer gap={gap}>
 *     {items.map(item => (
 *       <View key={item.id} style={{ width: itemWidthPct }}>...</View>
 *     ))}
 *   </CardGridContainer>
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function CardGridContainer({ children, gap = 8, style }) {
  return (
    <View style={[styles.grid, { gap }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
