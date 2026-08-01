import { View } from 'react-native';
import commonStyles from '../../../theme/commonStyles';
import usePullToRefresh from '../../../hooks/usePullToRefresh';
import PullToRefreshIndicator from '../../../components/ui/Feedback/PullToRefreshIndicator';

export default function PageScrollLayout({ children, isDark, maxWidth, onRefresh }) {
  const { pullDistance, refreshing } = usePullToRefresh(onRefresh);
  return (
    <View
      style={[
        { flexGrow: 1, width: '100%' },
        isDark ? commonStyles.containerDark : commonStyles.containerLight
      ]}
    >
      <PullToRefreshIndicator pullDistance={pullDistance} refreshing={refreshing} />
      <View style={{ flexGrow: 1 }}>
        <View style={[commonStyles.pageContent, commonStyles.contentWrapper, maxWidth != null && { maxWidth }]}>
          {children}
        </View>
      </View>
    </View>
  );
}

