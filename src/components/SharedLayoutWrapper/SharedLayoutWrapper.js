import { View } from 'react-native';
import Footer from '../../features/shell/components/Footer';
import { useSharedLayoutWrapperTheme } from './useSharedLayoutWrapperTheme';
import { sharedLayoutWrapperStyles } from './SharedLayoutWrapperStyles';

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
