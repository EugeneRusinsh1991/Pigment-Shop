import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { layout } from '../../../theme/tokens';
import { getContentGridWidth } from '../../../utils/layoutUtils';

/**
 * StorefrontPageContainer Component
 * Unified layout container providing standardized maximum width, centering,
 * and responsive outer edge paddings for all user-facing storefront screens.
 */
export default function StorefrontPageContainer({ children, style, contentStyle }) {
  const { width: windowWidth } = useWindowDimensions();
  const gridWidth = getContentGridWidth(windowWidth);

  return (
    <View style={[styles.outerContainer, style]}>
      <View style={[styles.innerContent, { width: gridWidth, maxWidth: layout.maxContentWidth }, contentStyle]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  innerContent: {
    alignSelf: 'center',
    width: '100%',
  },
});
