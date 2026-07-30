import { ScrollView, View } from 'react-native';
import commonStyles from '../../../theme/commonStyles';
import Footer from '../components/Footer';

const NARROW_MAX_WIDTH = 580;

export default function PageScrollLayout({ children, isDark, maxWidth, scrollContentStyle }) {
  return (
    <ScrollView
      style={[commonStyles.container, isDark ? commonStyles.containerDark : commonStyles.containerLight]}
      contentContainerStyle={[commonStyles.pageScrollContent, scrollContentStyle]}
      showsVerticalScrollIndicator={false}
    >
      <View style={commonStyles.flex1}>
        <View style={[commonStyles.pageContent, commonStyles.contentWrapper, maxWidth != null && { maxWidth }]}>
          {children}
        </View>
      </View>
      <View style={commonStyles.bottomSpacer} />
      <Footer isDark={isDark} />
    </ScrollView>
  );
}
