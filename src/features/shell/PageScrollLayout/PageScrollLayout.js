import { View } from 'react-native';
import commonStyles from '../../../theme/commonStyles';

export default function PageScrollLayout({ children, isDark, maxWidth }) {
  return (
    <View
      style={[
        { flexGrow: 1, width: '100%' },
        isDark ? commonStyles.containerDark : commonStyles.containerLight
      ]}
    >
      <View style={{ flexGrow: 1 }}>
        <View style={[commonStyles.pageContent, commonStyles.contentWrapper, maxWidth != null && { maxWidth }]}>
          {children}
        </View>
      </View>
    </View>
  );
}

