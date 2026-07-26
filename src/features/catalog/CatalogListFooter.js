import React from 'react';
import { StyleSheet, View } from 'react-native';
import NewArrivalsFooter from './components/NewArrivalsFooter';
import DiscountsSection from '../home/components/DiscountsSection';
import Footer from '../shell/components/Footer';

/**
 * CatalogFooter Helper Component
 * Renders the new arrivals and discounts sections for depth 0.
 */
function CatalogFooter({ depth, isDark, isWide, t, favs }) {
  if (depth !== 0) {
    return null;
  }

  return (
    <View>
      <NewArrivalsFooter isDark={isDark} isWide={isWide} t={t} favs={favs} />
      <DiscountsSection isDark={isDark} isWide={isWide} t={t} favs={favs} />
    </View>
  );
}

export default function CatalogListFooter({ showPromotionalSections, isTransitionReady, depth, isDark, isWide, t, favs }) {
  return (
    <View style={[styles.footerWrapper, { width: '100%' }]}>
      {showPromotionalSections && isTransitionReady && (
        <CatalogFooter
          depth={depth}
          isDark={isDark}
          isWide={isWide}
          t={t}
          favs={favs}
        />
      )}
      <View style={{ height: 40 }} />
      {(!showPromotionalSections || isTransitionReady) && <Footer />}
    </View>
  );
}

const styles = StyleSheet.create({
  footerWrapper: {
    width: '100%',
  },
});
