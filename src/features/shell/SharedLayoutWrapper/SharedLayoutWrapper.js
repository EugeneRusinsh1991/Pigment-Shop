import { View } from 'react-native';
import Footer from '../components/Footer';
import { sharedLayoutWrapperStyles } from './SharedLayoutWrapperStyles';
import { useSharedLayoutWrapperTheme } from './useSharedLayoutWrapperTheme';

export default function SharedLayoutWrapper({
  children,
  footer,
  showFooter = false,
  isDark: isDarkProp,
  contentContainerStyle,
  footerContainerStyle,
}) {
  const { isDark } = useSharedLayoutWrapperTheme({ isDarkProp });

  return (
    <View style={sharedLayoutWrapperStyles.wrapper}>
      <View style={[sharedLayoutWrapperStyles.content, contentContainerStyle]}>
        {children}
      </View>

      {showFooter ? (
        <View style={[sharedLayoutWrapperStyles.footerRegion, footerContainerStyle]}>
          <View style={sharedLayoutWrapperStyles.footerInner}>
            {footer ?? <Footer isDark={isDark} />}
          </View>
        </View>
      ) : null}
    </View>
  );
}
