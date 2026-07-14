import { StyleSheet, View } from 'react-native';

import Footer from './Footer';

export default function SharedLayoutWrapper({
  children,
  footer,
  showFooter = false,
  isDark,
  contentContainerStyle,
  footerContainerStyle,
}) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.content, contentContainerStyle]}>{children}</View>

      {showFooter ? (
        <View style={[styles.footerContainer, footerContainerStyle]}>
          {footer ?? <Footer isDark={isDark} />}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    minHeight: 0,
    width: '100%',
  },
  footerContainer: {
    width: '100%',
    flexShrink: 0,
    paddingTop: 16,
    paddingBottom: 12,
  },
});
