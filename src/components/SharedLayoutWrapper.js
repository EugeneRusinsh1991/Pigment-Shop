import { StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Footer from './Footer';

export default function SharedLayoutWrapper({
  children,
  footer,
  showFooter = false,
  isDark: isDarkProp,
  contentContainerStyle,
  footerContainerStyle,
}) {
  const { isDark: isDarkContext } = useTheme();
  const isDark = isDarkProp ?? isDarkContext;
  return (
    <View style={styles.wrapper}>
      <View style={[styles.content, contentContainerStyle]}>{children}</View>

      {showFooter ? (
        <View style={[styles.footerRegion, footerContainerStyle]}>
          <View style={styles.footerInner}>
            {footer ?? <Footer isDark={isDark} />}
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 0,
    width: '100%',
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  footerRegion: {
    width: '100%',
    alignSelf: 'stretch',
    flexShrink: 0,
    paddingTop: 16,
    paddingBottom: 12,
  },
  footerInner: {
    width: '100%',
    alignSelf: 'stretch',
  },
});
